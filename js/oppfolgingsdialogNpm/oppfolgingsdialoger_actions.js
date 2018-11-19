export const HENT_OPPFOLGINGSDIALOGER_FORESPURT = 'HENT_OPPFOLGINGSDIALOGER_FORESPURT';
export const OPPFOLGINGSDIALOGER_HENTET = 'OPPFOLGINGSDIALOGER_HENTET';
export const HENTER_OPPFOLGINGSDIALOGER = 'HENTER_OPPFOLGINGSDIALOGER';
export const HENT_OPPFOLGINGSDIALOGER_FEILET = 'HENT_OPPFOLGINGSDIALOGER_FEILET';

export const henterOppfolgingsdialoger = () => {
    return {
        type: HENTER_OPPFOLGINGSDIALOGER,
    };
};

export const oppfolgingsdialogerHentet = (data = []) => {
    return {
        type: OPPFOLGINGSDIALOGER_HENTET,
        data,
    };
};

export const hentOppfolgingsdialogerFeilet = () => {
    return {
        type: HENT_OPPFOLGINGSDIALOGER_FEILET,
    };
};

export const hentOppfolgingsdialoger = () => {
    return {
        type: HENT_OPPFOLGINGSDIALOGER_FORESPURT,
    };
};
