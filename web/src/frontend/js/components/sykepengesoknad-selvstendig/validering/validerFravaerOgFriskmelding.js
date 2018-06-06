import { hentSporsmalForFravaerOgFriskmelding } from '../FravaerOgFriskmelding/FravaerOgFriskmelding';
import validerSporsmal, { beregnFeilmeldingstekstFraTag } from '../../../utils/soknad-felles/validerSporsmal';
import { fjernIndexFraTag } from '../../soknad-felles/fieldUtils';
import validerFoerDuBegynner from './validerFoerDuBegynner';

export default (values, props) => {
    const sporsmal = hentSporsmalForFravaerOgFriskmelding(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const feilmeldingerForrigeSide = validerFoerDuBegynner(values, props);
    const returobjekt = { ...feilmeldinger, ...feilmeldingerForrigeSide };
    Object.keys(feilmeldinger).forEach((nokkel) => {
        const nokkelbase = fjernIndexFraTag(nokkel);
        returobjekt[nokkel] = beregnFeilmeldingstekstFraTag(nokkelbase);
    });
    return returobjekt;
};
