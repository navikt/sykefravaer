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

export function hentSykmeldinger(type) {
    return function sykmeldinger(dispatch) {
        dispatch(henterSykmeldinger());
        let url = `${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger`;
        if(type) {
            url = `${url}?type=${type}`;
        }
        return fetch(url, {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(hentSykmeldingerFeilet());
                }
                return response.json();
            })
            .then((json) => {
                return dispatch(setSykmeldinger(json));
            })
            .catch(() => {
                return dispatch(hentSykmeldingerFeilet());
            });
    };
}
