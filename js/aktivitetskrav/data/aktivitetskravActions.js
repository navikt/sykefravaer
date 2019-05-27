export const BEKREFT_AKTIVITETSKRAV_FORESPURT = 'BEKREFT_AKTIVITETSKRAV_FORESPURT';
export const BEKREFTER_AKTIVITETSKRAV = 'BEKREFTER_AKTIVITETSKRAV';
export const AKTIVITETSKRAV_BEKREFTET = 'AKTIVITETSKRAV_BEKREFTET';
export const BEKREFT_AKTIVITETSKRAV_FEILET = 'BEKREFT_AKTIVITETSKRAV_FEILET';

export function bekreftAktivitetskrav() {
    return {
        type: BEKREFT_AKTIVITETSKRAV_FORESPURT,
    };
}

export function bekrefterAktivitetskrav() {
    return {
        type: BEKREFTER_AKTIVITETSKRAV,
    };
}

export function bekreftAktivitetskravFeilet() {
    return {
        type: BEKREFT_AKTIVITETSKRAV_FEILET,
    };
}

export function aktivitetskravBekreftet() {
    return {
        type: AKTIVITETSKRAV_BEKREFTET,
    };
}
