import fetch from 'isomorphic-fetch';

export function henterArbeidsgiversSykmeldinger() {
    return {
        type: 'HENTER_ARBEIDSGIVERS_SYKMELDINGER',
    };
}

export function hentArbeidsgiversSykmeldingerFeilet() {
    return {
        type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET',
    };
}

export function setArbeidsgiversSykmeldinger(sykmeldinger = []) {
    return {
        type: 'SET_ARBEIDSGIVERS_SYKMELDINGER',
        sykmeldinger,
    };
}

export function hentArbeidsgiversSykmeldinger() {
    return function sykmeldinger(dispatch) {
        dispatch(henterArbeidsgiversSykmeldinger());
        const url = `${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger?type=arbeidsgiver`;
        return fetch(url, {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(hentArbeidsgiversSykmeldingerFeilet());
                }
                return response.json();
            })
            .then((json) => {
                return dispatch(setArbeidsgiversSykmeldinger(json));
            })
            .catch(() => {
                return dispatch(hentArbeidsgiversSykmeldingerFeilet());
            });
    };
}
