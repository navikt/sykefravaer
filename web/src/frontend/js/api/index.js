import { getCookie } from 'digisyfo-npm';
import Ajax from 'simple-ajax';

export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
    .then((res) => {
        if (res.status === 404) {
            throw new Error('404');
        }
        if (res.status > 400) {
            throw new Error('Det oppstod en feil');
        }
        return res.json();
    })
    .catch((err) => {
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
        }),
    })
    .then((res) => {
        if (res.status > 400) {
            throw new Error('Forespørsel feilet');
        } else {
            return res;
        }
    })
    .catch((err) => {
        throw err;
    });
}
