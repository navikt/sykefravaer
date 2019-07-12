export const HENT_LEDERE_FORESPURT = 'HENT_LEDERE_FORESPURT';
export const HENTER_LEDERE = 'HENTER_LEDERE';
export const LEDERE_HENTET = 'LEDERE_HENTET';
export const HENT_LEDERE_FEILET = 'HENT_LEDERE_FEILET';
export const AVKREFT_LEDER_FORESPURT = 'AVKREFT_LEDER_FORESPURT';
export const LEDER_AVKREFTET = 'LEDER_AVKREFTET';
export const LEDER_AVKREFTET_FEILET = 'LEDER_AVKREFTET_FEILET';
export const AVKREFTER_LEDER = 'AVKREFTER_LEDER';

export const hentLedere = () => ({
    type: HENT_LEDERE_FORESPURT,
});

export const henterLedere = () => ({
    type: HENTER_LEDERE,
});

export const ledereHentet = data => ({
    type: LEDERE_HENTET,
    data,
});

export const hentLedereFeilet = () => ({
    type: HENT_LEDERE_FEILET,
});

export const avkreftLeder = orgnummer => ({
    type: AVKREFT_LEDER_FORESPURT,
    orgnummer,
});

export const lederAvkreftet = orgnummer => ({
    type: LEDER_AVKREFTET,
    orgnummer,
});

export const avkreftLederFeilet = () => ({
    type: LEDER_AVKREFTET_FEILET,
});

export const avkrefterLeder = () => ({
    type: AVKREFTER_LEDER,
});
