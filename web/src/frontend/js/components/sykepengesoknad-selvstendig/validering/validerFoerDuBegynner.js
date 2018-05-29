import { hentSporsmalForDuBegynner } from '../../sykepengesoknad-selvstendig/FoerDuBegynner/FoerDuBegynner';
import { validerSporsmal } from '../../sykepengesoknad-selvstendig/validering/valideringUtils';

const validate = (values, { soknad }) => {
    const sporsmal = hentSporsmalForDuBegynner(soknad);
    return validerSporsmal(sporsmal, values);
};

export default validate;
