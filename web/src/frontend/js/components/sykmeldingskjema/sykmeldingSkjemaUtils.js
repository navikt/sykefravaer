import { arbeidssituasjoner, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from 'digisyfo-npm';
import { sykmeldingskjemamodi as modi } from '../../enums/sykmeldingskjemaenums';

const { PERIODE, SYKMELDINGSGRAD } = feilaktigeOpplysningerEnums;
const { ARBEIDSTAKER, DEFAULT, NAERINGSDRIVENDE, FRILANSER } = arbeidssituasjoner;

export const getSkjemaModus = (values, harStrengtFortroligAdresse) => {
    if (values === {}) {
        return modi.GA_VIDERE;
    }
    const { opplysningeneErRiktige, feilaktigeOpplysninger, valgtArbeidssituasjon } = values;
    const harValgtAnnenArbeidsgiver = values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer === '0';
    const valgteFeilaktigeOpplysninger = feilaktigeOpplysninger
        ? feilaktigeOpplysninger
            .filter((o) => {
                return o.avkrysset;
            })
            .map((o) => {
                return o.opplysning;
            })
        : [];

    if (opplysningeneErRiktige === false &&
        feilaktigeOpplysninger && (
            valgteFeilaktigeOpplysninger.indexOf(PERIODE) > -1 ||
            valgteFeilaktigeOpplysninger.indexOf(SYKMELDINGSGRAD) > -1)
    ) {
        return modi.AVBRYT;
    }
    if (!valgtArbeidssituasjon ||
        valgtArbeidssituasjon === DEFAULT) {
        return modi.GA_VIDERE;
    }
    if (valgtArbeidssituasjon === ARBEIDSTAKER &&
        !harStrengtFortroligAdresse &&
        !harValgtAnnenArbeidsgiver &&
        values.beOmNyNaermesteLeder === false) {
        return modi.SEND_MED_NAERMESTE_LEDER;
    }
    if (valgtArbeidssituasjon === ARBEIDSTAKER &&
        !harStrengtFortroligAdresse &&
        !harValgtAnnenArbeidsgiver) {
        return modi.SEND;
    }
    return modi.BEKREFT;
};

export const skalViseFrilansersporsmal = (sykmelding, values, erUtenforVentetid = false) => {
    if (!sykmelding || !sykmelding.mulighetForArbeid || !values || erUtenforVentetid) {
        return false;
    }
    const avventendeReisetilskuddEllerBehandlingsdager = sykmelding.mulighetForArbeid.perioder.reduce((curr, periode) => {
        return curr || periode.avventende || periode.reisetilskudd || periode.behandlingsdager;
    }, false);

    return avventendeReisetilskuddEllerBehandlingsdager
        ? false
        : [NAERINGSDRIVENDE, FRILANSER].indexOf(values.valgtArbeidssituasjon) > -1;
};
