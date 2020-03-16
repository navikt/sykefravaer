export const hentSendingURL = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://egenmeldt-sykmelding-backend.nais.adeo.no';
    }
    if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
        // Lokalt
        return '/egenmeldt-sykmelding-backend';
    }
    // Preprod
    return 'https://egenmeldt-sykmelding-backend.nais.preprod.local';
};
