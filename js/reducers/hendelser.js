import * as actiontyper from '../actions/actiontyper';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    hentet: false,
};

const hendelser = (state = initiellState, action = {}) => {
    switch (action.type) {
        case actiontyper.HENT_HENDELSER_FEILET: {
            return {
                ...state,
                hentingFeilet: true,
                henter: false,
                hentet: true,
            };
        }
        case actiontyper.HENTER_HENDELSER: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.HENDELSER_HENTET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: false,
                data: action.hendelser.map((h) => {
                    return {
                        ...h,
                        inntruffetdato: new Date(h.inntruffetdato),
                    };
                }),
                hentet: true,
            };
        }
        default: {
            return state;
        }
    }
};

export default hendelser;
