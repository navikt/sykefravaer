export const HENT_SYKEFORLOEP_FORESPURT = 'HENT_SYKEFORLOEP_FORESPURT';
export const HENTER_SYKEFORLOEP = 'HENTER_SYKEFORLOEP';
export const SYKEFORLOEP_HENTET = 'SYKEFORLOEP_HENTET';
export const HENT_SYKEFORLOEP_FEILET = 'HENT_SYKEFORLOEP_FEILET';

export function hentSykeforloep() {
    return {
        type: HENT_SYKEFORLOEP_FORESPURT,
    };
}

export function henterSykeforloep() {
    return {
        type: HENTER_SYKEFORLOEP,
    };
}

export function sykeforloepHentet(data) {
    return {
        type: SYKEFORLOEP_HENTET,
        data,
    };
}

export function hentSykeforloepFeilet() {
    return {
        type: HENT_SYKEFORLOEP_FEILET,
    };
}

