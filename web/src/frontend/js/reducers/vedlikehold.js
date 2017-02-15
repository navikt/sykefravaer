import * as actiontyper from '../actions/actiontyper';

const defaultState = {
    data: {
        vedlikehold: false,
    },
    henter: false,
    hentingFeilet: false,
};

const vedlikehold = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontyper.VEDLIKEHOLD_HENTET: {
            return {
                data: { vedlikehold: action.data },
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.HENTER_VEDLIKEHOLD: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontyper.HENT_VEDLIKEHOLD_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
};

export default vedlikehold;
