import { hentSporsmalForFravaerOgFriskmelding } from '../FravaerOgFriskmelding/FravaerOgFriskmelding';
import { JOBBET_DU_100_PROSENT, JOBBET_DU_GRADERT } from '../../../enums/tagtyper';
import { getLedetekstFraTag, validerSporsmal } from './valideringUtils';

export default (values, props) => {
    const sporsmal = hentSporsmalForFravaerOgFriskmelding(props.soknad);
    const feilmeldinger = validerSporsmal(sporsmal, values);
    const returobjekt = { ...feilmeldinger };
    Object.keys(feilmeldinger).forEach((nokkel) => {
        if (nokkel.indexOf(JOBBET_DU_GRADERT) > -1) {
            returobjekt[nokkel] = getLedetekstFraTag(JOBBET_DU_GRADERT);
        } else if (nokkel.indexOf(JOBBET_DU_100_PROSENT) > -1) {
            returobjekt[nokkel] = getLedetekstFraTag(JOBBET_DU_100_PROSENT);
        }
    });
    return returobjekt;
};
