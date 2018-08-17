import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    data: {},
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

export default function unleashToggles(state = initiellState, action = {}) {
    switch (action.type) {
        case actiontyper.HENTET_UNLEASH_TOGGLES: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case actiontyper.HENTER_UNLEASH_TOGGLES: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.HENT_UNLEASH_TOGGLES_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        default: {
            return state;
        }
    }
}
