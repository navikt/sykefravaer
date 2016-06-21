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
        case 'SENDER_SYKMELDING': {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
            });
        }
        case 'SEND_SYKMELDING_FEILET': {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
            });
        }
        case 'SYKMELDING_SENDT': {
            const data = state.data.map((sykmld) => {
                let ret = sykmld;
                if (sykmld.id === action.sykmeldingId) {
                    ret = Object.assign({}, sykmld, {
                        status: 'SENDT',
                    });
                }
                return ret;
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        default:
            return state;
    }
}
