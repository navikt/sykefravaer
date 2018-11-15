import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import { henterSoknadMottaker, hentSoknadMottakerFeilet, soknadMottakerHentet } from '../actions/soknadMeta_actions';
import { hentApiUrl } from '../gateway-api';
import { HENT_SOKNAD_MOTTAKER_FORESPURT } from '../actions/actiontyper';

export function* hentMottaker(action) {
    yield put(henterSoknadMottaker(action.soknad.id));
    try {
        const data = yield call(post, `${hentApiUrl()}/soknader/${action.soknad.id}/mottaker`, action.soknad);
        yield put(soknadMottakerHentet(action.soknad.id, data));
    } catch (e) {
        log(e);
        yield put(hentSoknadMottakerFeilet(action.soknad.id));
    }
}

function* watchHentSoknadMottaker() {
    yield takeEvery(HENT_SOKNAD_MOTTAKER_FORESPURT, hentMottaker);
}

export default function* soknadMetaSagas() {
    yield fork(watchHentSoknadMottaker);
}
