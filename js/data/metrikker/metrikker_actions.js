import { UTFYLLING_STARTET } from '../../enums/metrikkerEnums';

export const EVENT_REGISTRERT = 'EVENT_REGISTRERT';

const eventRegistrert = (eventtype, ressursId) => {
    return {
        type: EVENT_REGISTRERT,
        tid: new Date(),
        ressursId,
        eventtype,
    };
};

export const utfyllingStartet = (ressursId) => {
    return eventRegistrert(UTFYLLING_STARTET, ressursId);
};
