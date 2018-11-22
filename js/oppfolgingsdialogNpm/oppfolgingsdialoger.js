import { HENT_OPPFOLGINGSDIALOGER_FEILET, HENTER_OPPFOLGINGSDIALOGER, OPPFOLGINGSDIALOGER_HENTET } from './oppfolgingsdialoger_actions';

const initiellState = {
    henter: false,
    hentet: false,
    hentingFeilet: false,
    data: [],
};

const oppfolgingsdialoger = (state = initiellState, action = {}) => {
    switch (action.type) {
        case OPPFOLGINGSDIALOGER_HENTET: {
            return Object.assign({}, state, {
                data: action.data,
                henter: false,
                hentet: true,
                hentingFeilet: false,
            });
        }
        case HENTER_OPPFOLGINGSDIALOGER: {
            return Object.assign({}, state, {
                henter: true,
                hentet: false,
                hentingFeilet: false,
            });
        }
        case HENT_OPPFOLGINGSDIALOGER_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentet: false,
                hentingFeilet: true,
            });
        }
        default: {
            return state;
        }
    }
};

export default oppfolgingsdialoger;
