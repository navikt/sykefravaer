import * as actiontyper from '../../../actions/actiontyper';

export function henterSykepengesoknader() {
    return {
        type: actiontyper.HENTER_SYKEPENGESOKNADER,
    };
}

export function hentSykepengesoknaderFeilet() {
    return {
        type: actiontyper.HENT_SYKEPENGESOKNADER_FEILET,
    };
}

export function sykepengesoknaderHentet(sykepengesoknader = []) {
    return {
        type: actiontyper.SYKEPENGESOKNADER_HENTET,
        sykepengesoknader,
    };
}

export function hentSykepengesoknader() {
    return {
        type: actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT,
    };
}

