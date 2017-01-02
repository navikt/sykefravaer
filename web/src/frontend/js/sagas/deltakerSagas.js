import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { actiontyper, deltakerActions } from 'moter-npm';

export function* hentDeltaker(action) {
    yield put(deltakerActions.henterDeltaker());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.MOTEREST_ROOT}/api/moter/siste`);
        yield put(deltakerActions.deltakerHentet(data));
    } catch (e) {
        if (e.message === '404') {
            yield put(deltakerActions.fantIkkeDeltaker());
        } else if (e.message === '410') {
            yield put(deltakerActions.motetErUtgaatt());
        } else {
            yield put(deltakerActions.hentDeltakerFeilet());
        }
    }
}

function* watchHentDeltaker() {
    yield* takeEvery(actiontyper.HENT_DELTAKER_FORESPURT, hentDeltaker);
}

export default function* deltakerSagas() {
    yield fork(watchHentDeltaker);
}
