import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/sykeforloep_actions';
import {
    HENT_SYKEFORLOEP_FORESPURT,
} from '../actions/actiontyper';

export function* hentSykeforloep() {
    yield put(actions.henterSykeforloep());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep`);
        yield put(actions.sykeforloepHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforloepFeilet());
    }
}

function* watchHentSykeforloep() {
    yield takeEvery(HENT_SYKEFORLOEP_FORESPURT, hentSykeforloep);
}

export default function* sykeforloepSagas() {
    yield fork(watchHentSykeforloep);
}
