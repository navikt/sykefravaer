import { hentSporsmalForFravaerOgFriskmelding } from '../FravaerOgFriskmelding/FravaerOgFriskmelding';
import validerSporsmal, { beregnFeilmeldingstekstFraTag } from '../../../utils/soknad-felles/validerSporsmal';
import { fjernIndexFraTag } from '../../soknad-felles/fieldUtils';

export default (values, props) => {
    const sporsmal = hentSporsmalForFravaerOgFriskmelding(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const returobjekt = { ...feilmeldinger };
    Object.keys(feilmeldinger).forEach((nokkel) => {
        const nokkelbase = fjernIndexFraTag(nokkel);
        returobjekt[nokkel] = beregnFeilmeldingstekstFraTag(nokkelbase);
    });
    return returobjekt;
};
