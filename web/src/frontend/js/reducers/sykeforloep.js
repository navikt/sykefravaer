const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};


export default function sykeforloep(state = initiellState, action) {
    switch (action.type) {
        case 'HENT_SYKEFORLOEP_FEILET': {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_SYKEFORLOEP': {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'SET_SYKEFORLOEP': {
            return {
                henter: false,
                hentingFeilet: false,
                data: action.data
            };
        }
        default: {
            return state;
        }
    }
}
