import { put, fork, takeEvery } from 'redux-saga/effects';
import { setTidslinjer } from '../actions/tidslinjer_actions';
import { apneHendelser } from '../actions/hendelser_actions';
import {
    HENT_TIDSLINJER_FORESPURT,
} from '../actions/actiontyper';

export function* hentTidslinjer(action) {
    yield put(setTidslinjer(action.arbeidssituasjon, action.sykeforloep));
    if (action.apneHendelseIder.length > 0) {
        yield put(apneHendelser(action.apneHendelseIder));
    }
}

function* watchHentTidslinjer() {
    yield takeEvery(HENT_TIDSLINJER_FORESPURT, hentTidslinjer);
}

export default function* tidslinjerSagas() {
    yield fork(watchHentTidslinjer);
}
