import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { henterToggles, togglesHentet, hentTogglesFeilet, HENT_TOGGLES_FORESPURT } from '@navikt/digisyfo-npm';
import { getSyforestRoot } from '../../utils/urlUtils';
import { get } from '../gateway-api';

export function* hentToggles() {
    yield put(henterToggles());
    try {
        const data = yield call(get, `${getSyforestRoot()}/informasjon/toggles`);
        yield put(togglesHentet(data));
    } catch (e) {
        yield put(hentTogglesFeilet());
    }
}

function* watchHentToggles() {
    yield takeEvery(HENT_TOGGLES_FORESPURT, hentToggles);
}

export default function* togglesSagas() {
    yield fork(watchHentToggles);
}
