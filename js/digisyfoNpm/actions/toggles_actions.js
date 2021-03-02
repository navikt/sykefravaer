import * as actiontyper from './actiontyper';

export const hentToggles = () => {
    return {
        type: actiontyper.HENT_TOGGLES_FORESPURT,
    };
};

export const henterToggles = () => {
    return {
        type: actiontyper.HENTER_TOGGLES,
    };
};

export const togglesHentet = (data) => {
    return {
        type: actiontyper.HENTET_TOGGLES,
        data,
    };
};

export const hentTogglesFeilet = () => {
    return {
        type: actiontyper.HENT_TOGGLES_FEILET,
    };
};
