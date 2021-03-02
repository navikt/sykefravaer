import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '../utils';
import * as actions from '../actions/ledetekster_actions';
import { setLedetekster } from '../ledetekster';
import { HENT_LEDETEKSTER_FORESPURT } from '../actions/actiontyper';
import { get } from '../../data/gateway-api';
import { getSyfoteksterRoot } from '../../utils/urlUtils';

export function* hentLedetekster() {
    yield put(actions.henterLedetekster());
    try {
        const ledetekster = yield call(get, `${getSyfoteksterRoot()}/api/tekster`);
        setLedetekster(ledetekster);
        yield put(actions.ledeteksterHentet(ledetekster));
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
