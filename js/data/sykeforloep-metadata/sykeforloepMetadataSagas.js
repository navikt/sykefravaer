import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import { skalHenteSykeforloepMetadata } from './sykeforloepMetadataSelectors';
import { SYKMELDING_AVBRUTT, SYKMELDING_BEKREFTET, SYKMELDING_SENDT } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';
import { henterSykeforloepMetadata, hentSykeforloepMetadataFeilet, sykeforloepMetadataHentet, HENT_SYKEFORLOEP_METADATA_FORESPURT } from './sykeforloepMetadata_actions';

export function* oppdaterSykeforloepMetadata() {
    yield put(henterSykeforloepMetadata());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/sykeforloep/metadata`);
        yield put(sykeforloepMetadataHentet(data));
    } catch (e) {
        log(e);
        yield put(hentSykeforloepMetadataFeilet());
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
