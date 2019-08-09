export const HENT_MOTEBEHOV_FORESPURT = 'HENT_MOTEBEHOV_FORESPURT';
export const HENT_MOTEBEHOV_HENTER = 'HENT_MOTEBEHOV_HENTER';
export const HENT_MOTEBEHOV_HENTET = 'HENT_MOTEBEHOV_HENTET';
export const HENT_MOTEBEHOV_FEILET = 'HENT_MOTEBEHOV_FEILET';
export const HENT_MOTEBEHOV_FORBUDT = 'HENT_MOTEBEHOV_FORBUDT';

export function hentMotebehov(virksomhetsnummer) {
    return {
        type: HENT_MOTEBEHOV_FORESPURT,
        virksomhetsnummer,
    };
}

export function hentMotebehovHenter() {
    return {
        type: HENT_MOTEBEHOV_HENTER,
    };
}

export function hentMotebehovHentet(data = []) {
    return {
        type: HENT_MOTEBEHOV_HENTET,
        data,
    };
}

export function hentMotebehovFeilet() {
    return {
        type: HENT_MOTEBEHOV_FEILET,
    };
}

export function hentMotebehovForbudt() {
    return {
        type: HENT_MOTEBEHOV_FORBUDT,
    };
}
