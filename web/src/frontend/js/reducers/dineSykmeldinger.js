const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    erFeil: false,
};

export default function sykmeldinger(state = initiellState, action) {
    console.log(action.type);
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
        case 'SET_ARBEIDSSITUASJON':
            const data = state.data.map((sykmelding) => {
                if (sykmelding.id === action.sykmeldingsId) {
                    sykmelding.arbeidssituasjon = action.arbeidssituasjon;
                }
                return sykmelding
            });
            return Object.assign({}, state, { data: data });
        case 'SET_SORTERING':
            return Object.assign({}, state, {
                sortering: action.sortering,
            });
        default:
            return state;
    }
}
