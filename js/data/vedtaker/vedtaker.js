import { HENT_VEDTAKER_FEILET, HENTER_VEDTAKER, VEDTAKER_HENTET } from './vedtaker_actions';

const initiellState = {
    data: [],
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case VEDTAKER_HENTET: {
            return {
                ...state,
                data: action.vedtaker.map((vedtak) => {
                    return { ...vedtak };
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_VEDTAKER: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case HENT_VEDTAKER_FEILET: {
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
