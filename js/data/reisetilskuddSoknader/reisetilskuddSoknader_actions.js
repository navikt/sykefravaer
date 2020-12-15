export const HENTER_REISETILSKUDDSOKNADER = 'HENTER_REISETILSKUDDSOKNADER';
export const HENT_REISETILSKUDDSOKNADER_FEILET = 'HENT_REISETILSKUDDSOKNADER_FEILET';
export const REISETILSKUDDSOKNADER_HENTET = 'REISETILSKUDDSOKNADER_HENTET';
export const HENT_REISETILSKUDDSOKNADER_FORESPURT = 'HENT_REISETILSKUDDSOKNADER_FORESPURT';

export function henterReisetilskuddSoknader() {
    return {
        type: HENTER_REISETILSKUDDSOKNADER,
    };
}

export function hentReisetilskuddSoknaderFeilet() {
    return {
        type: HENT_REISETILSKUDDSOKNADER_FEILET,
    };
}

export function reisetilskuddSoknaderHentet(reisetilskuddSoknader = []) {
    return {
        type: REISETILSKUDDSOKNADER_HENTET,
        reisetilskuddSoknader,
    };
}

export function hentReisetilskuddSoknader() {
    return {
        type: HENT_REISETILSKUDDSOKNADER_FORESPURT,
    };
}
