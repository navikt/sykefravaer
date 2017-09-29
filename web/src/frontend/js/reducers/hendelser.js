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
            return Object.assign({}, state, {
                hentingFeilet: true,
                henter: false,
                hentet: true,
            });
        }
        case actiontyper.HENTER_HENDELSER: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
                hentet: false,
            });
        }
        case actiontyper.HENDELSER_HENTET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                data: action.hendelser.map((h) => {
                    return Object.assign({}, h, {
                        inntruffetdato: new Date(h.inntruffetdato),
                    });
                }),
                hentet: true,
            });
        }
        default: {
            return state;
        }
    }
};

export default hendelser;
