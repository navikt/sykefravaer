import { hentSporsmalForAktiviteterISykmeldingsperioden } from '../AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import { validerSporsmal } from './valideringUtils';

export default (values, props) => {
    const sporsmal = hentSporsmalForAktiviteterISykmeldingsperioden(props.soknad);
    const r = validerSporsmal(sporsmal, values);

    return r;
};
