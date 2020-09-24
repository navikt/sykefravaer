export const HENTER_VEDTAK = 'HENTER_VEDTAK';
export const HENT_VEDTAK_FEILET = 'HENT_VEDTAK_FEILET';
export const VEDTAK_HENTET = 'VEDTAK_HENTET';
export const HENT_VEDTAK_FORESPURT = 'HENT_VEDTAK_FORESPURT';

export function henterVedtak() {
    return {
        type: HENTER_VEDTAK,
    };
}

export function hentVedtakFeilet() {
    return {
        type: HENT_VEDTAK_FEILET,
    };
}

export function alleVedtakHentet(vedtak = []) {
    return {
        type: VEDTAK_HENTET,
        vedtak,
    };
}

export function hentAlleVedtak() {
    return {
        type: HENT_VEDTAK_FORESPURT,
    };
}
