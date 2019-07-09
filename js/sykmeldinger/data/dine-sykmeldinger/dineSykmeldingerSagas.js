import {
    all, call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './dineSykmeldingerActions';
import { selectSkalHenteDineSykmeldinger } from './dineSykmeldingerSelectors';
import {
    BEKREFT_SYKMELDING_ANGRET,
    SYKMELDING_AVBRUTT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_GJENAAPNET,
    SYKMELDING_SENDT,
} from '../din-sykmelding/dinSykmeldingActions';

const { HENT_DINE_SYKMELDINGER_FORESPURT } = actions;

export function* oppdaterDineSykmeldinger() {
    yield put(actions.henterDineSykmeldinger());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger`);
        yield put(actions.setDineSykmeldinger(data));
    } catch (e) {
        log(e);
        yield put(actions.hentDineSykmeldingerFeilet());
    }
}

export function* hentDineSykmeldingerHvisIkkeHentet() {
    const skalHente = yield select(selectSkalHenteDineSykmeldinger);
    if (skalHente) {
        yield oppdaterDineSykmeldinger();
    }
}

function* watchOppdaterDineSykmeldinger() {
    yield takeEvery([
        SYKMELDING_BEKREFTET,
        SYKMELDING_SENDT,
        SYKMELDING_AVBRUTT,
        SYKMELDING_GJENAAPNET,
        BEKREFT_SYKMELDING_ANGRET,
    ], oppdaterDineSykmeldinger);
}

function* watchHentDineSykmeldinger() {
    yield takeEvery(HENT_DINE_SYKMELDINGER_FORESPURT, hentDineSykmeldingerHvisIkkeHentet);
}

export default function* dineSykmeldingerSagas() {
    yield all([
        fork(watchOppdaterDineSykmeldinger),
        fork(watchHentDineSykmeldinger),
    ]);
}
