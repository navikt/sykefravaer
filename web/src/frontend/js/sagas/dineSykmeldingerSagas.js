import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';

export function* hentDineSykmeldinger(action) {
    yield put({ type: 'HENTER_DINE_SYKMELDINGER' });
    try {
        const sykmeldinger = yield call(get, `${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger`);
        yield put({ type: 'SET_DINE_SYKMELDINGER', sykmeldinger });
    } catch (e) {
        yield put({ type: 'HENT_DINE_SYKMELDINGER_FEILET' });
    }
}

function* watchHentDineSykmeldinger() {
    yield* takeEvery('HENT_DINE_SYKMELDINGER_FORESPURT', hentDineSykmeldinger);
}

export default function* dineSykmeldingerSagas() {
    yield fork(watchHentDineSykmeldinger);
}
