import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
    SYKEPENGERVARSEL_HENTET,
    SYKEPENGERVARSEL_HENTING_FEILET,
} from './sykepengerVarselActionTyper';

const initiellState = {
    data: false,
    hentingFeilet: false,
};

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case HENT_SYKEPENGERVARSEL_FORESPURT: {
            return state;
        }
        case SYKEPENGERVARSEL_HENTET: {
            return {
                data: action.data,
                hentingFeilet: false,
            };
        }
        case SYKEPENGERVARSEL_HENTING_FEILET: {
            return {
                data: false,
                hentingFeilet: true,
            };
        }
        default: {
            return state;
        }
    }
};
