export function henterSykepengesoknader() {
    return {
        type: 'HENTER_SYKEPENGESOKNADER',
    };
}

export function hentSykepengesoknaderFeilet() {
    return {
        type: 'HENT_SYKEPENGESOKNADER_FEILET',
    };
}

export function setSykepengesoknader(soknader = []) {
    return {
        type: 'SET_SYKEPENGESOKNADER',
        soknader,
    };
}

export function hentSykepengesoknader() {
    return {
        type: 'HENT_SYKEPENGESOKNADER_FORESPURT',
    };
}

export function sendSykepengesoknad(soknad) {
    return {
        type: 'SEND_SYKEPENGESOKNAD_FORESPURT',
        soknad: soknad
    };
}

export function sendSykepengesoknadFeilet() {
    return {
        type: 'SEND_SYKEPENGESOKNAD_FEILET',
    };
}

export function sykepengesoknadSendt(sykepengesoknadsId) {
    return {
        type: 'SYKEPENGESOKNAD_SENDT',
        sykepengesoknadsId,
    };
}

export function senderSykepengesoknad() {
    return {
        type: 'SENDER_SYKEPENGESOKNAD',
    };
}
