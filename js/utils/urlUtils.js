export const erPaaHeroku = () => {
    const url = window.location.href;
    return url.indexOf('heroku') > -1;
};

export const getSykepengesoknaderUrl = () => {
    return erPaaHeroku()
        ? 'https://sykepengesoknad.herokuapp.com/sykepengesoknad'
        : process.env.REACT_APP_SYKEPENGESOKNAD_ROOT;
};

export const getSykepengesoknadUrl = (soknadId) => {
    return `${getSykepengesoknaderUrl()}/${soknadId}`;
};

export const getOppfolgingsplanerUrl = () => {
    return erPaaHeroku()
        ? 'https://oppfolgingsplan.herokuapp.com/oppfolgingsplan/oppfolgingsplaner'
        : `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`;
};

