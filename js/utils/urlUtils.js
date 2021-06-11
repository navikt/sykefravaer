export const getUrl = () => {
    return window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
};

export const erNaisLabsDemo = () => {
    return getUrl()
        .indexOf('labs.nais.io') > -1;
};

export const erDevGcp = () => {
    return getUrl()
        .indexOf('https://www-gcp.dev.nav.no/sykefravaer') > -1;
};

export const erProduksjon = () => {
    const url = getUrl();
    return url.indexOf('tjenester.nav') > -1;
};

export const erProduksjonEllerDev = () => {
    return erProduksjon() || erDevGcp();
};

export const erFlexDockerCompose = () => {
    const url = getUrl();
    return url.indexOf('localhost:2027') > -1 || url.indexOf('localhost:2028') > -1;
};


export const getSykepengesoknaderUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (url.indexOf('tjenester.nav') > -1) {
        // prod
        return 'https://www.nav.no/syk/sykepengesoknad';
    }
    if (erNaisLabsDemo()) {
        return 'https://sykepengesoknad.labs.nais.io';
    }
    if (erFlexDockerCompose()) {
        return 'http://localhost:2020';
    }
    return 'https://www-gcp.dev.nav.no/syk/sykepengesoknad';
};

export const getSyforestRoot = () => {
    if (erFlexDockerCompose()) {
        return 'http://localhost:1993/syforest';
    }
    if (erDevGcp()) {
        return 'https://syforestmock.dev.nav.no/syforest';
    }
    return '/syforest';
};


export const getDittNavUrl = () => {
    if (erDevGcp()) {
        return 'https://www.dev.nav.no/person/dittnav/';
    }
    return '/dittnav';
};

export const getOppfolgingRestUrl = () => {
    if (erFlexDockerCompose()) {
        return 'http://localhost:1993/veilarboppfolging/api/oppfolging';
    }
    if (erDevGcp()) {
        return 'https://syforestmock.dev.nav.no/veilarboppfolging/api/oppfolging';
    }
    return '/veilarboppfolging/api/oppfolging';
};

export const getVeilarbregRestUrl = () => {
    if (erFlexDockerCompose()) {
        return 'http://localhost:1993/veilarbregistrering/api/sykmeldtinfodata';
    }
    if (erDevGcp()) {
        return 'https://syforestmock.dev.nav.no/veilarbregistrering/api/sykmeldtinfodata';
    }
    return '/veilarbregistrering/api/sykmeldtinfodata';
};


export const getDialogmoteContextRoot = () => {
    if (erFlexDockerCompose()) {
        return 'http://localhost:1993/dialogmote';
    }
    if (erDevGcp()) {
        return 'https://syforestmock.dev.nav.no/dialogmote';
    }
    return '/dialogmote';
};

export const getOppfolgingsplanContextRoot = () => {
    if (erFlexDockerCompose()) {
        return 'http://localhost:1993/oppfolgingsplan';
    }
    if (erDevGcp()) {
        return 'https://syforestmock.dev.nav.no/oppfolgingsplan';
    }
    return '/oppfolgingsplan';
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
        // prod
        return 'https://www.nav.no/syk/sykepenger/';
    }
    if (erNaisLabsDemo()) {
        // Nais labs
        return 'https://sykepenger.labs.nais.io/syk/sykepenger/';
    }
    if (erFlexDockerCompose()) {
        // docker-compose
        return 'http://localhost:3021/syk/sykepenger/';
    }
    // preprod
    return 'https://www-gcp.dev.nav.no/syk/sykepenger/';
};

export const hentDialogmoteUrl = (sidevisning = '') => {
    const sluttUrl = `${getDialogmoteContextRoot()}${sidevisning}`;
    return erNaisLabsDemo()
        ? `https://dialogmote.herokuapp.com${sluttUrl}`
        : sluttUrl;
};

export const getOppfolgingsplanerUrl = () => {
    return erNaisLabsDemo()
        ? 'https://oppfolgingsplan.herokuapp.com/oppfolgingsplan/oppfolgingsplaner'
        : `${getOppfolgingsplanContextRoot()}/oppfolgingsplaner`;
};
