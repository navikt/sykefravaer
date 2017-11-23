import { parseSykmelding } from 'digisyfo-npm';
import * as actiontyper from '../actions/actiontyper';
import { SENDT, BEKREFTET } from '../enums/sykmeldingstatuser';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    hentet: false,
};

const setSykmeldingProps = (sykmeldinger, sykmeldingId, props) => {
    return sykmeldinger.map((sykmelding) => {
        let _sykmelding = { ...sykmelding };
        if (_sykmelding.id === sykmeldingId) {
            _sykmelding = { ..._sykmelding, ...props };
        }
        return _sykmelding;
    });
};

export default function arbeidsgiversSykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SET_ARBEIDSGIVERS_SYKMELDINGER: {
            if (!state.data || state.data.length === 0) {
                return {
                    data: action.sykmeldinger.map((s) => {
                        return parseSykmelding(s);
                    }),
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                };
            }
            return {
                data: state.data.map((gammelSykmelding) => {
                    const nySykmelding = action.sykmeldinger.filter((sykmld) => {
                        return sykmld.id === gammelSykmelding.id;
                    })[0];
                    return { ...gammelSykmelding, ...parseSykmelding(nySykmelding) };
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case actiontyper.HENTER_ARBEIDSGIVERS_SYKMELDINGER: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET: {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        case actiontyper.SET_ARBEIDSGIVER: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidsgiver: action.arbeidsgiver,
            });
            return {
                ...state,
                data,
            };
        }
        case actiontyper.SET_ARBEIDSSITUASJON: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidssituasjon: action.arbeidssituasjon,
            });
            return {
                ...state,
                data,
            };
        }
        case actiontyper.SENDER_SYKMELDING:
        case actiontyper.BEKREFTER_SYKMELDING: {
            return {
                ...state,
                sender: true,
                sendingFeilet: false,
            };
        }
        case actiontyper.SYKMELDING_BEKREFTET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: BEKREFTET,
            });
            return {
                ...state,
                data,
            };
        }
        case actiontyper.BEKREFT_SYKMELDING_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.SEND_SYKMELDING_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
            };
        }
        case actiontyper.SYKMELDING_SENDT: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: SENDT,
            });
            return {
                ...state,
                data,
                sender: false,
                sendingFeilet: false,
            };
        }
        case actiontyper.SET_FEILAKTIG_OPPLYSNING: {
            const data = state.data.map((sykmelding) => {
                const _sykmelding = { ...sykmelding };
                if (_sykmelding.id === action.sykmeldingId) {
                    const s = {};
                    s[action.opplysning] = action.erFeilaktig;
                    _sykmelding.feilaktigeOpplysninger = { ..._sykmelding.feilaktigeOpplysninger, ...s };
                }
                return _sykmelding;
            });
            return {
                ...state,
                data,
            };
        }
        case actiontyper.SET_OPPLYSNINGENE_ER_RIKTIGE: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                opplysningeneErRiktige: action.erRiktige,
            });
            return {
                ...state,
                data,
            };
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
