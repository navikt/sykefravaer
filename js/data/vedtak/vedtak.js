import { HENT_VEDTAK_FEILET, HENTER_VEDTAK, VEDTAK_HENTET } from './vedtak_actions';

const initiellState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case VEDTAK_HENTET: {
            return {
                ...state,
                data: action.vedtak.map((vedtak) => {
                    return { ...vedtak };
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_VEDTAK: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case HENT_VEDTAK_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        default:
            return state;
    }
};
