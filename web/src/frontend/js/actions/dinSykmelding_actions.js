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

export function sendSykmeldingFeilet(sykmelding) {
    return {
        type: 'SEND_SYKMELDING_FEILET',
        sykmelding: sykmelding,
    }
}

export function sykmeldingSendt(sykmelding) {
    return {
        type: 'SYKMELDING_SENDT',
        sykmelding: sykmelding,
    }
}

export function sendSykmeldingTilArbeidsgiver(sykmelding) {
    return function (dispatch) {
        dispatch(senderSykmelding());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger/${sykmelding.id}/actions/send`,
            {
                method: 'POST',
                body: '***REMOVED***',
                headers: new Headers({ 'Content-Type': 'application/json' })
            }
        ).then((response) => {

            if (response.status > 400) {
                dispatch(sendSykmeldingFeilet(sykmelding));
            } else {
                dispatch(sykmeldingSendt(sykmelding));
            }
        })
            .catch(() => {
                return dispatch(sendSykmeldingFeilet());
            });
    }
}
