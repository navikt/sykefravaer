const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    erFeil: false,
};

const setSykmeldingProps = (_sykmeldinger, sykmeldingId, props) => {
    return _sykmeldinger.map((sykmelding) => {
        let _sykmelding = Object.assign({}, sykmelding);
        if (_sykmelding.id === sykmeldingId) {
            _sykmelding = Object.assign({}, _sykmelding, props);
        }
        return _sykmelding;
    });
};

export default function sykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case 'SET_DINE_SYKMELDINGER': {
            if (!state.data || state.data.length === 0) {
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
                data: state.data,
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'AVBRYTER_SYKMELDING': {
            return Object.assign({}, state, {
                avbryter: true,
                avbrytFeilet: false,
            });
        }
        case 'AVBRYT_SYKMELDING_FEILET': {
            return Object.assign({}, state, {
                avbryter: false,
                avbrytFeilet: true,
            });
        }
        case 'SYKMELDING_AVBRUTT': {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: 'AVBRUTT',
            });
            return Object.assign({}, state, { data }, {
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case 'HENT_DINE_SYKMELDINGER_FEILET': {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
            };
        }
        case 'SET_ARBEIDSSITUASJON': {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidssituasjon: action.arbeidssituasjon,
            });
            return Object.assign({}, state, { data });
        }
        case 'SYKMELDING_BEKREFTET': {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: 'BEKREFTET',
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        case 'SET_SORTERING': {
            let sortering = {};
            sortering[action.status] = action.kriterium;
            sortering = Object.assign({}, state.sortering, sortering);
            return Object.assign({}, state, {
                sortering,
            });
        }
        case 'SET_FEILAKTIG_OPPLYSNING': {
            const data = state.data.map((sykmelding) => {
                const _sykmelding = Object.assign({}, sykmelding);
                if (_sykmelding.id === action.sykmeldingId) {
                    const s = {};
                    s[action.opplysning] = action.erFeilaktig;
                    _sykmelding.feilaktigeOpplysninger = Object.assign({}, _sykmelding.feilaktigeOpplysninger, s);
                }
                return _sykmelding;
            });
            return Object.assign({}, state, { data });
        }
        case 'SET_OPPLYSNINGENE_ER_RIKTIGE': {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                opplysningeneErRiktige: action.erRiktige,
            });
            return Object.assign({}, state, { data });
        }
        case 'SENDER_SYKMELDING':
        case 'BEKREFTER_SYKMELDING': {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        }
        case 'SEND_SYKMELDING_FEILET':
        case 'BEKREFT_SYKMELDING_FEILET': {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            });
        }
        case 'SYKMELDING_SENDT': {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: 'SENDT',
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        case 'BRUKER_ER_UTLOGGET': {
            return {
                data: [],
                hentingFeilet: false,
                henter: false,
            };
        }
        default: {
            return state;
        }
    }
}
