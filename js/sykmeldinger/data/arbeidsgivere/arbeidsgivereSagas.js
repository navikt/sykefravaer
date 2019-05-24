import { call, put, fork, takeEvery, select } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './arbeidsgivereActions';
import * as actiontyper from '../../../data/actiontyper';

export const skalHenteArbeidsgivere = (state, sykmeldingId) => {
    return state.arbeidsgivere.sykmeldingId !== sykmeldingId;
};

export function* hentDineArbeidsgivere(action) {
    const sykmeldingId = action.sykmeldingId;
    const skalHente = yield select(skalHenteArbeidsgivere, sykmeldingId);
    if (skalHente) {
        yield put(actions.henterAktuelleArbeidsgivere(sykmeldingId));
        try {
            const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/arbeidsgivere?sykmeldingId=${sykmeldingId}`);
            yield put(actions.aktuelleArbeidsgivereHentet(sykmeldingId, data));
        } catch (e) {
            log(e);
            yield put(actions.hentAktuelleArbeidsgivereFeilet(sykmeldingId));
        }
    }
}

function* watchHentArbeidsgivere() {
    yield takeEvery(actiontyper.HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT, hentDineArbeidsgivere);
}

export default function* arbeidsgivereSagas() {
    yield fork(watchHentArbeidsgivere);
}
