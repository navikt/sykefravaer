import { feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from '@navikt/digisyfo-npm';
import { validerPerioder } from '../../../../sykepengesoknad-gammel-plattform/utils/valideringUtils';
import { harValgtArbeidsgiverMedNaermesteLeder } from '../velg-arbeidssituasjon/VelgArbeidssituasjon';

const { PERIODE, SYKMELDINGSGRAD } = feilaktigeOpplysningerEnums;

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
