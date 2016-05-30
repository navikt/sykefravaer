const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

export default function sykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case 'SET_DINE_SYKMELDINGER':
            return {
                data: action.sykmeldinger,
                henter: false,
                hentingFeilet: false,
            };
        case 'HENTER_DINE_SYKMELDINGER':
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        case 'HENT_DINE_SYKMELDINGER_FEILET':
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
            };
        case 'SET_SORTERING':
            return Object.assign({}, state, {
                sortering: action.sortering,
            });
        default:
            return state;
    }
}
