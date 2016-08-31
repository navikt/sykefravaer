export function henterLedetekster() {
    return {
        type: 'HENTER_LEDETEKSTER',
    };
}

export function setLedetekster(ledetekster = {}) {
    return {
        type: 'SET_LEDETEKSTER',
        ledetekster,
    };
}

export function hentLedeteksterFeilet() {
    return {
        type: 'HENT_LEDETEKSTER_FEILET',
    };
}

export function hentLedetekster() {
    return function ledetekster(dispatch) {
        dispatch(henterLedetekster());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/informasjon/tekster`, {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(hentLedeteksterFeilet());
                }
                return response.json();
            })
            .then((json) => {
                return dispatch(setLedetekster(json));
            })
            .catch((err) => {
                console.log(err);
                return dispatch(hentLedeteksterFeilet());
            });
    };
}
