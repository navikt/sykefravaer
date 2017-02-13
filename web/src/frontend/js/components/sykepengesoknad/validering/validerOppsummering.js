import validerFoerDuBegynner from './validerFoerDuBegynner';
import validerFravaerOgFriskmelding from './validerFravaerOgFriskmelding';
import validerAktiviteterISykmeldingsperioden from './validerAktiviteterISykmeldingsperioden';

const validate = (values, props) => {
    const foerDuBegynnerFeil = validerFoerDuBegynner(values, props);
    const fravaerOgFriskmeldingFeil = validerFravaerOgFriskmelding(values, props);
    const aktiviteterISykmeldingsperiodenFeil = validerAktiviteterISykmeldingsperioden(values, props);
    const feilmeldinger = Object.assign({}, foerDuBegynnerFeil, fravaerOgFriskmeldingFeil, aktiviteterISykmeldingsperiodenFeil);

    if (Object.keys(feilmeldinger).length > 0) {
        props.sendTilFoerDuBegynner(props.sykepengesoknad);
    }

    if (!values.bekreftetKorrektInformasjon) {
        feilmeldinger.bekreftetKorrektInformasjon = 'Du må bekrefte at du har lest informasjonen og bekreftet at opplysningene du har gitt er korrekte';
    }
    return feilmeldinger;
};

export default validate;
