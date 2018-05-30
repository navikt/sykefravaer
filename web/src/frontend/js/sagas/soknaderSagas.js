import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/soknader_actions';
import {
    HENT_SOKNADER_FORESPURT,
} from '../actions/actiontyper';
import mockSoknader from '../../test/mockSoknader';

export function* hentSoknader() {
    yield put(actions.henterSoknader());
    try {
        const data = yield call(get, '/syfosoknad/soknader');
        yield put(actions.soknaderHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.soknaderHentet(mockSoknader));
    }
}

function* watchHentSoknader() {
    yield* takeEvery(HENT_SOKNADER_FORESPURT, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
}
