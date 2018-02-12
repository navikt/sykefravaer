import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/vedlikehold_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentVedlikehold() {
    yield put(actions.henterVedlikehold());
    try {
        const vedlikehold = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/informasjon/vedlikehold`);
        yield put(actions.vedlikeholdHentet(vedlikehold));
    } catch (e) {
        log(e);
        yield put(actions.hentVedlikeholdFeilet());
    }
}

function* watchHentVedlikehold() {
    yield* takeEvery(actiontyper.HENT_VEDLIKEHOLD_FORESPURT, hentVedlikehold);
}

export default function* vedlikeholdSagas() {
    yield fork(watchHentVedlikehold);
}
