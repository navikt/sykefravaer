import { parseSykepengesoknad, senesteTom, tidligsteFom } from '@navikt/digisyfo-npm';
import { HENT_SYKEPENGESOKNADER_FEILET, HENTER_SYKEPENGESOKNADER, SYKEPENGESOKNADER_HENTET } from './sykepengesoknader_actions';

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
    return {
        ...soknad,
        aktiviteter,
    };
}

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
    return {
        ...soknad,
        _erOppdelt,
    };
};

export const finnSoknad = (state, id) => {
    return state.sykepengesoknader.data.filter((s) => {
        return `${s.id}` === id;
    })[0] || {};
};

export default function sykepengesoknader(state = initiellState, action = {}) {
    switch (action.type) {
        case SYKEPENGESOKNADER_HENTET: {
            const soknader = action.sykepengesoknader.map((s) => {
                const soknad = settErOppdelt(parseSykepengesoknad(s));
                return sorterAktiviteterEldsteFoerst(soknad);
            });
            return {
                ...state,
                data: soknader,
                henter: false,
                hentingFeilet: false,
                hentet: true,
            };
        }
        case HENTER_SYKEPENGESOKNADER: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case HENT_SYKEPENGESOKNADER_FEILET: {
            return {
                ...state,
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        default:
            return state;
    }
}
