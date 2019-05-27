import {
    HENT_SOKNADER_FEILET,
    HENT_SOKNADER_FORESPURT,
    HENTER_SOKNADER,
    SOKNADER_HENTET,
    OPPDATER_SOKNADER_FORESPURT,
} from './soknaderActiontyper';

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

export const oppdaterSoknader = () => {
    return {
        type: OPPDATER_SOKNADER_FORESPURT,
    };
};
