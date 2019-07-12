import { parseSykmelding, sykmeldingstatuser } from '@navikt/digisyfo-npm';
import { HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET, HENTER_ARBEIDSGIVERS_SYKMELDINGER, SET_ARBEIDSGIVERS_SYKMELDINGER } from './arbeidsgiversSykmeldingerActions';
import { BRUKER_ER_UTLOGGET } from '../../../data/brukerinfo/brukerinfo_actions';
import {
    BEKREFT_SYKMELDING_FEILET,
    BEKREFTER_SYKMELDING,
    SEND_SYKMELDING_FEILET,
    SENDER_SYKMELDING,
    SET_ARBEIDSGIVER,
    SET_FEILAKTIG_OPPLYSNING,
    SET_OPPLYSNINGENE_ER_RIKTIGE,
    SYKMELDING_BEKREFTET, SYKMELDING_SENDT,
    SET_ARBEIDSSITUASJON,
} from '../din-sykmelding/dinSykmeldingActions';

const { SENDT, BEKREFTET } = sykmeldingstatuser;

const initiellState = {
    henter: false,
    hentingFeilet: false,
    data: [],
    hentet: false,
};

const setSykmeldingProps = (sykmeldinger, sykmeldingId, props) => sykmeldinger.map((sykmelding) => {
    let _sykmelding = { ...sykmelding };
    if (_sykmelding.id === sykmeldingId) {
        _sykmelding = { ..._sykmelding, ...props };
    }
    return _sykmelding;
});

export default function arbeidsgiversSykmeldinger(state = initiellState, action = {}) {
    switch (action.type) {
        case SET_ARBEIDSGIVERS_SYKMELDINGER: {
            if (!state.data || state.data.length === 0) {
                return {
                    data: action.sykmeldinger.map(s => parseSykmelding(s)),
                    henter: false,
                    hentingFeilet: false,
                    hentet: true,
                };
            }
            return {
                data: state.data.map((gammelSykmelding) => {
                    const nySykmelding = action.sykmeldinger.filter(sykmld => sykmld.id === gammelSykmelding.id)[0];
                    return { ...gammelSykmelding, ...parseSykmelding(nySykmelding) };
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_ARBEIDSGIVERS_SYKMELDINGER: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET: {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        case SET_ARBEIDSGIVER: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidsgiver: action.arbeidsgiver,
            });
            return {
                ...state,
                data,
            };
        }
        case SET_ARBEIDSSITUASJON: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidssituasjon: action.arbeidssituasjon,
            });
            return {
                ...state,
                data,
            };
        }
        case SENDER_SYKMELDING:
        case BEKREFTER_SYKMELDING: {
            return {
                ...state,
                sender: true,
                sendingFeilet: false,
            };
        }
        case SYKMELDING_BEKREFTET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: BEKREFTET,
            });
            return {
                ...state,
                data,
            };
        }
        case BEKREFT_SYKMELDING_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            };
        }
        case SEND_SYKMELDING_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
            };
        }
        case SYKMELDING_SENDT: {
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
        case SET_FEILAKTIG_OPPLYSNING: {
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
        case SET_OPPLYSNINGENE_ER_RIKTIGE: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                opplysningeneErRiktige: action.erRiktige,
            });
            return {
                ...state,
                data,
            };
        }
        case BRUKER_ER_UTLOGGET: {
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
