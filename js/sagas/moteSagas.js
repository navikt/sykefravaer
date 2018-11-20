import {
    call,
    put,
    fork,
    takeEvery,
    select,
} from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import { moteActions, actiontyper } from 'moter-npm';
import { skalHenteMote } from '../selectors/moteSelectors';

export function* hentMote() {
    yield put(moteActions.henterMote());
    try {
        const mote = yield call(get, `${process.env.REACT_APP_MOTEREST_ROOT}/api/v2/moter/siste`);
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

export function* hentMoteHvisIkkeHentet() {
    const skalHente = yield select(skalHenteMote);
    if (skalHente) {
        yield hentMote();
    }
}

function* watchHentMote() {
    yield takeEvery(actiontyper.HENT_MOTE_FORESPURT, hentMoteHvisIkkeHentet);
}

export default function* svarSagas() {
    yield fork(watchHentMote);
}
