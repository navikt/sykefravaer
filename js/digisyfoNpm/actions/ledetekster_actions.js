import * as actiontyper from './actiontyper';

export function henterLedetekster() {
    return {
        type: actiontyper.HENTER_LEDETEKSTER,
    };
}

export function ledeteksterHentet(ledetekster = {}) {
    return {
        type: actiontyper.LEDETEKSTER_HENTET,
        ledetekster,
    };
}

export function hentLedeteksterFeilet() {
    return {
        type: actiontyper.HENT_LEDETEKSTER_FEILET,
    };
}

export function hentLedetekster() {
    return {
        type: actiontyper.HENT_LEDETEKSTER_FORESPURT,
    };
}
