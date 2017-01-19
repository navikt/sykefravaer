import * as actiontyper from '../actions/actiontyper';

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
        case actiontyper.SET_ARBEIDSGIVERS_SYKMELDINGER: {
            return {
                data: action.sykmeldinger,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.HENTER_ARBEIDSGIVERS_SYKMELDINGER: {
            return {
                data: [],
                henter: true,
                hentingFeilet: false,
            };
        }
        case actiontyper.HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET: {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
            };
        }
        case actiontyper.SET_ARBEIDSGIVER: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidsgiver: action.arbeidsgiver,
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.SET_ARBEIDSSITUASJON: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidssituasjon: action.arbeidssituasjon,
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.SENDER_SYKMELDING:
        case actiontyper.BEKREFTER_SYKMELDING: {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
            });
        }
        case actiontyper.SYKMELDING_BEKREFTET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: 'BEKREFTET',
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.BEKREFT_SYKMELDING_FEILET: {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            });
        }
        case actiontyper.SEND_SYKMELDING_FEILET: {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
            });
        }
        case actiontyper.SYKMELDING_SENDT: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: 'SENDT',
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        case actiontyper.SET_FEILAKTIG_OPPLYSNING: {
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
        case actiontyper.SET_OPPLYSNINGENE_ER_RIKTIGE: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                opplysningeneErRiktige: action.erRiktige,
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.BRUKER_ER_UTLOGGET: {
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
