import { HENTER_SYKEFORLOEP_STARTDATO, SYKEFORLOEP_STARTDATO_HENTET, HENT_SYKEFORLOEP_STARTDATO_FEILET } from '../actions/actiontyper';

const initState = {
    henter: false,
    hentingFeilet: false,
    startdato: null,
    hentet: false,
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case HENTER_SYKEFORLOEP_STARTDATO: {
            return {
                ...state,
                henter: true,
            };
        }
        case SYKEFORLOEP_STARTDATO_HENTET: {
            return {
                ...state,
                henter: false,
                hentet: true,
                startdato: new Date(action.startdato),
            };
        }
        case HENT_SYKEFORLOEP_STARTDATO_FEILET: {
            return {
                ...state,
                henter: false,
                hentet: true,
                hentingFeilet: true,
            };
        }
        default: {
            return state;
        }
    }
};
