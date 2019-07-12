export const HENT_VEDLIKEHOLD_FEILET = 'HENT_VEDLIKEHOLD_FEILET';
export const HENTER_VEDLIKEHOLD = 'HENTER_VEDLIKEHOLD';
export const VEDLIKEHOLD_HENTET = 'VEDLIKEHOLD_HENTET';
export const HENT_VEDLIKEHOLD_FORESPURT = 'HENT_VEDLIKEHOLD_FORESPURT';

export const hentVedlikehold = () => ({
    type: HENT_VEDLIKEHOLD_FORESPURT,
});

export const henterVedlikehold = () => ({
    type: HENTER_VEDLIKEHOLD,
});

export const vedlikeholdHentet = vedlikehold => ({
    type: VEDLIKEHOLD_HENTET,
    data: {
        vedlikehold,
    },
});

export const hentVedlikeholdFeilet = () => ({
    type: HENT_VEDLIKEHOLD_FEILET,
});
