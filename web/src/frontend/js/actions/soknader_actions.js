import { SOKNADER_HENTET,
    HENTER_SOKNADER,
    HENT_SOKNADER_FEILET,
    HENT_SOKNADER_FORESPURT } from './actiontyper';

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
