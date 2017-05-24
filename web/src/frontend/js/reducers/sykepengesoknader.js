import * as actiontyper from '../actions/actiontyper';
import { tilDato, parseDatoerPeriodeListe, parseDatoerPeriode } from '../utils/serialisering/dato';

const initiellState = {
    henter: false,
    hentingFeilet: false,
    sender: false,
    sendingFeilet: false,
    data: [],
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

const parseAktivitetsdatoer = (aktiviteter) => {
    return aktiviteter.map((aktivitet) => {
        return Object.assign({}, aktivitet,
            {
                periode: parseDatoerPeriode(aktivitet.periode),
            }
        );
    });
};

const parseUtdanningsDato = (utdanning) => {
    return utdanning && Object.assign({}, utdanning, { utdanningStartdato: tilDato(utdanning.utdanningStartdato) });
};

const parseUtenlandsopphold = (utenlandsopphold) => {
    return utenlandsopphold && Object.assign({}, utenlandsopphold, { perioder: parseDatoerPeriodeListe(utenlandsopphold.perioder) });
};

export const parseDatofelter = (soknad) => {
    return Object.assign({}, soknad, {
        aktiviteter: parseAktivitetsdatoer(soknad.aktiviteter),
        egenmeldingsperioder: soknad.egenmeldingsperioder && parseDatoerPeriodeListe(soknad.egenmeldingsperioder),
        ferie: soknad.ferie && parseDatoerPeriodeListe(soknad.ferie),
        permisjon: soknad.permisjon && parseDatoerPeriodeListe(soknad.permisjon),
        utenlandsopphold: parseUtenlandsopphold(soknad.utenlandsopphold),
        utdanning: parseUtdanningsDato(soknad.utdanning),
        gjenopptattArbeidFulltUtDato: tilDato(soknad.gjenopptattArbeidFulltUtDato),
        identdato: tilDato(soknad.identdato),
        sendtTilArbeidsgiverDato: tilDato(soknad.sendtTilArbeidsgiverDato),
        sendtTilNAVDato: tilDato(soknad.sendtTilNAVDato),
        opprettetDato: tilDato(soknad.opprettetDato),
        sykmeldingSkrevetDato: tilDato(soknad.sykmeldingSkrevetDato),
        forrigeSykeforloepTom: tilDato(soknad.forrigeSykeforloepTom),
    });
};

export default function sykepengesoknader(state = initiellState, action) {
    switch (action.type) {
        case actiontyper.SYKEPENGESOKNADER_HENTET: {
            const soknader = action.sykepengesoknader.map((s) => {
                const soknad = parseDatofelter(s);
                return sorterAktiviteterEldsteFoerst(soknad);
            });
            return Object.assign({}, state, {
                data: soknader,
                henter: false,
                hentingFeilet: false,
            });
        }
        case actiontyper.HENTER_SYKEPENGESOKNADER: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        case actiontyper.HENT_SYKEPENGESOKNADER_FEILET: {
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: true,
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
        case actiontyper.SYKEPENGESOKNAD_SENDT_TIL_NAV: {
            const data = state.data.map((s) => {
                if (s.id === action.sykepengesoknadsId) {
                    return Object.assign({}, s, {
                        sendtTilNAVDato: new Date(),
                    });
                }
                return s;
            });
            return Object.assign({}, state, {
                data,
                sender: false,
                sendingFeilet: false,
            });
        }
        case actiontyper.SYKEPENGESOKNAD_SENDT_TIL_ARBEIDSGIVER: {
            const data = state.data.map((s) => {
                if (s.id === action.sykepengesoknadsId) {
                    return Object.assign({}, s, {
                        sendtTilArbeidsgiverDato: new Date(),
                    });
                }
                return s;
            });
            return Object.assign({}, state, {
                data,
                sender: false,
                sendingFeilet: false,
            });
        }
        case actiontyper.SYKEPENGESOKNAD_SENDT: {
            const data = setSykepengesoknaderProps(state.data, action.sykepengesoknadsId, parseDatofelter(action.sykepengesoknad));
            return Object.assign({}, state, { data }, {
                sender: false,
                sendingFeilet: false,
            });
        }
        default:
            return state;
    }
}
