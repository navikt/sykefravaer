const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

export default function arbeidsgiversSykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case 'SET_ARBEIDSGIVERS_SYKMELDINGER': {
            return {
                data: action.sykmeldinger,
                henter: false,
                hentingFeilet: false,
            };
        }
        case 'HENTER_ARBEIDSGIVERS_SYKMELDINGER': {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET': {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
            };
        }
        case 'SET_ARBEIDSGIVER': {
            const data = state.data.map((sykmld) => {
                let ret = sykmld;
                if (sykmld.id === action.sykmeldingId) {
                    ret = Object.assign({}, sykmld, {
                        valgtArbeidsgiver: action.arbeidsgiver,
                    });
                }
                return ret;
            });
            return Object.assign({}, state, { data });
        }
        default:
            return state;
    }
}
