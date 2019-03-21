import { getLedetekst } from '@navikt/digisyfo-npm';
import { fjernIndexFraTag, formaterEnkeltverdi } from '../felleskomponenter/sporsmal/fieldUtils';
import { beregnFeilmeldingstekstFraTag } from './validerSporsmal';

const validerTall = (min, max, tag, verdi) => {
    const tagUtenIndex = fjernIndexFraTag(tag);
    const blankfeilmelding = beregnFeilmeldingstekstFraTag(tagUtenIndex);
    const formatertVerdi = formaterEnkeltverdi(verdi);
    const parsetVerdi = parseInt(formatertVerdi, 10);
    if (parsetVerdi > max || parsetVerdi < min) {
        return getLedetekst('soknad.feilmelding.tall-min-max', {
            '%MIN%': min,
            '%MAX%': max,
        });
    }
    if (!parsetVerdi || isNaN(parsetVerdi)) {
        return blankfeilmelding;
    }
    return undefined;
};

export default validerTall;
