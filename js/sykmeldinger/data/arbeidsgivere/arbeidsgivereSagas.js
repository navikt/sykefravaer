import {
    call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './arbeidsgivereActions';
import { getSyforestRoot } from '../../../utils/urlUtils';

const { HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT } = actions;

export const skalHenteArbeidsgivere = (state, sykmeldingId) => {
    return state.arbeidsgivere.sykmeldingId !== sykmeldingId;
};

export function* hentDineArbeidsgivere(action) {
    const { sykmeldingId } = action;
    const skalHente = yield select(skalHenteArbeidsgivere, sykmeldingId);
    if (skalHente) {
        yield put(actions.henterAktuelleArbeidsgivere(sykmeldingId));
        try {
            const data = yield call(get, `${getSyforestRoot()}/informasjon/arbeidsgivere?sykmeldingId=${sykmeldingId}`);
            yield put(actions.aktuelleArbeidsgivereHentet(sykmeldingId, data));
        } catch (e) {
            log(e);
            yield put(actions.hentAktuelleArbeidsgivereFeilet(sykmeldingId));
        }
    }
}

function* watchHentArbeidsgivere() {
    yield takeEvery(HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT, hentDineArbeidsgivere);
}

export default function* arbeidsgivereSagas() {
    yield fork(watchHentArbeidsgivere);
}
