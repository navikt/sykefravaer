import * as actiontyper from './actiontyper';

export function hentHendelser() {
    return {
        type: actiontyper.HENT_HENDELSER_FORESPURT,
    };
}

export function hentHendelserFeilet() {
    return {
        type: actiontyper.HENT_HENDELSER_FEILET,
    };
}

export function henterHendelser() {
    return {
        type: actiontyper.HENTER_HENDELSER,
    };
}

export function hendelserHentet(data) {
    return {
        type: actiontyper.HENDELSER_HENTET,
        data,
    };
}
