import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import { moteActions, actiontyper } from 'moter-npm';

export function* hentMote() {
    yield put(moteActions.henterMote());
    try {
        const mote = yield call(get, `${window.APP_SETTINGS.MOTEREST_ROOT}/v2/moter/siste`);
        yield put(moteActions.moteHentet(mote));
    } catch (e) {
        if (e.message === '404') {
            yield put(moteActions.moteIkkeFunnet());
        } else {
            log(e);
            yield put(moteActions.hentMoteFeilet());
        }
    }
}

function* watchHentMote() {
    yield takeEvery(actiontyper.HENT_MOTE_FORESPURT, hentMote);
}

export default function* svarSagas() {
    yield fork(watchHentMote);
}
