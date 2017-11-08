import { getCookie, log } from 'digisyfo-npm';
import Ajax from 'simple-ajax';
import ponyfill from 'fetch-ponyfill';

const ponyfills = ponyfill();

const isEdge = () => {
    return navigator.userAgent.indexOf('Edge') > -1;
}

const getFetch = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom fetch overskrives
    if (isEdge()) {
        return ponyfills.fetch;
    }
    return fetch;
}

const getHeaders = () => {
    // Gjør dette slik fordi enhetstester vil feile dersom Headers overskrives
    if (isEdge()) {
        return ponyfills.Headers;
    }
    return Headers;   
}

export function get(url) {
    const fetchX = getFetch();
    return fetchX(url, {
        credentials: 'include',
    })
        .then((res) => {
            if (res.status === 404) {
                log(res);
                throw new Error('404');
            }
            if (res.status === 410) {
                log(res);
                throw new Error('410');
            }
            if (res.status > 400) {
                log(res);
                throw new Error(`Det har oppstått en ${res.status}-feil ved GET fra '${url}'`);
            }
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}

export function getAjax(url) {
    const ajax = new Ajax(url);
    const promise = new Promise((resolve, reject) => {
        ajax.on('success', (respons, responsTekst) => {
            resolve(responsTekst);
        });
        ajax.on('error', reject);
    });
    ajax.send();
    return promise;
}

export function post(url, body) {
    const fetchX = getFetch();
    const HeadersX = getHeaders();
    return fetchX(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new HeadersX({
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-SYFOREST'),
            'X-XSRF-TOKEN-MOTEREST': getCookie('XSRF-TOKEN-MOTEREST'),
            'X-XSRF-TOKEN-OPPFOELGINGSDIALOGREST': getCookie('XSRF-TOKEN-OPPFOELGINGSDIALOGREST'),
            NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        }),
    })
        .then((res) => {
            if (res.status > 400) {
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
            log(err);
            throw err;
        });
}
