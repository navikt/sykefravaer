import { call, fork, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/sykmeldtInfo_actions';
import * as actiontyper from '../actions/actiontyper';
import { get } from '../gateway-api';

export function* hentSykmeldtInfo() {
    yield put(actions.henterSykmeldtInfo());
    try {
        const data = yield call(get, '/veilarbregistrering/api/sykmeldtinfodata');
        yield put(actions.sykmeldtInfoHentet(data));
    } catch (e) {
        yield put(actions.hentSykmeldtInfoFeilet());
    }
}

function* watchHentSykmeldtInfo() {
    yield takeEvery(actiontyper.HENT_SYKMELDT_INFO_FORESPURT, hentSykmeldtInfo);
}

export default function* sykmeldtInfoSagas() {
    yield fork(watchHentSykmeldtInfo);
}
