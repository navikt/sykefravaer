export const SEND_SKJEMA_FEILET = 'SEND_SKJEMA_FEILET';
export const SEND_SKJEMA_FEILET_HANDTERT = 'SEND_SKJEMA_FEILET_HÅNDTERT';
export const SKJEMA_ER_GYLDIG = 'SKJEMA_ER_GYLDIG';

export function sendSkjemaFeilet(skjemanavn) {
    return {
        type: SEND_SKJEMA_FEILET,
        skjemanavn,
    };
}

export function sendSkjemaFeiletHandtert(skjemanavn) {
    return {
        type: SEND_SKJEMA_FEILET_HANDTERT,
        skjemanavn,
    };
}

export function skjemaErGyldig(skjemanavn) {
    return {
        type: SKJEMA_ER_GYLDIG,
        skjemanavn,
    };
}
