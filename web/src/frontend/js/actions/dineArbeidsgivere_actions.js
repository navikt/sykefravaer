import fetch from 'isomorphic-fetch';

export function hentAktuelleArbeidsgivereFeilet(sykmeldingId) {
    return {
        type: 'HENT_AKTUELLE_ARBEIDSGIVERE_FEILET',
        sykmeldingId,
    };
}

export function henterAktuelleArbeidsgivere(sykmeldingId) {
    return {
        type: 'HENTER_AKTUELLE_ARBEIDSGIVERE',
        sykmeldingId,
    };
}

export function setAktuelleArbeidsgivere(sykmeldingId, arbeidsgivere) {
    return {
        type: 'SET_AKTUELLE_ARBEIDSGIVERE',
        sykmeldingId,
        arbeidsgivere,
    };
}

export function hentAktuelleArbeidsgivere(sykmeldingId) {
    return function arbeidsgivere(dispatch) {
        dispatch(henterAktuelleArbeidsgivere(sykmeldingId));
        const url = `${window.SYFO_SETTINGS.REST_ROOT}/informasjon/arbeidsgivere?sykmeldingId=${sykmeldingId}`;
        return fetch(url, {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(hentAktuelleArbeidsgivereFeilet(sykmeldingId));
                }
                return response.json();
            })
            .then((json) => {
                return dispatch(setAktuelleArbeidsgivere(sykmeldingId, json));
            })
            .catch(() => {
                return dispatch(hentAktuelleArbeidsgivereFeilet(sykmeldingId));
            });
    };
}
