export function setArbeidssituasjon(arbeidssituasjon, sykmeldingId) {
    return {
        type: 'SET_ARBEIDSSITUASJON',
        arbeidssituasjon,
        sykmeldingId,
    };
}
