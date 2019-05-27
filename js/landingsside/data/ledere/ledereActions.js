export const HENT_LEDERE_FORESPURT = 'HENT_LEDERE_FORESPURT';
export const HENTER_LEDERE = 'HENTER_LEDERE';
export const LEDERE_HENTET = 'LEDERE_HENTET';
export const HENT_LEDERE_FEILET = 'HENT_LEDERE_FEILET';
export const AVKREFT_LEDER_FORESPURT = 'AVKREFT_LEDER_FORESPURT';
export const LEDER_AVKREFTET = 'LEDER_AVKREFTET';
export const LEDER_AVKREFTET_FEILET = 'LEDER_AVKREFTET_FEILET';
export const AVKREFTER_LEDER = 'AVKREFTER_LEDER';

export const hentLedere = () => {
    return {
        type: HENT_LEDERE_FORESPURT,
    };
};

export const henterLedere = () => {
    return {
        type: HENTER_LEDERE,
    };
};

export const ledereHentet = (data) => {
    return {
        type: LEDERE_HENTET,
        data,
    };
};

export const hentLedereFeilet = () => {
    return {
        type: HENT_LEDERE_FEILET,
    };
};

export const avkreftLeder = (orgnummer) => {
    return {
        type: AVKREFT_LEDER_FORESPURT,
        orgnummer,
    };
};

export const lederAvkreftet = (orgnummer) => {
    return {
        type: LEDER_AVKREFTET,
        orgnummer,
    };
};

export const avkreftLederFeilet = () => {
    return {
        type: LEDER_AVKREFTET_FEILET,
    };
};

export const avkrefterLeder = () => {
    return {
        type: AVKREFTER_LEDER,
    };
};
