const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
};

const setSykmeldingProps = (sykmeldinger, sykmeldingId, props) => {
    return sykmeldinger.map((sykmelding) => {
        let _sykmelding = Object.assign({}, sykmelding);
        if (_sykmelding.id === sykmeldingId) {
            _sykmelding = Object.assign({}, _sykmelding, props);
        }
        return _sykmelding;
    });
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
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidsgiver: action.arbeidsgiver,
            });
            return Object.assign({}, state, { data });
        }
        case 'SET_ARBEIDSSITUASJON': {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidssituasjon: action.arbeidssituasjon,
            });
            return Object.assign({}, state, { data });
        }
        case 'SENDER_SYKMELDING':
        case 'BEKREFTER_SYKMELDING': {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
            });
        }
        case 'SYKMELDING_BEKREFTET': {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: 'BEKREFTET',
            });
            return Object.assign({}, state, { data });
        }
        case 'BEKREFT_SYKMELDING_FEILET': {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            });
        }
        case 'SEND_SYKMELDING_FEILET': {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
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
        case 'BRUKER_ER_UTLOGGET': {
            return {
                data: [],
                hentingFeilet: false,
                henter: false,
            };
        }
        default:
            return state;
    }
}
