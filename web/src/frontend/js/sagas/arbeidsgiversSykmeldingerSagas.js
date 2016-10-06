import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';

export function* hentArbeidsgiversSykmeldinger(action) {
    yield put({ type: 'HENTER_ARBEIDSGIVERS_SYKMELDINGER' });
    try {
        const sykmeldinger = yield call(get, `${window.SYFO_SETTINGS.REST_ROOT}/sykmeldinger?type=arbeidsgiver`);
        yield put({ type: 'SET_ARBEIDSGIVERS_SYKMELDINGER', sykmeldinger });
    } catch (e) {
        yield put({ type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET' });
    }
}

function* watchHentArbeidsgiversSykmeldinger() {
    yield* takeEvery('HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT', hentArbeidsgiversSykmeldinger);
}

export default function* arbeidsgiversSykmeldingerSagas() {
    yield fork(watchHentArbeidsgiversSykmeldinger);
}
