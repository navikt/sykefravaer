import { erNaisLabsDemo } from '../../utils/urlUtils';

export const hentEgenmeldtSmApiUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://egenmeldt-sm-backendproxy.nav.no';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/egenmeldt-sykmelding-backend';
    }
    // Preprod
    return 'https://egenmeldt-sm-backendproxy-q.nav.no';
};

export const hentEgenmeldtSmCacheInvalidateApiUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://tjenester.nav.no/syforest';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/egenmeldt-sykmelding-backend';
    }
    // Preprod
    return 'https://tjenester-q1.nav.no/syforest';
};
