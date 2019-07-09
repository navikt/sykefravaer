import { arbeidssituasjoner, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from '@navikt/digisyfo-npm';
import { ANNEN_ARBEIDSGIVER_ORGNUMMER, sykmeldingskjemamodi as modi } from '../../../enums/sykmeldingskjemaenums';
import { getSykmeldingSkjemanavn } from '../../../../enums/skjemanavn';
import * as sykmeldingSelectors from '../../../data/sykmelding-meta/sykmeldingMetaSelectors';
import { hentSkjemaVerdier } from '../../../../data/redux-form/reduxFormSelectors';

const { PERIODE, SYKMELDINGSGRAD } = feilaktigeOpplysningerEnums;
const { ARBEIDSTAKER, NAERINGSDRIVENDE, FRILANSER } = arbeidssituasjoner;

export const getSkjemaModus = (values, harStrengtFortroligAdresse) => {
    const { opplysningeneErRiktige, feilaktigeOpplysninger, valgtArbeidssituasjon, valgtArbeidsgiver } = values;
    const harValgtAnnenArbeidsgiver = valgtArbeidsgiver
        && valgtArbeidsgiver.orgnummer === ANNEN_ARBEIDSGIVER_ORGNUMMER;
    const valgteFeilaktigeOpplysninger = feilaktigeOpplysninger
        ? feilaktigeOpplysninger
            .filter((o) => {
                return o.avkrysset;
            })
            .map((o) => {
                return o.opplysning;
            })
        : [];

    if (opplysningeneErRiktige === false
        && feilaktigeOpplysninger
        && (valgteFeilaktigeOpplysninger.indexOf(PERIODE) > -1
            || valgteFeilaktigeOpplysninger.indexOf(SYKMELDINGSGRAD) > -1)) {
        return modi.AVBRYT;
    }

    if (valgtArbeidssituasjon === ARBEIDSTAKER &&
        !harStrengtFortroligAdresse &&
        !harValgtAnnenArbeidsgiver &&
        values.beOmNyNaermesteLeder === false) {
        return modi.SEND_MED_NAERMESTE_LEDER;
    }

    if (!values
        || !valgtArbeidssituasjon
        || (valgtArbeidssituasjon === ARBEIDSTAKER
            && !harStrengtFortroligAdresse
            && !harValgtAnnenArbeidsgiver)) {
        return modi.SEND;
    }

    return modi.BEKREFT;
};

export const skalViseFrilansersporsmal = (state, sykmeldingId) => {
    const sykmelding = state.arbeidsgiversSykmeldinger.data.find((s) => {
        return s.id === sykmeldingId;
    });
    const values = hentSkjemaVerdier(state, getSykmeldingSkjemanavn(sykmeldingId));
    const erUtenforVentetid = sykmeldingSelectors.erUtenforVentetid(state, sykmeldingId);
    if (!sykmelding || !sykmelding.mulighetForArbeid || !values || erUtenforVentetid) {
        return false;
    }

    return sykmelding.mulighetForArbeid.perioder
        .some((periode) => {
            return periode.avventende
                || periode.reisetilskudd
                || periode.behandlingsdager;
        })
        ? false
        : [NAERINGSDRIVENDE, FRILANSER].indexOf(values.valgtArbeidssituasjon) > -1;
};
