import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
    SYKEPENGERVARSEL_HENTET,
} from './sykepengerVarselActionTyper';

const initiellState = {
    data: false,
};

export default (state = initiellState, action = {}) => {
    switch (action.type) {
        case HENT_SYKEPENGERVARSEL_FORESPURT: {
            return state;
        }
        case SYKEPENGERVARSEL_HENTET: {
            return {
                data: action.data,
            };
        }
        default: {
            return state;
        }
    }
};
