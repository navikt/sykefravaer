/* eslint-disable no-use-before-define */

import { call, fork, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { browserHistory } from 'react-router';
import * as actions from '../actions/soknader_actions';
import { HENT_SOKNADER_FORESPURT, SEND_SOKNAD_FORESPURT, SYKMELDING_BEKREFTET } from '../actions/actiontyper';
import { toggleInnsendingAvSelvstendigSoknad, toggleSelvstendigSoknad } from '../toggles';

const gaTilKvittering = (soknadId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadId}/kvittering`);
};

export function* hentSoknader() {
    if (toggleSelvstendigSoknad()) {
        yield put(actions.henterSoknader());
        try {
            const data = yield call(get, `${hentApiUrl()}/soknader`);
            yield put(actions.soknaderHentet(data));
        } catch (e) {
            log(e);
            yield put(actions.hentSoknaderFeilet());
        }
    } else {
        yield put(actions.soknaderHentet([]));
    }
}

export function* sendSoknad(action) {
    yield put(actions.senderSoknad(action.soknadId));
    try {
        if (toggleInnsendingAvSelvstendigSoknad()) {
            yield call(post, `${hentApiUrl()}/sendSoknad`, action.soknad);
        }
        yield put(actions.soknadSendt(action.soknad));
        gaTilKvittering(action.soknad.id);
    } catch (e) {
        log(e);
        yield put(actions.sendSoknadFeilet());
    }
}

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

const hentLoginUrl = () => {
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

const hentApiUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://syfoapi.nav.no/syfoapi/rest/soknad';
    } else if (url.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/syfoapi/rest/soknad';
    }
    // Preprod
    return 'https://syfoapi-q.nav.no/syfoapi/rest/soknad';
};

function* watchHentSoknader() {
    yield* takeEvery(HENT_SOKNADER_FORESPURT, hentSoknader);
}

function* watchSendSoknad() {
    yield* takeEvery(SEND_SOKNAD_FORESPURT, sendSoknad);
}

function* watchSykmeldingSendt() {
    yield* takeEvery(SYKMELDING_BEKREFTET, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
    yield fork(watchSendSoknad);
    yield fork(watchSykmeldingSendt);
}
