import validerSporsmal, { beregnFeilmeldingnokkelFraTag } from '../../../utils/soknad-felles/validerSporsmal';
import { BEKREFT_OPPLYSNINGER_UTLAND } from '../../../enums/tagtyper';
import { formaterEnkeltverdi } from '../../soknad-felles/fieldUtils';

const validerUtlandsSkjema = (values = {}, { soknad }) => {
    const validering = validerSporsmal(soknad.sporsmal, values);
    if (!formaterEnkeltverdi(values.BEKREFT_OPPLYSNINGER_UTLAND)) {
        validering[BEKREFT_OPPLYSNINGER_UTLAND] = beregnFeilmeldingnokkelFraTag(BEKREFT_OPPLYSNINGER_UTLAND);
    }
    return validering;
};

export default validerUtlandsSkjema;
