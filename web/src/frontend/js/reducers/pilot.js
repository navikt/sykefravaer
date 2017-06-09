import * as actiontyper from '../actions/actiontyper';

const defaultState = {
    data: {},
};

const pilot = (state = defaultState, action = {}) => {
    switch (action.type) {
        case actiontyper.PILOT_SYKEPENGER_HENTET: {
            return {
                data: action.data,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.HENTER_PILOT_SYKEPENGER: {
            return {
                henter: true,
                hentingFeilet: false,
                data: {},
            };
        }
        case actiontyper.HENT_PILOT_SYKEPENGER_FEILET: {
            return {
                henter: false,
                hentingFeilet: true,
                data: {},
            };
        }
        default: {
            return state;
        }
    }
};

export default pilot;
