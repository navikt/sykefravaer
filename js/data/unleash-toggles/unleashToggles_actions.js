export const HENT_UNLEASH_TOGGLES_FORESPURT = 'HENT_UNLEASH_TOGGLES_FORESPURT';
export const HENTER_UNLEASH_TOGGLES = 'HENTER_UNLEASH_TOGGLES';
export const HENT_UNLEASH_TOGGLES_FEILET = 'HENT_UNLEASH_TOGGLES_FEILET';
export const HENTET_UNLEASH_TOGGLES = 'HENTET_UNLEASH_TOGGLES';

export const hentUnleashToggles = () => {
    return {
        type: HENT_UNLEASH_TOGGLES_FORESPURT,
    };
};

export const henterUnleashToggles = () => {
    return {
        type: HENTER_UNLEASH_TOGGLES,
    };
};

export const unleashTogglesHentet = (data) => {
    return {
        type: HENTET_UNLEASH_TOGGLES,
        data,
    };
};

export const hentUnleashTogglesFeilet = () => {
    return {
        type: HENT_UNLEASH_TOGGLES_FEILET,
    };
};
