import {
    all, call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './vedtaker_actions';
import logger from '../../logging';
import { skalHenteVedtaker } from './vedtakerSelectors';
import { hentVedtakApiUrl } from '../gateway-api';

export function* oppdaterVedtaker() {
    yield put(actions.henterVedtaker());
    try {
        const data = yield call(get, `${hentVedtakApiUrl()}`);
        yield put(actions.vedtakerHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente vedtaker. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.hentVedtakerFeilet());
    }
}

export function* hentVedtakerHvisIkkeHentet() {
    const skalHente = yield select(skalHenteVedtaker);
    if (skalHente) {
        yield oppdaterVedtaker();
    }
}


function* watchHentVedtaker() {
    yield takeEvery(actions.HENT_VEDTAKER_FORESPURT, hentVedtakerHvisIkkeHentet);
}

function* watchOppdaterVedtaker() {
    yield takeEvery([
        actions.HENT_VEDTAKER_FORESPURT,
    ], oppdaterVedtaker);
}

export default function* vedtakSagas() {
    yield all([
        fork(watchHentVedtaker),
        fork(watchOppdaterVedtaker),
    ]);
}
