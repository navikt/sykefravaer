import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import * as actions from '../actions/arbeidsgiversSykmeldinger_actions';
import { log } from 'digisyfo-npm';

export function* hentArbeidsgiversSykmeldinger() {
    yield put({ type: 'HENTER_ARBEIDSGIVERS_SYKMELDINGER' });
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger?type=arbeidsgiver`);
        yield put(actions.setArbeidsgiversSykmeldinger(data));
    } catch (e) {
        log(e);
        yield put(actions.hentArbeidsgiversSykmeldingerFeilet());
    }
}

function* watchHentArbeidsgiversSykmeldinger() {
    yield* takeEvery('HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT', hentArbeidsgiversSykmeldinger);
}

export default function* arbeidsgiversSykmeldingerSagas() {
    yield fork(watchHentArbeidsgiversSykmeldinger);
}
