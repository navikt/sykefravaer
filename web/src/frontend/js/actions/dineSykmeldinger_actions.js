import fetch from 'isomorphic-fetch';

export function henterDineSykmeldinger() {
    return {
        type: 'HENTER_DINE_SYKMELDINGER',
    };
}

export function hentDineSykmeldingerFeilet() {
    return {
        type: 'HENT_DINE_SYKMELDINGER_FEILET',
    };
}

export function setDineSykmeldinger(sykmeldinger = []) {
    return {
        type: 'SET_DINE_SYKMELDINGER',
        sykmeldinger,
    };
}

export function sorterSykmeldinger(kriterium, status) {
    return {
        type: 'SET_SORTERING',
        kriterium,
        status,
    };
}

export function hentDineSykmeldinger() {
    return function sykmeldinger(dispatch) {
        dispatch(henterDineSykmeldinger());
        const url = `${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger`;
        return fetch(url, {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(hentDineSykmeldingerFeilet());
                }
                return response.json();
            })
            .then((json) => {
                return dispatch(setDineSykmeldinger(json));
            })
            .catch(() => {
                return dispatch(hentDineSykmeldingerFeilet());
            });
    };
}

