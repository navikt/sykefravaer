export const hentSendingURL = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://egenmeldt-sm-backendproxy.nav.no/api/v1';
    }
    if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
        // Lokalt
        return '/egenmeldt-sykmelding-backend';
    }
    // Preprod
    return 'https://egenmeldt-sm-backendproxy-q.nav.no/api/v1';
};
