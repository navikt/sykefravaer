export function setArbeidssituasjon(arbeidssituasjon, sykmeldingId) {
    return {
        type: 'SET_ARBEIDSSITUASJON',
        arbeidssituasjon,
        sykmeldingId
    };
}

export function setArbeidsgiver(sykmeldingId, arbeidsgiver) {
    return {
        type: 'SET_ARBEIDSGIVER',
        sykmeldingId,
        arbeidsgiver
    };
}


export function hentArbeidsforhold() {
    return {
        type: 'HENTER_ARBEIDSFORHOLD'
    };
}

export function setArbeidsforhold(arbeidsforhold) {
    return {
        type: 'SET_ARBEIDSFORHOLD',
        arbeidsforhold
    };
}

export function hentArbeidsforhold(sykmeldingId) {
    return function arbeidsforhold(dispatch) {
        const url = `${window.SYFO_SETTINGS.REST_ROOT}/arbeidsforhold/${sykmeldingId}`;
        return fetch(url, { credentials: 'same-origin' })
            .then((response) => { return response.json() })
            .then((json) => { return dispatch(setArbeidsforhold(json)) });
    };
}



