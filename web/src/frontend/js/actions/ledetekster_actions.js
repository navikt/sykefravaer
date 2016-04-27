export function henterLedetekster() {
    return {
        type: 'HENTER_LEDETEKSTER',
    };
}

export function hentLedetekster() {
    return function (dispatch) {
        dispatch(henterLedetekster()); 
        return fetch(window.SYFO_SETTINGS.REST_ROOT + '/informasjon/tekster')
            .then(response => response.json())
            .then(json => dispatch(setLedetekster(json)))
            .catch(err => dispatch(hentLedeteksterFeilet()))
    }
}

export function hentLedeteksterFeilet() {
    return {
        type: 'HENT_LEDETEKSTER_FEILET',
    };
}

export function setLedetekster(ledetekster = []) {
    return {
        type: 'SET_LEDETEKSTER',
        ledetekster,
    };
}
