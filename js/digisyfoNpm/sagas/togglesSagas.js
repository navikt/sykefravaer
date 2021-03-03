import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/toggles_actions';
import * as actiontyper from '../actions/actiontyper';
import { get } from '../../data/gateway-api';
import { getSyforestRoot } from '../../utils/urlUtils';

export function* hentToggles() {
    yield put(actions.henterToggles());
    try {
        const data = yield call(get, `${getSyforestRoot()}/informasjon/toggles`);
        yield put(actions.togglesHentet(data));
    } catch (e) {
        yield put(actions.hentTogglesFeilet());
    }
}

function* watchHentToggles() {
    yield takeEvery(actiontyper.HENT_TOGGLES_FORESPURT, hentToggles);
}

export default function* toggleSagas() {
    yield fork(watchHentToggles);
}
