import validerSporsmal, { beregnFeilmeldingstekstFraTag } from '../../../validering/validerSporsmal';
import { BEKREFT_OPPLYSNINGER_UTLAND } from '../../../enums/tagtyper';
import { formaterEnkeltverdi } from '../../../components/soknad-felles-sporsmal/fieldUtils';

const validerSoknadUtland = (values = {}, { soknad }) => {
    const validering = validerSporsmal(soknad.sporsmal, values);
    if (!formaterEnkeltverdi(values.BEKREFT_OPPLYSNINGER_UTLAND)) {
        validering[BEKREFT_OPPLYSNINGER_UTLAND] = beregnFeilmeldingstekstFraTag(BEKREFT_OPPLYSNINGER_UTLAND);
    }
    return validering;
};

export default validerSoknadUtland;
