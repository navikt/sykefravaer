import { get, log } from '@navikt/digisyfo-npm';
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as actiontyper from '../actions/actiontyper';
import * as actions from '../actions/arbeidsgiversSykmeldinger_actions';

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
        actiontyper.HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT,
        actiontyper.SYKMELDING_BEKREFTET,
        actiontyper.SYKMELDING_SENDT,
        actiontyper.SYKMELDING_AVBRUTT,
        actiontyper.SYKMELDING_GJENAAPNET,
        actiontyper.BEKREFT_SYKMELDING_ANGRET,
    ], hentArbeidsgiversSykmeldinger);
}

export default function* arbeidsgiversSykmeldingerSagas() {
    yield fork(watchHentArbeidsgiversSykmeldinger);
}
