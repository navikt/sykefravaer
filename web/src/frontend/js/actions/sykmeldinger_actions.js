import fetch from 'isomorphic-fetch';

export function henterSykmeldinger() {
    return {
        type: 'HENTER_SYKMELDINGER',
    };
}

export function hentSykmeldingerFeilet() {
    return {
        type: 'HENT_SYKMELDINGER_FEILET',
    };
}

export function setSykmeldinger(sykmeldinger = []) {
    return {
        type: 'SET_SYKMELDINGER',
        sykmeldinger,
    };
}

export function sorterSykmeldinger(sortering) {
    return {
        type: 'SET_SORTERING',
        sortering,
    };
}

export function hentSykmeldinger() {
    return function (dispatch) {
        dispatch(henterSykmeldinger());
        return fetch(window.SYFO_SETTINGS.REST_ROOT + '/sykmeldinger')
            .then((response) => {
                response.json();
            })
            .then((json) => {
                dispatch(setSykmeldinger(json));
            })
            .catch(() => {
                dispatch(hentSykmeldingerFeilet());
            });
    };
}
