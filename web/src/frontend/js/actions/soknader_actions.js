import {
    SOKNADER_HENTET,
    HENTER_SOKNADER,
    HENT_SOKNADER_FEILET,
    HENT_SOKNADER_FORESPURT,
    SEND_SOKNAD_FORESPURT,
    SENDER_SOKNAD,
    SEND_SOKNAD_FEILET,
    SOKNAD_SENDT,
    OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT,
    OPPRETT_SYKEPENGESOKNADUTLAND_FEILET,
    OPPRETTER_SYKEPENGESOKNADUTLAND,
    SYKEPENGESOKNADUTLAND_OPPRETTET,
    SYKEPENGESOKNAD_AVBRUTT,
    AVBRYTER_SYKEPENGESOKNAD,
    AVBRYT_SYKEPENGESOKNAD_FORESPURT, AVBRYT_SYKEPENGESOKNAD_FEILET,
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

export const opprettSoknadUtland = () => {
    return {
        type: OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT,
    };
};

export const opprettSoknadUtlandFeilet = () => {
    return {
        type: OPPRETT_SYKEPENGESOKNADUTLAND_FEILET,
    };
};

export const oppretterSoknadUtland = () => {
    return {
        type: OPPRETTER_SYKEPENGESOKNADUTLAND,
    };
};

export const soknadUtlandOpprettet = (soknad) => {
    return {
        type: SYKEPENGESOKNADUTLAND_OPPRETTET,
        soknad,
    };
};

export function avbrytSoknad(soknad) {
    return {
        type: AVBRYT_SYKEPENGESOKNAD_FORESPURT,
        soknad,
    };
}

export function avbryterSoknad() {
    return {
        type: AVBRYTER_SYKEPENGESOKNAD,
    };
}

export function soknadAvbrutt(soknad) {
    return {
        type: SYKEPENGESOKNAD_AVBRUTT,
        soknad,
    };
}

export function avbrytSoknadFeilet() {
    return {
        type: AVBRYT_SYKEPENGESOKNAD_FEILET,
    };
}
