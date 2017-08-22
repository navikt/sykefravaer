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

export function sykepengesoknadSendtTilNAV(sykepengesoknadsId, sykepengesoknad) {
    return {
        type: actiontyper.SYKEPENGESOKNAD_SENDT_TIL_NAV,
        sykepengesoknadsId,
        sykepengesoknad,
    };
}

export function sykepengesoknadSendtTilArbeidsgiver(sykepengesoknadsId, sykepengesoknad) {
    return {
        type: actiontyper.SYKEPENGESOKNAD_SENDT_TIL_ARBEIDSGIVER,
        sykepengesoknadsId,
        sykepengesoknad,
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

export function startEndringForespurt(sykepengesoknadsId) {
    return {
        type: actiontyper.START_ENDRING_SYKEPENGESOKNAD_FORESPURT,
        sykepengesoknadsId,
    };
}

export function endringStartet(sykepengesoknad) {
    return {
        type: actiontyper.ENDRING_SYKEPENGESOKNAD_STARTET,
        sykepengesoknad,
    };
}

export function startEndringFeilet() {
    return {
        type: actiontyper.START_ENDRING_FEILET,
    };
}

export const berikelseHentet = (data, sykepengesoknadsId) => {
    return {
        type: actiontyper.SYKEPENGESOKNAD_BERIKELSE_HENTET,
        sykepengesoknadsId,
        data,
    };
};

export function hentBerikelse(sykepengesoknadsId) {
    return {
        type: actiontyper.SYKEPENGESOKNAD_BERIKELSE_FORESPURT,
        sykepengesoknadsId,
    };
}

export function henterBerikelse() {
    return {
        type: actiontyper.HENTER_SYKEPENGESOKNAD_BERIKELSE,
    };
}

export function hentBerikelseFeilet() {
    return {
        type: actiontyper.SYKEPENGESOKNAD_BERIKELSE_FEILET,
    };
}

export function avbrytSoknad(sykepengesoknadsId) {
    return {
        type: actiontyper.AVBRYT_SOKNAD_FORESPURT,
        sykepengesoknadsId,
    };
}

export function avbryterSoknad() {
    return {
        type: actiontyper.AVBRYTER_SOKNAD,
    };
}

export function soknadAvbrutt(sykepengesoknadsId) {
    return {
        type: actiontyper.SOKNAD_AVBRUTT,
        sykepengesoknadsId,
    };
}

export function avbrytSoknadFeilet() {
    return {
        type: actiontyper.AVBRYT_SOKNAD_FEILET,
    };
}

export function gjenapneSoknad(sykepengesoknadsId) {
    return {
        sykepengesoknadsId,
        type: actiontyper.GJENAPNE_SOKNAD_FORESPURT,
    };
}

export function gjenapnerSoknad() {
    return {
        type: actiontyper.GJENAPNER_SOKNAD,
    };
}

export function soknadGjenapnet(sykepengesoknadsId) {
    return {
        sykepengesoknadsId,
        type: actiontyper.SOKNAD_GJENAPNET,
    };
}

export function gjenapneSoknadFeilet() {
    return {
        type: actiontyper.GJENAPNE_SOKNAD_FEILET,
    };
}
