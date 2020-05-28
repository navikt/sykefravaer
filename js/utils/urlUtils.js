export const erNaisLabsDemo = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    return url.indexOf('labs.nais.io') > -1;
};


export const getSykepengesoknaderUrl = () => {
    if (erNaisLabsDemo()) {
        return 'https://sykepengesoknad-old.labs.nais.io';
    }
    return process.env.REACT_APP_SYKEPENGESOKNAD_ROOT;
};

export const getSykepengesoknadUrl = (soknadId) => {
    return `${getSykepengesoknaderUrl()}/soknader/${soknadId}`;
};

export const hentDialogmoteUrl = (sidevisning = '') => {
    const sluttUrl = `${process.env.REACT_APP_DIALOGMOTE_CONTEXT_ROOT}${sidevisning}`;
    return erNaisLabsDemo()
        ? `https://dialogmote.herokuapp.com${sluttUrl}`
        : sluttUrl;
};

export const getOppfolgingsplanerUrl = () => {
    return erNaisLabsDemo()
        ? 'https://oppfolgingsplan.herokuapp.com/oppfolgingsplan/oppfolgingsplaner'
        : `${process.env.REACT_APP_OPPFOLGINGSPLAN_CONTEXT_ROOT}/oppfolgingsplaner`;
};
