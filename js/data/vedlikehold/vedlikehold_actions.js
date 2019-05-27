export const HENT_VEDLIKEHOLD_FEILET = 'HENT_VEDLIKEHOLD_FEILET';
export const HENTER_VEDLIKEHOLD = 'HENTER_VEDLIKEHOLD';
export const VEDLIKEHOLD_HENTET = 'VEDLIKEHOLD_HENTET';
export const HENT_VEDLIKEHOLD_FORESPURT = 'HENT_VEDLIKEHOLD_FORESPURT';

export const hentVedlikehold = () => {
    return {
        type: HENT_VEDLIKEHOLD_FORESPURT,
    };
};

export const henterVedlikehold = () => {
    return {
        type: HENTER_VEDLIKEHOLD,
    };
};

export const vedlikeholdHentet = (vedlikehold) => {
    return {
        type: VEDLIKEHOLD_HENTET,
        data: {
            vedlikehold,
        },
    };
};

export const hentVedlikeholdFeilet = () => {
    return {
        type: HENT_VEDLIKEHOLD_FEILET,
    };
};
