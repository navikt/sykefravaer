export function henterLedetekster() {
    return {
        type: 'HENTER_LEDETEKSTER',
    };
}

export function setLedetekster(ledetekster = {}) {
    return {
        type: 'SET_LEDETEKSTER',
        ledetekster,
    };
}

export function hentLedeteksterFeilet() {
    return {
        type: 'HENT_LEDETEKSTER_FEILET',
    };
}

export function hentLedetekster() {
    return {
        type: 'HENT_LEDETEKSTER_FORESPURT',
    };
}
