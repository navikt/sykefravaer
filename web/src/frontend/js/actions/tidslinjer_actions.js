import * as actiontyper from './actiontyper';

export function hentTidslinjerFeilet() {
    return {
        type: actiontyper.HENT_TIDSLINJER_FEILET,
    };
}

export function henterTidslinjer() {
    return {
        type: actiontyper.HENTER_TIDSLINJER,
    };
}

export function setTidslinjer(tidslinjer = [], arbeidssituasjon) {
    return {
        type: actiontyper.SET_TIDSLINJER,
        tidslinjer,
        arbeidssituasjon,
    };
}

export function hentTidslinjer(apneHendelseIder = [], arbeidssituasjon = 'MED_ARBEIDSGIVER') {
    return {
        type: actiontyper.HENT_TIDSLINJER_FORESPURT,
        apneHendelseIder,
        arbeidssituasjon,
    };
}
