export const HENT_MOTEBEHOV_FORESPURT = 'HENT_MOTEBEHOV_FORESPURT';
export const HENT_MOTEBEHOV_HENTER = 'HENT_MOTEBEHOV_HENTER';
export const HENT_MOTEBEHOV_HENTET = 'HENT_MOTEBEHOV_HENTET';
export const HENT_MOTEBEHOV_FEILET = 'HENT_MOTEBEHOV_FEILET';
export const HENT_MOTEBEHOV_FORBUDT = 'HENT_MOTEBEHOV_FORBUDT';

export const SVAR_MOTEBEHOV_FORESPURT = 'SVAR_MOTEBEHOV_FORESPURT';
export const SVAR_MOTEBEHOV_SENDER = 'SVAR_MOTEBEHOV_SENDER';
export const SVAR_MOTEBEHOV_SENDT = 'SVAR_MOTEBEHOV_SENDT';
export const SVAR_MOTEBEHOV_FEILET = 'SVAR_MOTEBEHOV_FEILET';

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

export function svarMotebehov(svar, virksomhetsnummer) {
    return {
        type: SVAR_MOTEBEHOV_FORESPURT,
        svar,
        virksomhetsnummer,
    };
}

export function svarMotebehovSender(virksomhetsnummer) {
    return {
        type: SVAR_MOTEBEHOV_SENDER,
        virksomhetsnummer,
    };
}

export function svarMotebehovSendt(svar, virksomhetsnummer) {
    return {
        type: SVAR_MOTEBEHOV_SENDT,
        svar,
        virksomhetsnummer,
    };
}

export function svarMotebehovFeilet(virksomhetsnummer) {
    return {
        type: SVAR_MOTEBEHOV_FEILET,
        virksomhetsnummer,
    };
}
