export function hentLedetekster() {
    return {
        type: 'HENT_LEDETEKSTER',
    };
}

export function hentLedeteksterFeilet() {
    return {
        type: 'HENT_LEDETEKSTER_FEILET',
    };
}

export function setLedetekster(ledetekster = []) {
    return {
        type: 'SET_LEDETEKSTER',
        ledetekster,
    };
}
