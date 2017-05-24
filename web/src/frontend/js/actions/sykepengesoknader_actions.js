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

export function sendSykepengesoknadTilArbeidsgiver(sykepengesoknadsId) {
    return {
        type: actiontyper.SEND_SYKEPENGESOKNAD_TIL_ARBEIDSGIVER_FORESPURT,
        sykepengesoknadsId,
    };
}

export function sendSykepengesoknadTilNAV(sykepengesoknadsId) {
    return {
        type: actiontyper.SEND_SYKEPENGESOKNAD_TIL_NAV_FORESPURT,
        sykepengesoknadsId,
    };
}

export function sendSykepengesoknadFeilet() {
    return {
        type: actiontyper.SEND_SYKEPENGESOKNAD_FEILET,
    };
}

export function sykepengesoknadSendt(sykepengesoknadsId, sykepengesoknad) {
    return {
        type: actiontyper.SYKEPENGESOKNAD_SENDT,
        sykepengesoknadsId,
        sykepengesoknad,
    };
}

export function sykepengesoknadSendtTilNAV(sykepengesoknadsId) {
    return {
        type: actiontyper.SYKEPENGESOKNAD_SENDT_TIL_NAV,
        sykepengesoknadsId,
    };
}

export function sykepengesoknadSendtTilArbeidsgiver(sykepengesoknadsId) {
    return {
        type: actiontyper.SYKEPENGESOKNAD_SENDT_TIL_ARBEIDSGIVER,
        sykepengesoknadsId,
    };
}

export function senderSykepengesoknad() {
    return {
        type: actiontyper.SENDER_SYKEPENGESOKNAD,
    };
}

export function sendSykepengesoknadHarIkkeFeilet() {
    return {
        type: actiontyper.SEND_SYKEPENGESOKNAD_HAR_IKKE_FEILET,
    };
}
