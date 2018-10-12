import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../actions/sykmeldingMeta_actions';
import { HENT_VENTETID_FORESPURT } from '../actions/actiontyper';

export function* hentVentetid(action) {
    yield put(actions.henterVentetid(action.sykmeldingId));
    try {
        const erUtenforVentetid = yield call(post,
            `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/erUtenforVentetid`);
        const a = actions.ventetidHentet(action.sykmeldingId, erUtenforVentetid);
        yield put(a);
    } catch (e) {
        log(e);
        yield put(actions.hentVentetidFeilet(action.sykmeldingId));
    }
}

function* watchHentVentetid() {
    yield takeEvery(HENT_VENTETID_FORESPURT, hentVentetid);
}

export default function* hentVentetidSagas() {
    yield fork(watchHentVentetid);
}
