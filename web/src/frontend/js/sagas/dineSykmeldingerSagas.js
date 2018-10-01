import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
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
    yield takeEvery([
        actiontyper.SYKMELDING_BEKREFTET,
        actiontyper.SYKMELDING_SENDT,
        actiontyper.SYKMELDING_AVBRUTT,
        actiontyper.SYKMELDING_GJENAAPNET,
        actiontyper.BEKREFT_SYKMELDING_ANGRET,
        actiontyper.HENT_DINE_SYKMELDINGER_FORESPURT,
    ], hentDineSykmeldinger);
}


export default function* dineSykmeldingerSagas() {
    yield all([
        fork(watchHentDineSykmeldinger),
    ]);
}
