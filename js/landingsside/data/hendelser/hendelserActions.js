export const HENT_HENDELSER_FORESPURT = 'HENT_HENDELSER_FORESPURT';
export const HENT_HENDELSER_FEILET = 'HENT_HENDELSER_FEILET';
export const HENTER_HENDELSER = 'HENTER_HENDELSER';
export const HENDELSER_HENTET = 'HENDELSER_HENTET';

export function hentHendelser() {
    return {
        type: HENT_HENDELSER_FORESPURT,
    };
}

export function hentHendelserFeilet() {
    return {
        type: HENT_HENDELSER_FEILET,
    };
}

export function henterHendelser() {
    return {
        type: HENTER_HENDELSER,
    };
}

export function hendelserHentet(data) {
    return {
        type: HENDELSER_HENTET,
        data,
    };
}
