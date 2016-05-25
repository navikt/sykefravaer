import { harLocalStorageStotte } from '../utils';

export function skjulUnderUtviklingVarsel() {
    if (harLocalStorageStotte()) {
        window.localStorage.setItem('skjulUnderUtviklingVarsel', true);
    }
    return {
        type: 'SKJUL_UNDER_UTVIKLING_VARSEL',
    };
}

export function hentBrukerinfoFeilet() {
    return {
        type: 'HENT_BRUKERINFO_FEILET',
    };
}

export function henterBrukerinfo() {
    return {
        type: 'HENTER_BRUKERINFO',
    };
}

export function setBrukerinfo(brukerinfo = {}) {
    return Object.assign({}, {
        type: 'SET_BRUKERINFO',
    }, {
        data: brukerinfo,
    });
}

export function hentBrukerinfo() {
    return function brukerinfo(dispatch) {
        dispatch(henterBrukerinfo());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/informasjon/bruker`, {
            credentials: 'include',
        })
            .then((response) => {
                if (response.status > 400) {
                    dispatch(hentBrukerinfoFeilet());
                }
                return response.json();
            })
            .then((json) => {
                return dispatch(setBrukerinfo(json));
            })
            .catch(() => {
                return dispatch(hentBrukerinfoFeilet());
            });
    };
}
