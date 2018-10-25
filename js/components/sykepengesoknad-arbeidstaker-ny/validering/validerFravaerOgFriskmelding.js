import { hentSporsmalForFravaerOgFriskmelding } from '../FravaerOgFriskmelding/FravaerOgFriskmelding';
import validerSporsmal from '../../../validering/validerSporsmal';
import validerFoerDuBegynner from './validerFoerDuBegynner';

export default (values, props) => {
    const sporsmal = hentSporsmalForFravaerOgFriskmelding(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const feilmeldingerForrigeSide = validerFoerDuBegynner(values, props);
    return {
        ...feilmeldinger,
        ...feilmeldingerForrigeSide,
    };
};
