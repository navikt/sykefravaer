import { hentSporsmalForFravaerOgFriskmelding } from './FravaerOgFriskmelding';
import validerSporsmal from '../../../validering/validerSporsmal';
import validerFoerDuBegynner from '../for-du-begynner/validerFoerDuBegynner';

export default (values, props) => {
    const sporsmal = hentSporsmalForFravaerOgFriskmelding(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const feilmeldingerForrigeSide = validerFoerDuBegynner(values, props);
    return {
        ...feilmeldinger,
        ...feilmeldingerForrigeSide,
    };
};
