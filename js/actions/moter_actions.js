export const HENT_MOTE_FEILET = 'HENT_MOTER_FEILET';
export const MOTE_HENTET = 'MOTE_HENTET';
export const HENTER_MOTE = 'HENTER_MOTE';
export const HENT_MOTE_FORESPURT = 'HENT_MOTE_FORESPURT';
export const MOTE_IKKE_FUNNET = 'MOTE_IKKE_FUNNET';

export const SEND_SVAR_FORESPURT = 'SEND_SVAR_FORESPURT';
export const SVAR_SENDT = 'SVAR_SENDT';
export const SENDER_SVAR = 'SENDER_SVAR';
export const SEND_SVAR_FEILET = 'SEND_SVAR_FEILET';

export const hentMote = () => {
    return {
        type: HENT_MOTE_FORESPURT,
    };
};

export const moteHentet = (data) => {
    return {
        type: MOTE_HENTET,
        data,
    };
};

export const henterMote = () => {
    return {
        type: HENTER_MOTE,
    };
};

export const hentMoteFeilet = () => {
    return {
        type: HENT_MOTE_FEILET,
    };
};

export const moteIkkeFunnet = () => {
    return {
        type: MOTE_IKKE_FUNNET,
    };
};

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
