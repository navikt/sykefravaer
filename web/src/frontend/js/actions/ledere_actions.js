
export const hentLedere = () => {
    return {
        type: 'HENT_LEDERE_FORESPURT',
    };
};

export const ledereHentet = (data) => {
    return {
        type: 'LEDERE_HENTET',
        data,
    };
};

export const hentLedereFeilet = () => {
    return {
        type: 'HENT_LEDERE_FEILET',
    };
};


export const avkreftLeder = (orgnummer) => {
    return {
        type: 'AVKREFT_LEDER',
        orgnummer,
    };
};

export const lederAvkreftet = (orgnummer) => {
    return {
        type: 'LEDER_AVKREFTET',
        orgnummer,
    };
};

export const avkreftLederFeilet = () => {
    return {
        type: 'LEDER_AVKREFTET_FEILET',
    };
};

export const avkrefterLeder = () => {
    return {
        type: 'AVKREFTER_LEDER',
    };
};
