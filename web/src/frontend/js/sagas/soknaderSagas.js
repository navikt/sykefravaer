import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/soknader_actions';
import {
    HENT_SOKNADER_FORESPURT,
} from '../actions/actiontyper';

export function* hentSoknader() {
    yield put(actions.henterSoknader());
    try {
        const data = yield call(get, '/soknad/hentSoknad/1');
        yield put(actions.soknaderHentet([data]));
    } catch (e) {
        log(e);
        yield put(actions.hentSoknaderFeilet());
    }
}

function* watchHentSoknader() {
    yield* takeEvery(HENT_SOKNADER_FORESPURT, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
}
