import { getCookie } from '../utils/index';

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

export function senderSykmelding(sykmeldingId) {
    return {
        type: 'SENDER_SYKMELDING',
        sykmeldingId,
    };
}

export function sendSykmeldingFeilet(sykmeldingId) {
    return {
        type: 'SEND_SYKMELDING_FEILET',
        sykmeldingId,
    };
}

export function sykmeldingSendt(sykmeldingId) {
    return {
        type: 'SYKMELDING_SENDT',
        sykmeldingId,
    };
}

export function sendSykmeldingTilArbeidsgiver(sykmeldingId) {
    return function send(dispatch) {
        dispatch(senderSykmelding(sykmeldingId));
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger/${sykmeldingId}/actions/send`,
            {
                credentials: 'include',
                method: 'POST',
                body: {
                    orgnummer: '***REMOVED***',
                },
                // ***REMOVED*** = orgnummer, og må endres til sykmelding.valgtArbeidsgiver.orgnummer,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-SYFOREST'),
                }),
            })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(sendSykmeldingFeilet(sykmeldingId));
                } else {
                    dispatch(sykmeldingSendt(sykmeldingId));
                }
            })
            .catch(() => {
                return dispatch(sendSykmeldingFeilet(sykmeldingId));
            });
    };
}
