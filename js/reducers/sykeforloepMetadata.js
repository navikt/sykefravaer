import {
    HENTER_SYKEFORLOEP_METADATA,
    SYKEFORLOEP_METADATA_HENTET,
    HENT_SYKEFORLOEP_METADATA_FEILET,
    BRUKER_ER_UTLOGGET,
} from '../actions/actiontyper';

const initState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    data: {},
};

export default (state = initState, action = {}) => {
    switch (action.type) {
        case HENTER_SYKEFORLOEP_METADATA: {
            return {
                ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
                data: {},
            };
        }
        case SYKEFORLOEP_METADATA_HENTET: {
            return {
                ...state,
                henter: false,
                hentet: true,
                data: action.data,
            };
        }
        case HENT_SYKEFORLOEP_METADATA_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
            };
        }
        case BRUKER_ER_UTLOGGET: {
            return {
                henter: false,
                hentet: true,
                hentingFeilet: false,
                data: {},
            };
        }
        default: {
            return state;
        }
    }
};
