export const HENTER_SYKEPENGESOKNADER = 'HENTER_SYKEPENGESOKNADER';
export const HENT_SYKEPENGESOKNADER_FEILET = 'HENT_SYKEPENGESOKNADER_FEILET';
export const SYKEPENGESOKNADER_HENTET = 'SYKEPENGESOKNADER_HENTET';
export const HENT_SYKEPENGESOKNADER_FORESPURT = 'HENT_SYKEPENGESOKNADER_FORESPURT';

export function henterSykepengesoknader() {
    return {
        type: HENTER_SYKEPENGESOKNADER,
    };
}

export function hentSykepengesoknaderFeilet() {
    return {
        type: HENT_SYKEPENGESOKNADER_FEILET,
    };
}

export function sykepengesoknaderHentet(sykepengesoknader = []) {
    return {
        type: SYKEPENGESOKNADER_HENTET,
        sykepengesoknader,
    };
}

export function hentSykepengesoknader() {
    return {
        type: HENT_SYKEPENGESOKNADER_FORESPURT,
    };
}
