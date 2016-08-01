import { leggTilHendelser } from './hendelser_actions.js';

export function hentSykeforloepFeilet() {
    return {
        type: 'HENT_SYKEFORLOEP_FEILET',
    };
}

export function henterSykeforloep() {
    return {
        type: 'HENTER_SYKEFORLOEP',
    };
}

export function setSykeforloep(sykeforloep = {}) {
    return Object.assign({}, {
        type: 'SET_SYKEFORLOEP',
    }, {
        data: sykeforloep,
    });
}

export function hentSykeforloep() {
    return function sykeforloep(dispatch) {
        dispatch(henterSykeforloep());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/sykeforloep`, {
            credentials: 'include',
        })
        .then((response) => {
            if (response.status > 400) {
                dispatch(hentSykeforloepFeilet());
            }
            return response.json();
        })
        .then((json) => {
            if (json.length > 0) {
                json.reverse();
                dispatch(leggTilHendelser(json[0]));
            }
            return dispatch(setSykeforloep(json));
        })
        .catch(() => {
            return dispatch(hentSykeforloepFeilet());
        });
    };
}
