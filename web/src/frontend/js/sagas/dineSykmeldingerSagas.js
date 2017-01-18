import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { log } from 'digisyfo-npm';
import * as actions from '../actions/dineSykmeldinger_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentDineSykmeldinger() {
    yield put(actions.henterDineSykmeldinger());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger`);
        yield put(actions.setDineSykmeldinger(data));
    } catch (e) {
        log(e);
        yield put(actions.hentDineSykmeldingerFeilet());
    }
}

function* watchHentDineSykmeldinger() {
    yield* takeEvery(actiontyper.HENT_DINE_SYKMELDINGER_FORESPURT, hentDineSykmeldinger);
}

export default function* dineSykmeldingerSagas() {
    yield fork(watchHentDineSykmeldinger);
}
