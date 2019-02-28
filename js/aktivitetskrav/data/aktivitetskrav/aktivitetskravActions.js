import * as actiontyper from '../../../actions/actiontyper';

export function bekreftAktivitetskrav() {
    return {
        type: actiontyper.BEKREFT_AKTIVITETSKRAV_FORESPURT,
    };
}

export function bekrefterAktivitetskrav() {
    return {
        type: actiontyper.BEKREFTER_AKTIVITETSKRAV,
    };
}

export function bekreftAktivitetskravFeilet() {
    return {
        type: actiontyper.BEKREFT_AKTIVITETSKRAV_FEILET,
    };
}

export function aktivitetskravBekreftet() {
    return {
        type: actiontyper.AKTIVITETSKRAV_BEKREFTET,
    };
}
