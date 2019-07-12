import {
    HENT_SOKNADER_FEILET,
    HENT_SOKNADER_FORESPURT,
    HENTER_SOKNADER,
    SOKNADER_HENTET,
    OPPDATER_SOKNADER_FORESPURT,
} from './soknaderActiontyper';

export const soknaderHentet = soknader => ({
    type: SOKNADER_HENTET,
    soknader,
});

export const henterSoknader = () => ({
    type: HENTER_SOKNADER,
});

export const hentSoknaderFeilet = () => ({
    type: HENT_SOKNADER_FEILET,
});

export const hentSoknader = () => ({
    type: HENT_SOKNADER_FORESPURT,
});

export const oppdaterSoknader = () => ({
    type: OPPDATER_SOKNADER_FORESPURT,
});
