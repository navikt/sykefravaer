import { getCookie } from '../utils/index';
import Ajax from 'simple-ajax';

export function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        throw err;
    });
}

export function getAjax(url) {
    const ajax = new Ajax(url);
    return new Promise((resolve, reject) => {
        ajax.on('success', resolve);
        ajax.on('error', reject);
    });
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
    .catch((err) => {
        throw err;
    });
}