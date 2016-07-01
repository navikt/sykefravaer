export function setHendelser(data = []) {
    return {
        type: 'SET_HENDELSER',
        data,
    };
}

export function apneHendelser(hendelseIder) {
    return {
        type: 'ÅPNE_HENDELSER',
        hendelseIder,
    };
}

export function hentHendelserFeilet() {
    return {
        type: 'HENT_HENDELSER_FEILET',
    };
}

export function setHendelseData(hendelseId, data) {
    return {
        type: 'SET_HENDELSEDATA',
        hendelseId,
        data,
    };
}

export function henterHendelser() {
    return {
        type: 'HENTER_HENDELSER',
    };
}

export function hentHendelser() {
    return function hendelser(dispatch) {
        dispatch(henterHendelser());
        return fetch(`${window.SYFO_SETTINGS.REST_ROOT}/tidslinje`)
        .then((response) => {
            if (response.status > 400) {
                return dispatch(hentHendelserFeilet());
            }
            return response.json();
        })
        .then((json) => {
            return dispatch(setHendelser(json.hendelser));
        })
        .catch(() => {
            return dispatch(hentHendelserFeilet());
        });
    };
}
