import * as actiontyper from './actiontyper';

export const hentStartdato = () => {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_STARTDATO_FORESPURT,
    };
};

export const henterStartdato = () => {
    return {
        type: actiontyper.HENTER_SYKEFORLOEP_STARTDATO,
    };
};

export const startdatoHentet = (startdato) => {
    return {
        type: actiontyper.SYKEFORLOEP_STARTDATO_HENTET,
        startdato,
    };
};

export const hentStartdatoFeilet = () => {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_STARTDATO_FEILET,
    };
};
