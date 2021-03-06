import ponyfill from 'fetch-ponyfill';
import { log } from '../../digisyfoNpm/utils';
import { MANGLER_OIDC_TOKEN } from '../../enums/exceptionMessages';
import { erDevGcp, erFlexDockerCompose, erNaisLabsDemo, erProduksjon } from '../../utils/urlUtils';

const ponyfills = ponyfill();
export const REDIRECT_ETTER_LOGIN = 'REDIRECT_ETTER_LOGIN';

const isEdge = () => {
    return window.navigator.userAgent.indexOf('Edge') > -1;
};

const getFetch = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom fetch overskrives
    if (isEdge()) {
        return ponyfills.fetch;
    }
    return window.fetch;
};


export const getHeaders = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom Headers overskrives
    if (isEdge()) {
        return ponyfills.Headers;
    }
    return window.Headers;
};

export const hentLoginUrl = () => {
    window.localStorage.setItem(REDIRECT_ETTER_LOGIN, window.location.href);
    if (window.location.href.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login';
    }
    if (window.location.href.indexOf('localhost:2027') > -1 || window.location.href.indexOf('localhost:2028') > -1) {
        // Lokalt docker compose
        return 'http://localhost:5000';
    }
    if (window.location.href.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/syfoapi/local/cookie';
    }
    if (erDevGcp()) {
        return 'https://loginservice.dev.nav.no/login';
    }
    // Preprod
    return 'https://loginservice-q.nav.no/login';
};

export const leggTilCacheBuster = (url) => {
    const ts = new Date().getTime();
    return url.indexOf('?') === -1
        ? `${url}?_ts=${ts}`
        : `${url}&_ts=${ts}`;
};

export function get(url, headers = null) {
    const customFetch = getFetch();
    const CustomHeaders = getHeaders();
    const headersArg = headers || new CustomHeaders();
    return customFetch(leggTilCacheBuster(url), {
        credentials: 'include',
        headers: headersArg,
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                window.location.href = `${hentLoginUrl()}?redirect=${window.location.origin}/sykefravaer`;
                throw new Error(MANGLER_OIDC_TOKEN);
            } else if (res.status === 404) {
                log(res);
                throw new Error('404');
            } else if (res.status === 403) {
                log(res);
                throw new Error('403');
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            }
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}

export const post = (url, body) => {
    const customFetch = getFetch();
    const CustomHeaders = getHeaders();
    return customFetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new CustomHeaders({
            'Content-Type': 'application/json',
        }),
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                window.location.href = `${hentLoginUrl()}?redirect=${window.location.href}`;
                return null;
            }
            if (res.status > 400) {
                log(res);
                throw new Error(`Forespørsel feilet. Statuskode: ${res.status}`);
            } else {
                const contentType = res.headers.get('Content-Type') || '';
                if (contentType.includes('json')) {
                    return res.json();
                }
                return res;
            }
        })
        .catch((err) => {
            log(err);
            throw err;
        });
};

export const hentApiUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://flex-gateway.nav.no/syfosoknad/api';
    }
    if (url.indexOf('localhost:2027') > -1 || url.indexOf('localhost:2028') > -1) {
        // docker compose
        return 'http://localhost:33333/syfosoknad/api';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/syfosoknad/api';
    }
    // Preprod
    return 'https://flex-gateway.dev.nav.no/syfosoknad/api';
};

export const hentSyfoApiUrl = (appNavn) => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (erProduksjon()) {
        // Prod
        return `https://syfoapi.nav.no/${appNavn}/api`;
    }
    if (erFlexDockerCompose()) {
        // docker compose
        return `http://localhost:1995/${appNavn}/api`;
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return `/${appNavn}/api`;
    }
    if (erDevGcp()) {
        return `https://syfoapi.dev.nav.no/${appNavn}/api`;
    }
    // Preprod
    return `https://syfoapi-q.nav.no/${appNavn}/api`;
};

export const hentSpinnsynBackendUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (erProduksjon()) {
        // Prod
        return 'https://flex-gateway.nav.no/spinnsyn-backend/api/v2/vedtak';
    }
    if (erFlexDockerCompose()) {
        // docker compose
        return 'http://localhost:33333/spinnsyn-backend/api/v2/vedtak';
    }
    if (erNaisLabsDemo()) {
        // Nais labs
        return '/spinnsyn-backend-mock/api/v1/vedtak';
    }
    if (url.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/vedtak';
    }
    // Preprod
    return 'https://flex-gateway.dev.nav.no/spinnsyn-backend/api/v2/vedtak';
};

export const API_NAVN = {
    SYFOMOTEADMIN: 'syfomoteadmin',
    SYFOMOTEBEHOV: 'syfomotebehov',
    SYFOOPPFOLGINGSPLANSERVICE: 'syfooppfolgingsplanservice',
    SYFOSERVICESTRANGLER: 'syfoservicestrangler',
    SYFOSMREGISTER: 'syfosmregister',
};
