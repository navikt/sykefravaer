import {
    call,
    put,
    fork,
    takeEvery,
    select,
} from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/moter_actions';
import { skalHenteMote } from '../selectors/moteSelectors';

export function* hentMote() {
    yield put(actions.henterMote());
    try {
        const mote = yield call(get, `${process.env.REACT_APP_MOTEREST_ROOT}/api/v2/moter/siste`);
        yield put(actions.moteHentet(mote));
    } catch (e) {
        if (e.message === '404') {
            yield put(actions.moteIkkeFunnet());
        } else {
            log(e);
            yield put(actions.hentMoteFeilet());
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
    yield takeEvery(actions.HENT_MOTE_FORESPURT, hentMoteHvisIkkeHentet);
}

export default function* svarSagas() {
    yield fork(watchHentMote);
}
