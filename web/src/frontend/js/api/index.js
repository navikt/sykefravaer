import { getCookie, log } from 'digisyfo-npm';
import Ajax from 'simple-ajax';

export function get(url) {
    return fetch(url, {
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
                throw new Error('Det oppstod en feil');
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
    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-SYFOREST'),
            'X-XSRF-TOKEN-MOTEREST': getCookie('XSRF-TOKEN-MOTEREST'),
        }),
    })
        .then((res) => {
            if (res.status > 400) {
                throw new Error('Forespørsel feilet');
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
