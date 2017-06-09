import { harLocalStorageStotte } from 'digisyfo-npm';
import * as actiontyper from './actiontyper';


export function skjulUnderUtviklingVarsel() {
    if (harLocalStorageStotte()) {
        window.localStorage.setItem('skjulUnderUtviklingVarsel', true);
    }
    return {
        type: actiontyper.SKJUL_UNDER_UTVIKLING_VARSEL,
    };
}

export function hentBrukerinfoFeilet() {
    return {
        type: actiontyper.HENT_BRUKERINFO_FEILET,
    };
}

export function henterBrukerinfo() {
    return {
        type: actiontyper.HENTER_BRUKERINFO,
    };
}

export function setBrukerinfo(brukerinfo = {}) {
    return {
        type: actiontyper.SET_BRUKERINFO,
        data: brukerinfo,
    };
}

export function setArbeidssituasjon(arbeidssituasjon) {
    return {
        type: actiontyper.SET_TIDSLINJE_ARBEIDSSITUASJON,
        arbeidssituasjon,
    };
}

export function setErInnlogget() {
    return {
        type: actiontyper.BRUKER_ER_INNLOGGET,
    };
}

export function setErUtlogget() {
    return {
        type: actiontyper.BRUKER_ER_UTLOGGET,
    };
}

export function sjekkerInnlogging() {
    return {
        type: actiontyper.SJEKKER_INNLOGGING,
    };
}

export function sjekkInnlogging() {
    return {
        type: actiontyper.SJEKK_INNLOGGING_FORESPURT,
    };
}

export function sjekkInnloggingFeilet() {
    return {
        type: actiontyper.SJEKK_INNLOGGING_FEILET,
    };
}

export function hentBrukerinfo() {
    return {
        type: actiontyper.HENT_BRUKERINFO_FORESPURT,
    };
}
