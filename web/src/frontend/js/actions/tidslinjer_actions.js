export function hentTidslinjerFeilet() {
    return {
        type: 'HENT_TIDSLINJER_FEILET',
    };
}

export function henterTidslinjer() {
    return {
        type: 'HENTER_TIDSLINJER',
    };
}

export function setTidslinjer(data = {}) {
    return {
        type: 'SET_TIDSLINJER',
        data,
    };
}

export function hentTidslinjer() {
    return function tidslinjer(dispatch) {
        dispatch(henterTidslinjer());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/tidslinje`, {
            credentials: 'include',
        })
        .then((response) => {
            if (response.status > 400) {
                dispatch(hentTidslinjerFeilet());
            }
            return response.json();
        })
        .then((json) => {
            return dispatch(setTidslinjer(json));
        })
        .catch(() => {
            return dispatch(hentTidslinjerFeilet());
        });
    };
}
