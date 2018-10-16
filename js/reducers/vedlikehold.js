import * as actiontyper from '../actions/actiontyper';

const defaultState = {
    data: {
        vedlikehold: {},
    },
    henter: false,
    hentingFeilet: false,
    hentet: false,
};

const vedlikehold = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontyper.VEDLIKEHOLD_HENTET: {
            return {
                data: { vedlikehold: action.data },
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case actiontyper.HENTER_VEDLIKEHOLD: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.HENT_VEDLIKEHOLD_FEILET: {
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
};

export default vedlikehold;
