import { hentSporsmalForDuBegynner } from '../../sykepengesoknad-selvstendig/FoerDuBegynner/FoerDuBegynner';
import validerSporsmal from '../../../utils/soknad-felles/validerSporsmal';

const validate = (values, { soknad }) => {
    const sporsmal = hentSporsmalForDuBegynner(soknad);
    return validerSporsmal(sporsmal, values);
};

export default validate;
