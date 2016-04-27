const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: {},
};

export default function ledetekster(state = initiellState, action) {
    switch (action.type) {
        case 'SET_LEDETEKSTER':
            return {
                data: action.ledetekster,
                henter: false,
                hentingFeilet: false,
            };
        case 'HENTER_LEDETEKSTER':
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        case 'HENT_LEDETEKSTER_FEILET':
            return {
                data: {},
                henter: false,
                hentingFeilet: true,
            };
        default:
            return state;
    }
}
