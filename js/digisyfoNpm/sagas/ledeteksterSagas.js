import { put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '../utils';
import * as actions from '../actions/ledetekster_actions';
import { setLedetekster } from '../ledetekster';
import { HENT_LEDETEKSTER_FORESPURT } from '../actions/actiontyper';
import { tekster } from '../../tekster/tekster';

export function* hentLedetekster() {
    yield put(actions.henterLedetekster());
    try {
        setLedetekster(tekster);
        yield put(actions.ledeteksterHentet(tekster));
    } catch (e) {
        log(e);
        yield put(actions.hentLedeteksterFeilet());
    }
}

function* watchHentLedetekster() {
    yield takeEvery(HENT_LEDETEKSTER_FORESPURT, hentLedetekster);
}

export default function* ledeteksterSagas() {
    yield fork(watchHentLedetekster);
}
