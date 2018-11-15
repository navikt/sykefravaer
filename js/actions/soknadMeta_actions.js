import {
    HENT_SOKNAD_MOTTAKER_FEILET,
    HENT_SOKNAD_MOTTAKER_FORESPURT,
    HENTER_SOKNAD_MOTTAKER,
    SOKNAD_MOTTAKER_HENTET,
} from './actiontyper';

export const hentSoknadMottaker = (soknad) => {
    return {
        type: HENT_SOKNAD_MOTTAKER_FORESPURT,
        soknad,
    };
};

export const soknadMottakerHentet = (soknadId, data) => {
    return {
        type: SOKNAD_MOTTAKER_HENTET,
        soknadId,
        data,
    };
};

export const henterSoknadMottaker = (soknadId) => {
    return {
        type: HENTER_SOKNAD_MOTTAKER,
        soknadId,
    };
};

export const hentSoknadMottakerFeilet = (soknadId) => {
    return {
        type: HENT_SOKNAD_MOTTAKER_FEILET,
        soknadId,
    };
};
