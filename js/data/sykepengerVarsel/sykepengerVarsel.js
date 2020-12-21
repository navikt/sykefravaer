import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
    SYKEPENGERVARSEL_HENTET,
    HENTER_SYKEPENGEVARSEL,
    HENT_SYKEPENGERVARSEL_FEILET,
} from './sykepengerVarselActionTyper';

const initiellState = {
    data: false,
    hentet: false,
    henter: false,
    hentingFeilet: false,
};

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case HENT_SYKEPENGERVARSEL_FORESPURT: {
            return {
                data: action.data,
                hentet: false,
                henter: false,
                hentingFeilet: false,
            };
        }
        case HENT_SYKEPENGERVARSEL_FEILET: {
            return {
                data: action.data,
                hentet: false,
                henter: false,
                hentingFeilet: false,
            };
        }
        case HENTER_SYKEPENGEVARSEL: {
            return {
                data: action.data,
                hentet: false,
                henter: false,
                hentingFeilet: false,
            };
        }
        case SYKEPENGERVARSEL_HENTET: {
            return {
                data: action.data,
                hentet: true,
                henter: false,
                hentingFeilet: false,
            };
        }
        default: {
            return state;
        }
    }
};
