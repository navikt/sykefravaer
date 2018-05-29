import { hentSporsmalForAktiviteterISykmeldingsperioden } from '../AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import { validerSporsmal } from './valideringUtils';

export default (values, props) => {
    const sporsmal = hentSporsmalForAktiviteterISykmeldingsperioden(props.soknad);
    return validerSporsmal(sporsmal, values);
};
