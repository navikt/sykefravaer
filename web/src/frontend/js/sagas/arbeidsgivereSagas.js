import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/dineArbeidsgivere_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentDineArbeidsgivere(action) {
    const sykmeldingId = action.sykmeldingId;
    yield put(actions.henterAktuelleArbeidsgivere(sykmeldingId));
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/informasjon/arbeidsgivere?sykmeldingId=${sykmeldingId}`);
        yield put(actions.aktuelleArbeidsgivereHentet(sykmeldingId, data));
    } catch (e) {
        log(e);
        yield put(actions.hentAktuelleArbeidsgivereFeilet(sykmeldingId));
    }
}

function* watchHentArbeidsgivere() {
    yield takeEvery(actiontyper.HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT, hentDineArbeidsgivere);
}

export default function* arbeidsgivereSagas() {
    yield fork(watchHentArbeidsgivere);
}
