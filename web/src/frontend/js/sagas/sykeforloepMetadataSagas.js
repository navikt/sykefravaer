import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/sykeforloep_actions';
import {
    HENT_SYKEFORLOEP_METADATA_FORESPURT,
} from '../actions/actiontyper';

export function* hentSykeforloepMetadata() {
    yield put(actions.henterSykeforloepMetadata());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep/metadata`);
        yield put(actions.sykeforloepMetadataHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforloepMetadataFeilet());
    }
}

function* watchHentSykeforloepMetadata() {
    yield takeEvery(HENT_SYKEFORLOEP_METADATA_FORESPURT, hentSykeforloepMetadata);
}

export default function* sykeforloepSagas() {
    yield fork(watchHentSykeforloepMetadata);
}
