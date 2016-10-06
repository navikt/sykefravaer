import { harLocalStorageStotte } from '../utils';

export function skjulUnderUtviklingVarsel() {
    if (harLocalStorageStotte()) {
        window.localStorage.setItem('skjulUnderUtviklingVarsel', true);
    }
    return {
        type: 'SKJUL_UNDER_UTVIKLING_VARSEL',
    };
}

export function hentBrukerinfoFeilet() {
    return {
        type: 'HENT_BRUKERINFO_FEILET',
    };
}

export function henterBrukerinfo() {
    return {
        type: 'HENTER_BRUKERINFO',
    };
}

export function setBrukerinfo(brukerinfo = {}) {
    return Object.assign({}, {
        type: 'SET_BRUKERINFO',
    }, {
        data: brukerinfo,
    });
}

export function setArbeidssituasjon(arbeidssituasjon) {
    return {
        type: 'SET_TIDSLINJE_ARBEIDSSITUASJON',
        arbeidssituasjon,
    };
}

export function setErInnlogget() {
    return {
        type: 'BRUKER_ER_INNLOGGET',
    };
}

export function setErUtlogget() {
    return {
        type: 'BRUKER_ER_UTLOGGET',
    };
}

export function sjekkerInnlogging() {
    return {
        type: 'SJEKKER_INNLOGGING',
    };
}

export function sjekkInnlogging() {
    return {
        type: 'SJEKK_INNLOGGING_FORESPURT',
    };
}

export function hentBrukerinfo() {
    return {
        type: 'HENT_BRUKERINFO_FORESPURT'
    };
}
