import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { log } from 'digisyfo-npm';
import * as actions from '../actions/dineArbeidsgivere_actions';

export function* hentDineArbeidsgivere(action) {
    const sykmeldingId = action.sykmeldingId;
    yield put(actions.henterAktuelleArbeidsgivere(sykmeldingId));
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/informasjon/arbeidsgivere?sykmeldingId=${sykmeldingId}`);
        yield put(actions.setAktuelleArbeidsgivere(sykmeldingId, data));
    } catch (e) {
        log(e);
        yield put(actions.hentAktuelleArbeidsgivereFeilet(sykmeldingId));
    }
}

function* watchHentArbeidsgiversSykmeldinger() {
    yield* takeEvery('HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT', hentDineArbeidsgivere);
}

export default function* dineSykmeldingerSagas() {
    yield fork(watchHentArbeidsgiversSykmeldinger);
}
