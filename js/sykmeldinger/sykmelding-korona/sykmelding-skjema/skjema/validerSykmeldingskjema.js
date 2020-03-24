import { feilaktigeOpplysninger as feilaktigeOpplysningerEnums, fraInputdatoTilJSDato } from '@navikt/digisyfo-npm';
import { harValgtArbeidsgiverMedNaermesteLeder } from '../velg-arbeidssituasjon/VelgArbeidssituasjon';
import validerPeriode from '../../../../components/skjema/periodevelger/validerPeriode';

const { PERIODE, SYKMELDINGSGRAD } = feilaktigeOpplysningerEnums;

export const validerDatoerIPerioder = (perioder, alternativer) => {
    return perioder.map((periode) => {
        const feil = {};
        if (!periode.fom) {
            feil.fom = 'Vennligst fyll ut dato';
        }
        if (!periode.tom) {
            feil.tom = 'Vennligst fyll ut dato';
        }
        if (feil.tom || feil.fom) {
            return feil;
        }
        const fom = fraInputdatoTilJSDato(periode.fom);
        const tom = fraInputdatoTilJSDato(periode.tom);
        if (fom.getTime() > tom.getTime()) {
            feil.tom = 'Sluttdato må være etter startdato';
            return feil;
        }
        if (alternativer) {
            const fomFeil = validerPeriode(periode.fom, alternativer);
            const tomFeil = validerPeriode(periode.tom, alternativer);
            if (fomFeil) {
                feil.fom = fomFeil;
            }
            if (tomFeil) {
                feil.tom = tomFeil;
            }
            if (feil.fom || feil.tom) {
                return feil;
            }
        }
        return undefined;
    });
};

export const validerPerioder = (perioder, alternativer) => {
    if (!perioder) {
        return null;
    }
    const datofeil = validerDatoerIPerioder(perioder, alternativer);
    const faktiskeDatofeil = datofeil.filter((feil) => {
        return feil !== undefined;
    });
    if (faktiskeDatofeil.length > 0) {
        return datofeil;
    }
    return null;
};

const validerFrilansersporsmal = (values) => {
    const feil = {};

    if (values.harAnnetFravaer === undefined) {
        feil.harAnnetFravaer = 'Du må svare på om du brukte egenmelding eller noen annen sykmelding før denne datoen';
    }

    if (values.harAnnetFravaer && validerPerioder(values.fravaersperioder)) {
        feil.fravaersperioder = validerPerioder(values.fravaersperioder);
    }

    if (values.harForsikring === undefined) {
        feil.harForsikring = 'Du må svare på om du har forsikring som gjelder de første 16 dagene av sykefraværet';
    }

    return feil;
};

export default (values, props = {}) => {
    const feilmeldinger = {};
    const feilaktigeOpplysninger = values.feilaktigeOpplysninger || [];
    const avkryssedeFeilaktigeOpplysninger = feilaktigeOpplysninger.filter((o) => {
        return o.avkrysset;
    }).map((o) => {
        return o.opplysning;
    });

    if (values.opplysningeneErRiktige === false && (avkryssedeFeilaktigeOpplysninger.indexOf(PERIODE) > -1 || avkryssedeFeilaktigeOpplysninger.indexOf(SYKMELDINGSGRAD) > -1)) {
        return {};
    }
    if (values.opplysningeneErRiktige === undefined) {
        feilmeldinger.opplysningeneErRiktige = 'Du må svare på om opplysningene i sykmeldingen er riktige';
    }
    if (!values.valgtArbeidssituasjonShadow) {
        feilmeldinger.valgtArbeidssituasjonShadow = 'Du må må svare på hva du er sykmeldt fra';
    }

    if (values.opplysningeneErRiktige === false && avkryssedeFeilaktigeOpplysninger.length === 0) {
        feilmeldinger.feilaktigeOpplysninger = {
            _error: 'Du må oppgi hvilke opplysninger som ikke er riktige',
        };
    }

    if (harValgtArbeidsgiverMedNaermesteLeder(values.valgtArbeidssituasjonShadow, props.arbeidsgivere)
        && values.beOmNyNaermesteLeder === undefined) {
        feilmeldinger.beOmNyNaermesteLeder = `Du må svare på om det er ${values.valgtArbeidsgiver.naermesteLeder.navn} som skal følge deg opp på jobben når du er syk`;
    }

    if (props.visFrilansersporsmal) {
        return {
            ...feilmeldinger,
            ...validerFrilansersporsmal(values),
        };
    }

    return feilmeldinger;
};
