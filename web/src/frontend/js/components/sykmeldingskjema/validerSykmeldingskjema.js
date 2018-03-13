import { arbeidssituasjoner, feilaktigeOpplysninger as feilaktigeOpplysningerEnums } from 'digisyfo-npm';

const { ARBEIDSTAKER, DEFAULT } = arbeidssituasjoner;
const { PERIODE, SYKMELDINGSGRAD } = feilaktigeOpplysningerEnums;

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
        feilmeldinger.opplysningeneErRiktige = 'Vennligst svar på om opplysningene i sykmeldingen er riktige';
    }
    if (!values.valgtArbeidssituasjon || values.valgtArbeidssituasjon === DEFAULT) {
        feilmeldinger.valgtArbeidssituasjon = 'Vennligst oppgi din arbeidssituasjon for denne sykmeldingen';
    }

    if (values.opplysningeneErRiktige === false && avkryssedeFeilaktigeOpplysninger.length === 0) {
        feilmeldinger.feilaktigeOpplysninger = {
            _error: 'Vennligst oppgi hvilke opplysninger som ikke er riktige',
        };
    }

    if (values.valgtArbeidssituasjon === ARBEIDSTAKER && (!values.valgtArbeidsgiver || !values.valgtArbeidsgiver.orgnummer) && !props.harStrengtFortroligAdresse) {
        feilmeldinger.valgtArbeidsgiver = 'Vennligst velg arbeidsgiver for denne sykmeldingen';
    }
    if (values.valgtArbeidssituasjon === ARBEIDSTAKER && values.valgtArbeidsgiver && values.valgtArbeidsgiver.orgnummer !== '0') {
        if (values.valgtArbeidsgiver.naermesteLeder && values.beOmNyNaermesteLeder === undefined) {
            feilmeldinger.beOmNyNaermesteLeder = `Vennligst svar på om ${values.valgtArbeidsgiver.naermesteLeder.navn} er din nærmeste leder med personalansvar`;
        }
    }

    return feilmeldinger;
};
