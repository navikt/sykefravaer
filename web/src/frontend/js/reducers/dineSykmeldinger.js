import { parseSykmelding, sykmeldingstatuser } from 'digisyfo-npm';
import * as actiontyper from '../actions/actiontyper';

const { SENDT, BEKREFTET, AVBRUTT, NY } = sykmeldingstatuser;

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

export default function sykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SET_DINE_SYKMELDINGER: {
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
        case actiontyper.HENTER_DINE_SYKMELDINGER: {
            return {
                data: state.data,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.AVBRYTER_SYKMELDING: {
            return {
                ...state,
                avbryter: true,
                avbrytFeilet: false,
            };
        }
        case actiontyper.AVBRYT_SYKMELDING_FEILET: {
            return {
                ...state,
                avbryter: false,
                avbrytFeilet: true,
            };
        }
        case actiontyper.SYKMELDING_AVBRUTT: {
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
        case actiontyper.GJENAAPNER_SYKMELDING: {
            return {
                ...state,
                gjenaapner: true,
                gjenaapneFeilet: false,
            };
        }
        case actiontyper.GJENAAPNE_SYKMELDING_FEILET: {
            return {
                ...state,
                gjenaapner: false,
                gjenaapneFeilet: true,
            };
        }
        case actiontyper.SYKMELDING_GJENAAPNET: {
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


        case actiontyper.ANGRER_BEKREFT_SYKMELDING: {
            return {
                ...state,
                angreBekreftSykmelding: true,
                angreBekreftSykmeldingFeilet: false,
            };
        }
        case actiontyper.ANGRE_BEKREFT_SYKMELDING_FEILET: {
            return {
                ...state,
                angreBekreftSykmelding: false,
                angreBekreftSykmeldingFeilet: true,
            };
        }
        case actiontyper.BEKREFT_SYKMELDING_ANGRET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: NY,
            });
            return {
                ...state,
                data,
                angreBekreftSykmelding: false,
                angreBekreftSykmeldingFeilet: false,
            };
        }


        case actiontyper.HENT_DINE_SYKMELDINGER_FEILET: {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
                hentet: true,
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
        case actiontyper.SYKMELDING_BEKREFTET: {
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
        case actiontyper.SET_SORTERING: {
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
            return { ...state, data };
        }
        case actiontyper.SET_OPPLYSNINGENE_ER_RIKTIGE: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                opplysningeneErRiktige: action.erRiktige,
            });
            return { ...state, data };
        }
        case actiontyper.SENDER_SYKMELDING:
        case actiontyper.BEKREFTER_SYKMELDING: {
            return {
                ...state,
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.SEND_SYKMELDING_FEILET:
        case actiontyper.BEKREFT_SYKMELDING_FEILET: {
            return {
                ...state,
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
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
        case actiontyper.BRUKER_ER_UTLOGGET: {
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
