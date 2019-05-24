export const SEND_SVAR_FORESPURT = 'SEND_SVAR_FORESPURT';
export const SVAR_SENDT = 'SVAR_SENDT';
export const SENDER_SVAR = 'SENDER_SVAR';
export const SEND_SVAR_FEILET = 'SEND_SVAR_FEILET';

export function sendSvar(moteUuid, deltakertype, data) {
    return {
        type: SEND_SVAR_FORESPURT,
        moteUuid,
        deltakertype,
        data,
    };
}

export function svarSendt(data, deltakertype, moteUuid) {
    return {
        type: SVAR_SENDT,
        data,
        deltakertype,
        moteUuid,
    };
}

export function senderSvar() {
    return {
        type: SENDER_SVAR,
    };
}

export function sendSvarFeilet() {
    return {
        type: SEND_SVAR_FEILET,
    };
}
