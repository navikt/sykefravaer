import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/sykeforloep_actions';
import {
    HENT_SYKEFORLOEP_FORESPURT,
    HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_SENDT,
    SYKMELDING_GJENAAPNET,
} from '../actions/actiontyper';

export function* hentSykeforloep() {
    yield put(actions.henterSykeforloep());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/sykeforloep`);
        yield put(actions.sykeforloepHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykeforloepFeilet());
    }
}

function* watchHentSykeforloep() {
    yield takeEvery([
        HENT_SYKEFORLOEP_FORESPURT,
        HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
        SYKMELDING_SENDT,
        SYKMELDING_BEKREFTET,
        SYKMELDING_GJENAAPNET,
    ], hentSykeforloep);
}

export default function* sykeforloepSagas() {
    yield fork(watchHentSykeforloep);
}
