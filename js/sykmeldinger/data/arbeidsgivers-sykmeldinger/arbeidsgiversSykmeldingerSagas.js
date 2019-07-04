import { get, log } from '@navikt/digisyfo-npm';
import {
    call, fork, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from './arbeidsgiversSykmeldingerActions';
import {
    BEKREFT_SYKMELDING_ANGRET,
    SYKMELDING_AVBRUTT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_GJENAAPNET,
    SYKMELDING_SENDT,
} from '../din-sykmelding/dinSykmeldingActions';

const { HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT } = actions;

export function* hentArbeidsgiversSykmeldinger() {
    yield put(actions.henterArbeidsgiversSykmeldinger());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger?type=arbeidsgiver`);
        yield put(actions.setArbeidsgiversSykmeldinger(data));
    } catch (e) {
        log(e);
        yield put(actions.hentArbeidsgiversSykmeldingerFeilet());
    }
}

function* watchHentArbeidsgiversSykmeldinger() {
    yield takeEvery([
        HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT,
        SYKMELDING_BEKREFTET,
        SYKMELDING_SENDT,
        SYKMELDING_AVBRUTT,
        SYKMELDING_GJENAAPNET,
        BEKREFT_SYKMELDING_ANGRET,
    ], hentArbeidsgiversSykmeldinger);
}

export default function* arbeidsgiversSykmeldingerSagas() {
    yield fork(watchHentArbeidsgiversSykmeldinger);
}
