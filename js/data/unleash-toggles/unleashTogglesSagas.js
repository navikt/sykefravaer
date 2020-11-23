import {
    call, fork, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from './unleashToggles_actions';
import { post } from '../gateway-api/index';
import * as toggles from '../../enums/unleashToggles';

function hentUnleashUrl() {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';
    if (url.indexOf('localhost:2027') > -1 || url.indexOf('localhost:2028') > -1) {
        return 'http://localhost:1956/syfounleash';
    } if (url.indexOf('localhost:8080')) {
        return '/syfounleash/';
    }
    return 'http://unleash.nais.io/';
}

export function* hentUnleashToggles() {
    yield put(actions.henterUnleashToggles());
    try {
        const data = yield call(post, hentUnleashUrl(), Object.values(toggles));
        yield put(actions.unleashTogglesHentet(data));
    } catch (e) {
        yield put(actions.hentUnleashTogglesFeilet());
    }
}

function* watchHentUnleashToggles() {
    yield takeEvery(actions.HENT_UNLEASH_TOGGLES_FORESPURT, hentUnleashToggles);
}

export default function* unleashTogglesSagas() {
    yield fork(watchHentUnleashToggles);
}
