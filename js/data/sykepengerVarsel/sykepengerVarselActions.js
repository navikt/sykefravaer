import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
    SYKEPENGERVARSEL_HENTET,
    SYKEPENGERVARSEL_HENTING_FEILET,
} from './sykepengerVarselActionTyper';

export const hentSykepengerVarsel = () => {
    return {
        type: HENT_SYKEPENGERVARSEL_FORESPURT,
    };
};

export const sykepengerVarselHentet = (data) => {
    return {
        type: SYKEPENGERVARSEL_HENTET,
        data,
    };
};

export const hentSykepengerVarselFeilet = () => {
    return {
        type: SYKEPENGERVARSEL_HENTING_FEILET,
    };
};
