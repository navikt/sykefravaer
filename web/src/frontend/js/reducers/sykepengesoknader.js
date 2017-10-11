import { parseSykepengesoknad, tidligsteFom, senesteTom } from 'digisyfo-npm';
import * as actiontyper from '../actions/actiontyper';
import { KORRIGERT, AVBRUTT, NY, UTKAST_TIL_KORRIGERING, SLETTET_UTKAST } from '../enums/sykepengesoknadstatuser';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    data: [],
    hentet: false,
    henterBerikelse: false,
    henterBerikelseFeilet: false,
};

export function sorterAktiviteterEldsteFoerst(soknad) {
    const aktiviteter = soknad.aktiviteter.sort((a, b) => {
        if (a.periode.fom.getTime() !== b.periode.fom.getTime()) {
            return a.periode.fom - b.periode.fom;
        }
        return a.periode.tom - b.periode.tom;
    });
    return Object.assign({}, soknad, {
        aktiviteter,
    });
}

const setSykepengesoknaderProps = (_sykepengesoknader, soknadsId, props) => {
    return _sykepengesoknader.map((soknad) => {
        let _soknad = Object.assign({}, soknad);
        if (_soknad.id === soknadsId) {
            _soknad = Object.assign({}, _soknad, props);
        }
        return _soknad;
    });
};

export const settErOppdelt = (soknad) => {
    const perioder = soknad.aktiviteter.map((a) => {
        return a.periode;
    });
    const _senesteTom = senesteTom(perioder);
    const _tidligsteFom = tidligsteFom(perioder);
    const _erOppdelt = (() => {
        if (!soknad.fom || !soknad.tom) {
            return false;
        }
        return !(soknad.fom.getTime() === _tidligsteFom.getTime() && soknad.tom.getTime() === _senesteTom.getTime());
    })();
    return Object.assign({}, soknad, {
        _erOppdelt,
    });
};

export const finnSoknad = (state, id) => {
    const soknad = state.sykepengesoknader.data.filter((s) => { return `${s.id}` === id; });
    return soknad[0] || {};
};

export default function sykepengesoknader(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SYKEPENGESOKNADER_HENTET: {
            const soknader = action.sykepengesoknader.map((s) => {
                const soknad = settErOppdelt(parseSykepengesoknad(s));
                return sorterAktiviteterEldsteFoerst(soknad);
            });
            return Object.assign({}, state, {
                data: soknader,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            });
        }
        case actiontyper.HENTER_SYKEPENGESOKNADER: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
                hentet: false,
            });
        }
        case actiontyper.HENT_SYKEPENGESOKNADER_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
                hentet: true,
            });
        }
        case actiontyper.SENDER_SYKEPENGESOKNAD: {
            return Object.assign({}, state, {
                sender: true,
                sendingFeilet: false,
            });
        }
        case actiontyper.SEND_SYKEPENGESOKNAD_FEILET: {
            return Object.assign({}, state, {
                sender: false,
                sendingFeilet: true,
            });
        }
        case actiontyper.SEND_SYKEPENGESOKNAD_HAR_IKKE_FEILET: {
            return Object.assign({}, state, {
                sendingFeilet: false,
                sender: false,
            });
        }
        case actiontyper.START_ENDRING_SYKEPENGESOKNAD_FORESPURT: {
            return Object.assign({}, state, {
                starterEndring: true,
                startEndringFeilet: false,
            });
        }
        case actiontyper.ENDRING_SYKEPENGESOKNAD_STARTET: {
            let data = state.data;
            const soknad = settErOppdelt(parseSykepengesoknad(action.sykepengesoknad));
            if (state.data.filter((s) => {
                return s.id === soknad.id;
            }).length === 0) {
                data = [...state.data, soknad];
            }
            return Object.assign({}, state, {
                data,
                starterEndring: false,
                startEndringFeilet: false,
            });
        }
        case actiontyper.START_ENDRING_FEILET: {
            return Object.assign({}, state, {
                starterEndring: false,
                startEndringFeilet: true,
            });
        }
        case actiontyper.SYKEPENGESOKNAD_SENDT:
        case actiontyper.SYKEPENGESOKNAD_SENDT_TIL_NAV:
        case actiontyper.SYKEPENGESOKNAD_SENDT_TIL_ARBEIDSGIVER: {
            let data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, settErOppdelt(parseSykepengesoknad(action.sykepengesoknad)));
            if (action.sykepengesoknad.korrigerer) {
                data = setSykepengesoknaderProps(data, action.sykepengesoknad.korrigerer, {
                    status: KORRIGERT,
                });
            }
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        case actiontyper.SYKEPENGESOKNAD_BERIKELSE_HENTET: {
            const berikelse = Object.assign({}, action.data, {
                forrigeSykeforloepTom: action.data.forrigeSykeforloepTom ? new Date(action.data.forrigeSykeforloepTom) : action.data.forrigeSykeforloepTom,
            });
            const data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, berikelse);
            return Object.assign({}, state, {
                data,
                henterBerikelse: false,
                henterBerikelseFeilet: false,
            });
        }
        case actiontyper.HENTER_SYKEPENGESOKNAD_BERIKELSE: {
            return Object.assign({}, state, {
                henterBerikelse: true,
                henterBerikelseFeilet: false,
            });
        }
        case actiontyper.SYKEPENGESOKNAD_BERIKELSE_FEILET: {
            return Object.assign({}, state, {
                henterBerikelse: false,
                henterBerikelseFeilet: true,
            });
        }
        case actiontyper.AVBRYTER_SOKNAD: {
            return Object.assign({}, state, {
                avbryter: true,
            });
        }
        case actiontyper.AVBRYT_SOKNAD_FEILET: {
            return Object.assign({}, state, {
                avbryter: false,
                avbrytFeilet: true,
            });
        }
        case actiontyper.SOKNAD_AVBRUTT: {
            const soknad = finnSoknad({ sykepengesoknader: state }, action.sykepengesoknadsId);
            let status = AVBRUTT;
            if (soknad.status === UTKAST_TIL_KORRIGERING) {
                status = SLETTET_UTKAST;
            }
            const data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, {
                status,
                avbruttDato: new Date(),
            });
            return Object.assign({}, state, {
                data,
                avbryter: false,
                avbrytFeilet: false,
            });
        }
        case actiontyper.GJENAPNER_SOKNAD: {
            return Object.assign({}, state, {
                gjenapner: true,
            });
        }
        case actiontyper.GJENAPNE_SOKNAD_FEILET: {
            return Object.assign({}, state, {
                gjenapner: false,
                gjenapneFeilet: true,
            });
        }
        case actiontyper.SOKNAD_GJENAPNET: {
            const data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, {
                status: NY,
                avbruttDato: null,
            });
            return Object.assign({}, state, {
                data,
                gjenapner: false,
                gjenapneFeilet: false,
            });
        }
        default:
            return state;
    }
}
