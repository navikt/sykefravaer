import {
    SOKNADER_HENTET,
    HENTER_SOKNADER,
    HENT_SOKNADER_FEILET,
    HENT_SOKNADER_FORESPURT, SEND_SOKNAD_FORESPURT, SENDER_SOKNAD, SEND_SOKNAD_FEILET, SOKNAD_SENDT
} from './actiontyper';

export const soknaderHentet = (soknader) => {
    return {
        type: SOKNADER_HENTET,
        soknader,
    };
};

export const henterSoknader = () => {
    return {
        type: HENTER_SOKNADER,
    };
};

export const hentSoknaderFeilet = () => {
    return {
        type: HENT_SOKNADER_FEILET,
    };
};

export const hentSoknader = () => {
    return {
        type: HENT_SOKNADER_FORESPURT,
    };
};

export const sendSoknad = (soknad) => {
    return {
        type: SEND_SOKNAD_FORESPURT,
        soknad,
    };
};

export const senderSoknad = () => {
    return {
        type: SENDER_SOKNAD,
    };
};

export const sendSoknadFeilet = () => {
    return {
        type: SEND_SOKNAD_FEILET,
    };
};

export const soknadSendt = (soknad) => {
    return {
        type: SOKNAD_SENDT,
        soknad,
    };
};
