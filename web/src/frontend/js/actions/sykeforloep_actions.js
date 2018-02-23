import * as actiontyper from './actiontyper';

export function hentSykeforloep() {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_FORESPURT,
    };
}

export function henterSykeforloep() {
    return {
        type: actiontyper.HENTER_SYKEFORLOEP,
    };
}

export function sykeforloepHentet(data) {
    return {
        type: actiontyper.SYKEFORLOEP_HENTET,
        data,
    };
}

export function hentSykeforloepFeilet() {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_FEILET,
    };
}
