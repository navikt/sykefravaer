import { call, put, fork, takeEvery, select, all } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from '../actions/sykeforloep_actions';
import {
    HENT_SYKEFORLOEP_FORESPURT,
    HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_SENDT,
    SYKMELDING_GJENAAPNET,
} from '../actions/actiontyper';
import { skalHenteSykeforloep } from '../selectors/sykeforloepSelectors';

function* oppdaterSykeforloep() {
    yield put(actions.henterSykeforloep());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/sykeforloep`);
        yield put(actions.sykeforloepHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforloepFeilet());
    }
}

export function* hentSykeforloep() {
    const skalHente = yield select(skalHenteSykeforloep);
    if (skalHente) {
        yield* oppdaterSykeforloep();
    }
}

function* watchHentSykeforloep() {
    yield takeEvery([
        HENT_SYKEFORLOEP_FORESPURT,
    ], hentSykeforloep);
}

function* watchOppdaterSykeforloep() {
    yield takeEvery([
        SYKMELDING_SENDT,
        SYKMELDING_BEKREFTET,
        SYKMELDING_GJENAAPNET,
        HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
    ], oppdaterSykeforloep);
}

export default function* sykeforloepSagas() {
    yield all([
        fork(watchHentSykeforloep),
        fork(watchOppdaterSykeforloep),
    ]);
}
