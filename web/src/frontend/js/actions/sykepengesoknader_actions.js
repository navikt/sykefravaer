import * as actiontyper from './actiontyper';

export function henterSykepengesoknader() {
    return {
        type: actiontyper.HENTER_SYKEPENGESOKNADER,
    };
}

export function hentSykepengesoknaderFeilet() {
    return {
        type: actiontyper.HENT_SYKEPENGESOKNADER_FEILET,
    };
}

export function sykepengesoknaderHentet(sykepengesoknader = []) {
    return {
        type: actiontyper.SYKEPENGESOKNADER_HENTET,
        sykepengesoknader,
    };
}

export function hentSykepengesoknader() {
    return {
        type: actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT,
    };
}

export function sendSykepengesoknad(sykepengesoknad) {
    return {
        type: actiontyper.SEND_SYKEPENGESOKNAD_FORESPURT,
        sykepengesoknad,
    };
}

export function sendSykepengesoknadFeilet() {
    return {
        type: actiontyper.SEND_SYKEPENGESOKNAD_FEILET,
    };
}

export function sykepengesoknadSendt(sykepengesoknadsId, innsendtDato) {
    return {
        type: actiontyper.SYKEPENGESOKNAD_SENDT,
        sykepengesoknadsId,
        innsendtDato,
    };
}

export function senderSykepengesoknad() {
    return {
        type: actiontyper.SENDER_SYKEPENGESOKNAD,
    };
}
