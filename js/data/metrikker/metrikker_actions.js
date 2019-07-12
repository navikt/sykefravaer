import { UTFYLLING_STARTET } from '../../enums/metrikkerEnums';

export const EVENT_REGISTRERT = 'EVENT_REGISTRERT';

const eventRegistrert = (eventtype, ressursId) => ({
    type: EVENT_REGISTRERT,
    tid: new Date(),
    ressursId,
    eventtype,
});

export const utfyllingStartet = ressursId => eventRegistrert(UTFYLLING_STARTET, ressursId);
