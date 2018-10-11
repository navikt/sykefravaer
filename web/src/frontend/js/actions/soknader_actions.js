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
    SOKNAD_AVBRUTT,
    AVBRYTER_SOKNAD,
    AVBRYT_SOKNAD_FORESPURT,
    AVBRYT_SOKNAD_FEILET,
    SOKNAD_ENDRET,
    SOKNAD_OPPDATERT,
    OPPDATER_SOKNAD_FEILET,
    GJENAPNE_SOKNAD_FORESPURT,
    GJENAPNER_SOKNAD,
    SOKNAD_GJENAPNET,
    GJENAPNE_SOKNAD_FEILET,
    OPPRETT_UTKAST_TIL_KORRIGERING_FEILET,
    UTKAST_TIL_KORRIGERING_OPPRETTET,
    OPPRETTER_UTKAST_TIL_KORRIGERING,
    OPPRETT_UTKAST_TIL_KORRIGERING_FORESPURT,
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
        type: AVBRYT_SOKNAD_FORESPURT,
        soknad,
    };
}

export function avbryterSoknad() {
    return {
        type: AVBRYTER_SOKNAD,
    };
}

export function soknadAvbrutt(soknad) {
    return {
        type: SOKNAD_AVBRUTT,
        soknad,
    };
}

export function avbrytSoknadFeilet() {
    return {
        type: AVBRYT_SOKNAD_FEILET,
    };
}

export const soknadEndret = (soknad, feltnavn, nyVerdi) => {
    return {
        type: SOKNAD_ENDRET,
        soknad,
        feltnavn,
        nyVerdi,
    };
};

export const soknadOppdatert = (soknad) => {
    return {
        type: SOKNAD_OPPDATERT,
        soknad,
    };
};

export const oppdaterSoknadFeilet = (soknad) => {
    return {
        type: OPPDATER_SOKNAD_FEILET,
        soknad,
    };
};

export function opprettUtkastTilKorrigeringForespurt(sykepengesoknadsId) {
    return {
        sykepengesoknadsId,
        type: OPPRETT_UTKAST_TIL_KORRIGERING_FORESPURT,
    };
}

export function oppretterKorrigering() {
    return {
        type: OPPRETTER_UTKAST_TIL_KORRIGERING,
    };
}

export function korrigeringOpprettet(utkastTilKorrigering) {
    return {
        utkast: utkastTilKorrigering,
        type: UTKAST_TIL_KORRIGERING_OPPRETTET,
    };
}

export function opprettUtkastTilKorrigeringFeilet() {
    return {
        type: OPPRETT_UTKAST_TIL_KORRIGERING_FEILET,
    };
}

export const gjenapneSoknad = (soknad) => {
    return {
        type: GJENAPNE_SOKNAD_FORESPURT,
        soknad,
    };
};

export const gjenapnerSoknad = (soknad) => {
    return {
        type: GJENAPNER_SOKNAD,
        soknad,
    };
};

export const soknadGjenapnet = (soknad) => {
    return {
        type: SOKNAD_GJENAPNET,
        soknad,
    };
};

export const gjenapneSoknadFeilet = () => {
    return {
        type: GJENAPNE_SOKNAD_FEILET,
    };
};
