import { call, put, fork, takeEvery, select, all } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import {
    HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
} from '../oppfolgingsforlopsperioder/oppfolgingsforlopsPerioder_actions';
import { skalHenteSykeforloep } from './sykeforloepSelectors';
import { henterSykeforloep, sykeforloepHentet, hentSykeforloepFeilet, HENT_SYKEFORLOEP_FORESPURT } from './sykeforloep_actions';
import { SYKMELDING_BEKREFTET, SYKMELDING_GJENAAPNET, SYKMELDING_SENDT } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';

function* oppdaterSykeforloep() {
    yield put(henterSykeforloep());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/sykeforloep`);
        yield put(sykeforloepHentet(data));
    } catch (e) {
        log(e);
        yield put(hentSykeforloepFeilet());
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
