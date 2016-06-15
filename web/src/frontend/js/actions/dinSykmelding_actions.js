export function setArbeidssituasjon(arbeidssituasjon, sykmeldingId) {
    return {
        type: 'SET_ARBEIDSSITUASJON',
        arbeidssituasjon,
        sykmeldingId,
    };
}

export function setArbeidsgiver(sykmeldingId, arbeidsgiver) {
    return {
        type: 'SET_ARBEIDSGIVER',
        sykmeldingId,
        arbeidsgiver,
    };
}

export function senderSykmelding() {
    return {
        type: 'SENDER_SYKMELDING'
    }
}

export function sendSykmeldingTilArbeidsgiver(sykmelding) {
    return function (dispatch) {
        dispatch(senderSykmelding());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger/${sykmelding.id}/actions/send`,
            {
                method: 'POST'
                body: new Raw
            })

    }

}
