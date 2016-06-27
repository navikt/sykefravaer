const initiellState = {
    henter: false,
    arbeidsforhold: [],
    hentingFeilet: false,
    data: [],
    erFeil: false,
};

export default function sykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case 'SET_DINE_SYKMELDINGER': {
            if (!state.data) {
                return {
                    data: action.sykmeldinger,
                    henter: false,
                    hentingFeilet: false,
                };
            }
            return {
                data: state.data.map((gammelSykmelding) => {
                    const nySykmelding = action.sykmeldinger.filter((sykmld) => {
                        return sykmld.id === gammelSykmelding.id;
                    })[0];
                    return Object.assign({}, gammelSykmelding, nySykmelding);
                }),
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
        case 'SYKMELDING_BEKREFTET': {
            const data = state.data.map((sykmelding) => {
                const _sykmelding = sykmelding;
                if (_sykmelding.id === action.sykmeldingId) {
                    _sykmelding.status = 'BEKREFTET';
                    _sykmelding.nettoppBekreftet = true;
                }
                return _sykmelding;
            });
            return Object.assign({}, state, { data });
        }
        case 'NAVIGER_FRA_BEKREFTETKVITTERING': {
            const data = state.data.map((sykmelding) => {
                const _sykmelding = sykmelding;
                if (_sykmelding.id === action.sykmeldingId) {
                    _sykmelding.nettoppBekreftet = false;
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
