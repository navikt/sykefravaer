export const HENTER_VEDTAKER = 'HENTER_VEDTAKER';
export const HENT_VEDTAKER_FEILET = 'HENT_VEDTAKER_FEILET';
export const VEDTAKER_HENTET = 'VEDTAKER_HENTET';
export const HENT_VEDTAKER_FORESPURT = 'HENT_VEDTAKER_FORESPURT';

export function henterVedtaker() {
    return {
        type: HENTER_VEDTAKER,
    };
}

export function hentVedtakerFeilet() {
    return {
        type: HENT_VEDTAKER_FEILET,
    };
}

export function vedtakerHentet(vedtaker = []) {
    return {
        type: VEDTAKER_HENTET,
        vedtaker,
    };
}

export function hentVedtaker() {
    return {
        type: HENT_VEDTAKER_FORESPURT,
    };
}
