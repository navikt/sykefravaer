import { hentSporsmalForAktiviteterISykmeldingsperioden } from '../AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import validerSporsmal from '../../../utils/soknad-felles/validerSporsmal';

export default (values, props) => {
    const sporsmal = hentSporsmalForAktiviteterISykmeldingsperioden(props.soknad);
    return validerSporsmal(sporsmal, values);
};
