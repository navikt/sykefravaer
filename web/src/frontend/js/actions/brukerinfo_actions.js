import { harLocalStorageStotte } from 'digisyfo-npm';
import Ajax from 'simple-ajax';

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

export function setArbeidssituasjon(arbeidssituasjon) {
    return {
        type: 'SET_TIDSLINJE_ARBEIDSSITUASJON',
        arbeidssituasjon,
    };
}

export function setErInnlogget() {
    return {
        type: 'BRUKER_ER_INNLOGGET',
    };
}

export function setErUtlogget() {
    return {
        type: 'BRUKER_ER_UTLOGGET',
    };
}

export function sjekkerInnlogging() {
    return {
        type: 'SJEKKER_INNLOGGING',
    };
}

export function sjekkInnlogging() {
    return function innlogging(dispatch) {
        const ajax = new Ajax('/sykefravaer/');
        ajax.on('success', () => {
            dispatch(setErInnlogget());
        });
        ajax.on('error', () => {
            dispatch(setErUtlogget());
        });
        dispatch(sjekkerInnlogging());
        ajax.send();
    };
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
