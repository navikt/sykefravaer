import {
    all, call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '../../digisyfoNpm';
import * as actions from './vedtak_actions';
import logger from '../../logging';
import { skalHenteVedtak } from './vedtakSelectors';
import { hentSpinnsynBackendUrl } from '../gateway-api';

export function* oppdaterVedtak() {
    yield put(actions.henterVedtak());
    try {
        const data = yield call(get, `${hentSpinnsynBackendUrl()}`);
        yield put(actions.alleVedtakHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente vedtak. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.hentVedtakFeilet());
    }
}

export function* hentAlleVedtakHvisIkkeHentet() {
    const skalHente = yield select(skalHenteVedtak);
    if (skalHente) {
        yield oppdaterVedtak();
    }
}


function* watchHentAlleVedtak() {
    yield takeEvery(actions.HENT_VEDTAK_FORESPURT, hentAlleVedtakHvisIkkeHentet);
}

function* watchOppdaterVedtak() {
    yield takeEvery([
        actions.HENT_VEDTAK_FORESPURT,
    ], oppdaterVedtak);
}

export default function* vedtakSagas() {
    yield all([
        fork(watchHentAlleVedtak),
        fork(watchOppdaterVedtak),
    ]);
}
