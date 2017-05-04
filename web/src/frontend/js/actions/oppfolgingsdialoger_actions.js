import * as actiontyper from './actiontyper';

export function hentOppfolgingsdialoger() {
    return {
        type: actiontyper.HENT_OPPFOLGINGSDIALOGER_FORESPURT,
    };
}

export function henterOppfolgingsdialoger() {
    return {
        type: actiontyper.HENTER_OPPFOLGINGSDIALOGER,
    };
}

export function oppfolgingsdialogerHentet(data) {
    return {
        type: actiontyper.OPPFOLGINGSDIALOGER_HENTET,
        data,
    };
}

export function hentOppfolgingsdialogerFeilet() {
    return {
        type: actiontyper.HENT_OPPFOLGINGSDIALOGER_FEILET,
    };
}
