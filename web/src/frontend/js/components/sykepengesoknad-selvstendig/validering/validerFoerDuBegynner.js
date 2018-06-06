import { hentSporsmalForDuBegynner } from '../../sykepengesoknad-selvstendig/FoerDuBegynner/FoerDuBegynner';
import validerSporsmal from '../../../utils/soknad-felles/validerSporsmal';

const validerFoerDuBegynner = (values, { soknad }) => {
    const sporsmal = hentSporsmalForDuBegynner(soknad);
    return validerSporsmal(sporsmal, values);
};

export default validerFoerDuBegynner;
