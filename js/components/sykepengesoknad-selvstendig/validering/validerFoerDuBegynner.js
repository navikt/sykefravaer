import { hentSporsmalForDuBegynner } from '../FoerDuBegynner/FoerDuBegynner';
import validerSporsmal from '../../../validering/validerSporsmal';

const validerFoerDuBegynner = (values, { soknad }) => {
    const sporsmal = hentSporsmalForDuBegynner(soknad);
    return validerSporsmal(sporsmal, values);
};

export default validerFoerDuBegynner;
