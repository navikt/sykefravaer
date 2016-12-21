import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { log } from 'digisyfo-npm';

export function* hentLedere() {
    yield put({ type: 'HENTER_LEDERE' });
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/naermesteledere`);
        yield put({ type: 'LEDERE_HENTET', data });
    } catch (e) {
        log(e);
        yield put({ type: 'HENT_LEDERE_FEILET' });
    }
}

function* watchHentLedere() {
    yield* takeEvery('HENT_LEDERE_FORESPURT', hentLedere);
}

export default function* ledereSagas() {
    yield fork(watchHentLedere);
}
