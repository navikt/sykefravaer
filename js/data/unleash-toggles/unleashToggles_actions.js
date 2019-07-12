export const HENT_UNLEASH_TOGGLES_FORESPURT = 'HENT_UNLEASH_TOGGLES_FORESPURT';
export const HENTER_UNLEASH_TOGGLES = 'HENTER_UNLEASH_TOGGLES';
export const HENT_UNLEASH_TOGGLES_FEILET = 'HENT_UNLEASH_TOGGLES_FEILET';
export const HENTET_UNLEASH_TOGGLES = 'HENTET_UNLEASH_TOGGLES';

export const hentUnleashToggles = () => ({
    type: HENT_UNLEASH_TOGGLES_FORESPURT,
});

export const henterUnleashToggles = () => ({
    type: HENTER_UNLEASH_TOGGLES,
});

export const unleashTogglesHentet = data => ({
    type: HENTET_UNLEASH_TOGGLES,
    data,
});

export const hentUnleashTogglesFeilet = () => ({
    type: HENT_UNLEASH_TOGGLES_FEILET,
});
