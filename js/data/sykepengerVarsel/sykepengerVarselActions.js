import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
    SYKEPENGERVARSEL_HENTET,
    HENTER_SYKEPENGEVARSEL,
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

export const henterSykepengerVarsel = () => {
    return {
        type: HENTER_SYKEPENGEVARSEL,
    };
};
