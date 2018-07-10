import { log } from 'digisyfo-npm';

export const hentLoginUrl = () => {
    if (window.location.href.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login';
    } else if (window.location.href.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/syfoapi/local/cookie';
    }
    // Preprod
    return 'https://loginservice-q.nav.no/login';
};

export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                window.location.href = `${hentLoginUrl()}?redirect=${window.location.href}`;
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

export function post(url, body) {
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new window.Headers({
            'Content-Type': 'application/json',
        }),
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, 'Redirect til login');
                window.location.href = `${hentLoginUrl()}?redirect=${window.location.href}`;
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            }
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}

export const hentApiUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://syfoapi.nav.no/syfosoknad/api';
    } else if (url.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/syfoapi/syfosoknad/api';
    }
    // Preprod
    return 'https://syfoapi-q.nav.no/syfoapi/rest/soknad';
};
