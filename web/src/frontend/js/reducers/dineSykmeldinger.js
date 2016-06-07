const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    erFeil: false,
};

export default function sykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case 'SET_DINE_SYKMELDINGER': {
            return {
                data: action.sykmeldinger,
                henter: false,
                hentingFeilet: false,
            };
        }
        case 'HENTER_DINE_SYKMELDINGER': {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'HENT_DINE_SYKMELDINGER_FEILET': {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
            };
        }
        case 'SET_ARBEIDSSITUASJON': {
            const data = state.data.map((sykmelding) => {
                const _sykmelding = sykmelding;
                if (_sykmelding.id === action.sykmeldingId) {
                    _sykmelding.arbeidssituasjon = action.arbeidssituasjon;
                }
                return _sykmelding;
            });
            return Object.assign({}, state, { data });
        }
        case 'SET_SORTERING': {
            return Object.assign({}, state, {
                sortering: action.sortering,
            });
        }
        default: {
            return state;
        }
    }
}
