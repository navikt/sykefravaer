import { call, put, fork, takeEvery, select, all } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/sykeforloep_actions';
import {
    HENT_SYKEFORLOEP_METADATA_FORESPURT,
    SYKMELDING_AVBRUTT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_SENDT,
} from '../actions/actiontyper';
import { skalHenteSykeforloepMetadata } from '../selectors/sykeforloepMetadataSelectors';

export function* oppdaterSykeforloepMetadata() {
    yield put(actions.henterSykeforloepMetadata());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykeforloep/metadata`);
        yield put(actions.sykeforloepMetadataHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforloepMetadataFeilet());
    }
}

export function* hentSykeforloepMetadataHvisIkkeHentet() {
    const skalHente = yield select(skalHenteSykeforloepMetadata);
    if (skalHente) {
        yield oppdaterSykeforloepMetadata();
    }
}

function* watchOppdaterSykeforloepMetadata() {
    yield takeEvery([
        SYKMELDING_SENDT,
        SYKMELDING_BEKREFTET,
        SYKMELDING_AVBRUTT,
    ], oppdaterSykeforloepMetadata);
}

function* watchHentSykeforloepMetadata() {
    yield takeEvery(HENT_SYKEFORLOEP_METADATA_FORESPURT, hentSykeforloepMetadataHvisIkkeHentet);
}

export default function* sykeforloepMetadataSagas() {
    yield all([
        fork(watchOppdaterSykeforloepMetadata),
        fork(watchHentSykeforloepMetadata),
    ]);
}
