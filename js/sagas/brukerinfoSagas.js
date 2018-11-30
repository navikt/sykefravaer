import { call, put, fork, takeEvery, all, select } from 'redux-saga/effects';
import { get, getAjax, log } from 'digisyfo-npm';
import * as actions from '../actions/brukerinfo_actions';
import * as actiontyper from '../actions/actiontyper';
import logger from '../logging';
import { skalHenteBrukerinfoSelector, skalHenteOppfolgingSelector } from '../selectors/brukerinfoSelectors';

export function* hentBrukerinfo() {
    const skalHente = yield select(skalHenteBrukerinfoSelector);
    if (skalHente) {
        yield put(actions.henterBrukerinfo());
        try {
            const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/bruker`);
            yield put(actions.setBrukerinfo(data));
        } catch (e) {
            log(e);
            logger.error(`Kunne ikke hente brukerinfo. URL: ${window.location.href} - ${e.message}`);
            yield put(actions.hentBrukerinfoFeilet());
        }
    }
}

export function* sjekkInnlogging() {
    yield put(actions.sjekkerInnlogging());
    try {
        yield call(getAjax, `${process.env.REACT_APP_CONTEXT_ROOT}/`);
        yield put(actions.setErInnlogget());
    } catch (e) {
        log(e);
        yield put(actions.setErUtlogget());
    }
}

export function* hentOppfolging() {
    const skalHente = yield select(skalHenteOppfolgingSelector);
    if (skalHente) {
        yield put(actions.henterOppfolging());
        try {
            const data = yield call(get, process.env.REACT_APP_OPPFOLGING_REST_URL);
            yield put(actions.oppfolgingHentet(data));
        } catch (e) {
            logger.error(`Kunne ikke hente oppfølging. URL: ${window.location.href} - ${e.message}`);
            log(e);
            yield put(actions.hentOppfolgingFeilet());
        }
    }
}

function* watchHentBrukerinfo() {
    yield takeEvery(actiontyper.HENT_BRUKERINFO_FORESPURT, hentBrukerinfo);
}

function* watchSjekkInnlogging() {
    yield takeEvery(actiontyper.SJEKK_INNLOGGING_FORESPURT, sjekkInnlogging);
}

function* watchHentOppfolging() {
    yield takeEvery(actiontyper.HENT_OPPFOLGING_FORESPURT, hentOppfolging);
}

export default function* brukerinfoSagas() {
    yield all([
        fork(watchHentOppfolging),
        fork(watchHentBrukerinfo),
        fork(watchSjekkInnlogging),
    ]);
}
