import { BEKREFT_MER_VEILEDNING_FEILET, BEKREFTER_MER_VEILEDNING, MER_VEILEDNING_BEKREFTET } from './merVeiledningActions';

const initiellState = {
    bekreftingFeilet: false,
    bekrefter: false,
};

export default function merVeiledning(state = initiellState, action = {}) {
    switch (action.type) {
        case BEKREFTER_MER_VEILEDNING: {
            return {
                ...state,
                bekrefter: true,
            };
        }
        case BEKREFT_MER_VEILEDNING_FEILET: {
            return {
                ...state,
                bekrefter: false,
                bekreftingFeilet: true,
            };
        }
        case MER_VEILEDNING_BEKREFTET: {
            return {
                ...state,
                bekrefter: false,
                bekreftingFeilet: false,
            };
        }
        default:
            return state;
    }
}
