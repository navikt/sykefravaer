import ponyfill from 'fetch-ponyfill';
import { getCookie, log } from '../utils';
import { hentLoginUrl } from '../../data/gateway-api';


const ponyfills = ponyfill();
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

const getHeaders = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom Headers overskrives
    if (isEdge()) {
        return ponyfills.Headers;
    }
    return window.Headers;
};

let performOnHttpCalls = () => {
    return undefined;
};
export const setPerformOnHttpCalls = (_performOnHttpCalls) => {
    performOnHttpCalls = _performOnHttpCalls;
};

const hentRedirectBaseUrl = (windowLocationHref) => {
    let redirectUrl = windowLocationHref;
    if (redirectUrl.indexOf('sykefravaerarbeidsgiver') > -1) {
        redirectUrl = `${redirectUrl.split('sykefravaerarbeidsgiver')[0]}sykefravaerarbeidsgiver`;
    } else if (redirectUrl.indexOf('sykefravaer') > -1) {
        redirectUrl = `${redirectUrl.split('sykefravaer')[0]}sykefravaer`;
    }
    return redirectUrl;
};

//  Hvis man har logget ut i en annen fane eller lignende kan man fange opp dette i testmiljøer at man får en 302 redirect
const erBrukerUtlogget = (res) => {
    return res.redirected;
};

export const postWithCsrf = (url, body) => {
    performOnHttpCalls();
    const fetchX = getFetch();
    const HeadersX = getHeaders();
    return fetchX(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new HeadersX({
            'Content-Type': 'application/json',
            NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        }),
    })
        .then((res) => {
            if (erBrukerUtlogget(res)) {
                window.location = '/esso/logout';
                return null;
            }
            if (res.status === 401) {
                log(res, 'Redirect til login');
                window.location.href = `${hentLoginUrl()}?redirect=${hentRedirectBaseUrl(window.location.href)}`;
                return null;
            } if (res.status === 409) {
                log(res);
                throw new Error('409');
            } else if (res.status > 400) {
                throw new Error(`Det har oppstått en ${res.status}-feil ved POST til '${url}'`);
            } else {
                const contentType = res.headers.get('Content-Type') || '';
                if (contentType.includes('json')) {
                    return res.json();
                }
                return res;
            }
        })
        .catch((err) => {
            // Fetch API only rejects a promise when a “network error is encountered,
            // although this usually means permissions issues or similar.
            // User is offline, or some unlikely networking error occurs, such a DNS lookup failure.
            // Dette skjer i vårt tilfelle om brukerens esso-token er timet ut / slettet / logget ut i annen fane.
            if (err.message === 'Failed to fetch') {
                window.location = '/esso/logout';
                return null;
            }
            log(err);
            throw err;
        });
};
