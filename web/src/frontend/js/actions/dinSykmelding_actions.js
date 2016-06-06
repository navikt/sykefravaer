export function setArbeidssituasjon(arbeidssituasjon, sykmeldingsId) {
    return {
        type: 'SET_ARBEIDSSITUASJON',
        arbeidssituasjon,
        sykmeldingsId,
    };
}
