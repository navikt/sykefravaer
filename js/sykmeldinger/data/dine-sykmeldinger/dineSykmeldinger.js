import { parseSykmelding, sykmeldingstatuser } from '@navikt/digisyfo-npm';
import { BRUKER_ER_UTLOGGET } from '../../../data/brukerinfo/brukerinfo_actions';
import {
    HENT_DINE_SYKMELDINGER_FEILET,
    HENTER_DINE_SYKMELDINGER,
    SET_DINE_SYKMELDINGER,
    SET_SORTERING,
} from './dineSykmeldingerActions';
import {
    ANGRE_BEKREFT_SYKMELDING_FEILET,
    ANGRER_BEKREFT_SYKMELDING,
    AVBRYT_SYKMELDING_FEILET,
    AVBRYTER_SYKMELDING,
    BEKREFT_SYKMELDING_ANGRET,
    BEKREFT_SYKMELDING_FEILET,
    BEKREFTER_SYKMELDING,
    GJENAAPNE_SYKMELDING_FEILET,
    GJENAAPNER_SYKMELDING,
    SEND_SYKMELDING_FEILET,
    SENDER_SYKMELDING,
    SET_ARBEIDSSITUASJON,
    SET_FEILAKTIG_OPPLYSNING,
    SET_OPPLYSNINGENE_ER_RIKTIGE,
    SYKMELDING_AVBRUTT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_GJENAAPNET,
    SYKMELDING_SENDT,
} from '../din-sykmelding/dinSykmeldingActions';

const {
    SENDT, BEKREFTET, AVBRUTT, NY,
} = sykmeldingstatuser;

const initiellState = {
    henter: false,
    hentingFeilet: false,
    hentet: false,
    data: [],
};

const setSykmeldingProps = (_sykmeldinger, sykmeldingId, props) => {
    return _sykmeldinger.map((sykmelding) => {
        if (sykmelding.id === sykmeldingId) {
            return {
                ...sykmelding,
                ...props,
            };
        }
        return { ...sykmelding };
    });
};

const dineSykmeldinger = (state = initiellState, action = {}) => {
    switch (action.type) {
        case SET_DINE_SYKMELDINGER: {
            if (!state.data || state.data.length === 0) {
                console.log(action.sykmeldinger);
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
                    return {
                        ...gammelSykmelding,
                        ...parseSykmelding(nySykmelding),
                    };
                }),
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_DINE_SYKMELDINGER: {
            return {
                data: state.data,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case AVBRYTER_SYKMELDING: {
            return {
                ...state,
                avbryter: true,
                avbrytFeilet: false,
            };
        }
        case AVBRYT_SYKMELDING_FEILET: {
            return {
                ...state,
                avbryter: false,
                avbrytFeilet: true,
            };
        }
        case SYKMELDING_AVBRUTT: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: AVBRUTT,
            });
            return {
                ...state,
                data,
                avbryter: false,
                avbrytFeilet: false,
            };
        }
        case GJENAAPNER_SYKMELDING: {
            return {
                ...state,
                gjenaapner: true,
                gjenaapneFeilet: false,
            };
        }
        case GJENAAPNE_SYKMELDING_FEILET: {
            return {
                ...state,
                gjenaapner: false,
                gjenaapneFeilet: true,
            };
        }
        case SYKMELDING_GJENAAPNET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: AVBRUTT,
            });
            return {
                ...state,
                data,
                gjenaapner: false,
                gjenaapneFeilet: false,
            };
        }
        case ANGRER_BEKREFT_SYKMELDING: {
            return {
                ...state,
                angrerBekreftSykmelding: true,
                angreBekreftSykmeldingFeilet: false,
            };
        }
        case ANGRE_BEKREFT_SYKMELDING_FEILET: {
            return {
                ...state,
                angrerBekreftSykmelding: false,
                angreBekreftSykmeldingFeilet: true,
            };
        }
        case BEKREFT_SYKMELDING_ANGRET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: NY,
            });
            return {
                ...state,
                data,
                angrerBekreftSykmelding: false,
                angreBekreftSykmeldingFeilet: false,
            };
        }
        case HENT_DINE_SYKMELDINGER_FEILET: {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
                hentet: true,
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
        case SYKMELDING_BEKREFTET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: BEKREFTET,
            });
            return {
                ...state,
                data,
                sender: false,
                sendingFeilet: false,
            };
        }
        case SET_SORTERING: {
            let sortering = {};
            sortering[action.status] = action.kriterium;
            sortering = {
                ...state.sortering,
                ...sortering,
            };
            return {
                ...state,
                sortering,
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
            return { ...state, data };
        }
        case SET_OPPLYSNINGENE_ER_RIKTIGE: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                opplysningeneErRiktige: action.erRiktige,
            });
            return { ...state, data };
        }
        case SENDER_SYKMELDING:
        case BEKREFTER_SYKMELDING: {
            return {
                ...state,
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            };
        }
        case SEND_SYKMELDING_FEILET:
        case BEKREFT_SYKMELDING_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
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
        case BRUKER_ER_UTLOGGET: {
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
};

export default dineSykmeldinger;
