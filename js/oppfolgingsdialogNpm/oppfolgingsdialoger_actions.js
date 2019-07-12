export const HENT_OPPFOLGINGSDIALOGER_FORESPURT = 'HENT_OPPFOLGINGSDIALOGER_FORESPURT';
export const OPPFOLGINGSDIALOGER_HENTET = 'OPPFOLGINGSDIALOGER_HENTET';
export const HENTER_OPPFOLGINGSDIALOGER = 'HENTER_OPPFOLGINGSDIALOGER';
export const HENT_OPPFOLGINGSDIALOGER_FEILET = 'HENT_OPPFOLGINGSDIALOGER_FEILET';

export const henterOppfolgingsdialoger = () => ({
    type: HENTER_OPPFOLGINGSDIALOGER,
});

export const oppfolgingsdialogerHentet = (data = []) => ({
    type: OPPFOLGINGSDIALOGER_HENTET,
    data,
});

export const hentOppfolgingsdialogerFeilet = () => ({
    type: HENT_OPPFOLGINGSDIALOGER_FEILET,
});

export const hentOppfolgingsdialoger = () => ({
    type: HENT_OPPFOLGINGSDIALOGER_FORESPURT,
});
