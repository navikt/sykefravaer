import { OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE, ARBEIDSTAKERE } from '../enums/soknadtyper';
import { getSoknadSkjemanavn, SKJEMANAVN_OPPHOLD_UTLAND } from '../../enums/skjemanavn';

export const getSkjemanavnFraSoknad = (soknad) => {
    switch (soknad.soknadstype) {
        case OPPHOLD_UTLAND: {
            return SKJEMANAVN_OPPHOLD_UTLAND;
        }
        case ARBEIDSTAKERE:
        case SELVSTENDIGE_OG_FRILANSERE: {
            return getSoknadSkjemanavn(soknad.id);
        }
        default: {
            return null;
        }
    }
};
