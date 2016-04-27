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
    return function (dispatch) {
        dispatch(henterLedetekster());
        return fetch(window.SYFO_SETTINGS.REST_ROOT + '/informasjon/tekster')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                return dispatch(setLedetekster(json));
            })
            .catch((err) => {
                return dispatch(hentLedeteksterFeilet(err));
            });
    };
}
