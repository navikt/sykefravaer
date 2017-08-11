import * as actiontyper from '../actions/actiontyper';
import { SENDT, BEKREFTET, AVBRUTT } from '../enums/sykmeldingstatuser';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    hentet: false,
    data: [],
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

const tilDato = (dato) => {
    return dato === null ? null : new Date(dato);
};

export const parseDatofelter = (soknad) => {
    return Object.assign({}, soknad, {
        startLegemeldtFravaer: tilDato(soknad.startLegemeldtFravaer),
        identdato: tilDato(soknad.identdato),
        sendtdato: tilDato(soknad.sendtdato),
        diagnose: Object.assign({}, soknad.diagnose, {
            yrkesskadeDato: tilDato(soknad.diagnose.yrkesskadeDato),
        }),
        mulighetForArbeid: Object.assign({}, soknad.mulighetForArbeid, {
            perioder: soknad.mulighetForArbeid.perioder.map((p) => {
                return Object.assign({}, p, {
                    fom: tilDato(p.fom),
                    tom: tilDato(p.tom),
                });
            }),
        }),
        friskmelding: Object.assign({}, soknad.friskmelding, {
            antattDatoReturSammeArbeidsgiver: tilDato(soknad.friskmelding.antattDatoReturSammeArbeidsgiver),
            tilbakemeldingReturArbeid: tilDato(soknad.friskmelding.tilbakemeldingReturArbeid),
            utenArbeidsgiverAntarTilbakeIArbeidDato: tilDato(soknad.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato),
            utenArbeidsgiverTilbakemelding: tilDato(soknad.friskmelding.utenArbeidsgiverTilbakemelding),
        }),
        bekreftelse: Object.assign({}, soknad.bekreftelse, {
            utstedelsesdato: tilDato(soknad.bekreftelse.utstedelsesdato),
        }),
        tilbakedatering: Object.assign({}, soknad.tilbakedatering, {
            dokumenterbarPasientkontakt: tilDato(soknad.tilbakedatering.dokumenterbarPasientkontakt),
        }),
    });
};

export default function sykmeldinger(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SET_DINE_SYKMELDINGER: {
            if (!state.data || state.data.length === 0) {
                return {
                    data: action.sykmeldinger.map((s) => {
                        return parseDatofelter(s);
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
                    return Object.assign({}, gammelSykmelding, parseDatofelter(nySykmelding));
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
            return Object.assign({}, state, {
                avbryter: true,
                avbrytFeilet: false,
            });
        }
        case actiontyper.AVBRYT_SYKMELDING_FEILET: {
            return Object.assign({}, state, {
                avbryter: false,
                avbrytFeilet: true,
            });
        }
        case actiontyper.SYKMELDING_AVBRUTT: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: AVBRUTT,
            });
            return Object.assign({}, state, { data }, {
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actiontyper.HENT_DINE_SYKMELDINGER_FEILET: {
            return {
                data: [],
                henter: false,
                hentingFeilet: true,
                hentet: false,
            };
        }
        case actiontyper.SET_ARBEIDSSITUASJON: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                valgtArbeidssituasjon: action.arbeidssituasjon,
            });
            return Object.assign({}, state, { data });
        }
        case actiontyper.SYKMELDING_BEKREFTET: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: BEKREFTET,
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        case actiontyper.SET_SORTERING: {
            let sortering = {};
            sortering[action.status] = action.kriterium;
            sortering = Object.assign({}, state.sortering, sortering);
            return Object.assign({}, state, {
                sortering,
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
        case actiontyper.SENDER_SYKMELDING:
        case actiontyper.BEKREFTER_SYKMELDING: {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        }
        case actiontyper.SEND_SYKMELDING_FEILET:
        case actiontyper.BEKREFT_SYKMELDING_FEILET: {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            });
        }
        case actiontyper.SYKMELDING_SENDT: {
            const data = setSykmeldingProps(state.data, action.sykmeldingId, {
                status: SENDT,
            });
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
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
