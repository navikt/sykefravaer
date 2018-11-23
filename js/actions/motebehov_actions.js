import { actiontyper } from 'moter-npm';

export function hentMotebehov(virksomhetsnummer) {
    return {
        type: actiontyper.HENT_MOTEBEHOV_FORESPURT,
        virksomhetsnummer,
    };
}

export function hentMotebehovHenter() {
    return {
        type: actiontyper.HENT_MOTEBEHOV_HENTER,
    };
}

export function hentMotebehovHentet(data = []) {
    return {
        type: actiontyper.HENT_MOTEBEHOV_HENTET,
        data,
    };
}

export function hentMotebehovFeilet() {
    return {
        type: actiontyper.HENT_MOTEBEHOV_FEILET,
    };
}

export function hentMotebehovForbudt() {
    return {
        type: actiontyper.HENT_MOTEBEHOV_FORBUDT,
    };
}

export function svarMotebehov(svar, virksomhetsnummer) {
    return {
        type: actiontyper.SVAR_MOTEBEHOV_FORESPURT,
        svar,
        virksomhetsnummer,
    };
}

export function svarMotebehovSender(virksomhetsnummer) {
    return {
        type: actiontyper.SVAR_MOTEBEHOV_SENDER,
        virksomhetsnummer,
    };
}

export function svarMotebehovSendt(svar, virksomhetsnummer) {
    return {
        type: actiontyper.SVAR_MOTEBEHOV_SENDT,
        svar,
        virksomhetsnummer,
    };
}

export function svarMotebehovFeilet(virksomhetsnummer) {
    return {
        type: actiontyper.SVAR_MOTEBEHOV_FEILET,
        virksomhetsnummer,
    };
}
