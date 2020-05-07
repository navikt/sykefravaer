import {
    HENT_MOTEBEHOV_HENTER,
    HENT_MOTEBEHOV_HENTET,
    HENT_MOTEBEHOV_FEILET,
    HENT_MOTEBEHOV_FORBUDT,
} from './motebehov_actions';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    hentingForbudt: false,
    hentingForsokt: false,
    data: {},
};

export default function motebehov(state = initiellState, action = {}) {
    switch (action.type) {
        case HENT_MOTEBEHOV_HENTER: {
            return {
                ...state,
                henter: true,
                hentet: false,
                hentingFeilet: false,
                hentingForbudt: false,
                hentingForsokt: false,
                data: {},
            };
        }
        case HENT_MOTEBEHOV_HENTET: {
            return {
                ...state,
                henter: false,
                hentet: true,
                hentingForsokt: true,
                data: action.data,
            };
        }
        case HENT_MOTEBEHOV_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentingForsokt: true,
            };
        }
        case HENT_MOTEBEHOV_FORBUDT: {
            return {
                ...state,
                henter: false,
                hentingForbudt: true,
                hentingForsokt: true,
            };
        }
        default:
            return state;
    }
}
