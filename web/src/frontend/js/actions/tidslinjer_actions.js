import { apneHendelser } from './hendelser_actions.js';
import { setArbeidssituasjon } from './brukerinfo_actions.js';

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

export function setTidslinjer(tidslinjer = [], arbeidssituasjon) {
    return {
        type: 'SET_TIDSLINJER',
        tidslinjer,
        arbeidssituasjon,
    };
}

export function hentTidslinjer(apneHendelseIder = [], arbeidssituasjon = 'MED_ARBEIDSGIVER') {
    return function tidslinjer(dispatch) {
        dispatch(henterTidslinjer());
        dispatch(setArbeidssituasjon(arbeidssituasjon));
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/tidslinje?type=${arbeidssituasjon}`, {
            credentials: 'include',
        })
        .then((response) => {
            if (response.status > 400) {
                dispatch(hentTidslinjerFeilet());
            }
            return response.json();
        })
        .then((json) => {
            return dispatch(setTidslinjer(json, arbeidssituasjon));
        })
        .then((respons) => {
            if (apneHendelseIder.length) {
                return dispatch(apneHendelser(apneHendelseIder));
            }
            return respons;
        })
        .catch(() => {
            return dispatch(hentTidslinjerFeilet());
        });
    };
}
