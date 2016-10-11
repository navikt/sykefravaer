export function hentTidslinjerFeilet() {
    return {
        type: 'HENT_TIDSLINJER_FEILET',
    };
}

export function henterTidslinjer() {
    return {
        type: 'HENTER_TIDSLINJER',
    };
}

export function setTidslinjer(tidslinjer = [], arbeidssituasjon) {
    return {
        type: 'SET_TIDSLINJER',
        tidslinjer,
        arbeidssituasjon,
    };
}

export function hentTidslinjer(apneHendelseIder = [], arbeidssituasjon = 'MED_ARBEIDSGIVER') {
    return {
        type: 'HENT_TIDSLINJER_FORESPURT',
        apneHendelseIder,
        arbeidssituasjon,
    };
}
