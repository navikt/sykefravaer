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
        return 'https://sykepengesoknad.labs.nais.io';
    }
    return process.env.REACT_APP_SYKEPENGESOKNAD_ROOT;
};

export const getSykepengesoknadUrl = (soknadId) => {
    return `${getSykepengesoknaderUrl()}/soknader/${soknadId}`;
};

export const getBehandledeSoknaderUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (url.indexOf('tjenester.nav') > -1) {
        return 'https://www.nav.no/syk/sykepenger';
    } if (erNaisLabsDemo()) {
        return 'https://spvedtak.labs.nais.io';
    } if (url.indexOf('localhost:2027') > -1 || url.indexOf('localhost:2028')) {
        return process.env.REACT_APP_SPINNSYN_ROOT;
    }
    return 'https://www-q1.dev.nav.no/syk/sykepenger';
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
