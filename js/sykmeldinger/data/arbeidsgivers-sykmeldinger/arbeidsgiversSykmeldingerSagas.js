import {
    call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '../../../digisyfoNpm';
import * as actions from './arbeidsgiversSykmeldingerActions';
import {
    BEKREFT_SYKMELDING_ANGRET,
    SYKMELDING_AVBRUTT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_GJENAAPNET,
    SYKMELDING_SENDT,
} from '../din-sykmelding/dinSykmeldingActions';
import { getSykmeldingerBackendUrl } from '../dine-sykmeldinger/dineSykmeldingerSagas';
import { getSyforestRoot } from '../../../utils/urlUtils';

const { HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT } = actions;

function arbeidsgiversSykmeldingerUrl() {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1 || url.indexOf('tjenester-q1.nav') > -1 || url.indexOf('about:blank') > -1) {
        // Bruker syforest i openam miljøene fortsatt. About:blank er i npm run test
        // Endepunktet returnerer sykmeldingene slik de ser ut for arbeidsgiver
        return `${getSyforestRoot()}/sykmeldinger?type=arbeidsgiver`;
    }
    // Ellers syforest format fra sykmeldinger backend
    return `${getSykmeldingerBackendUrl()}/sykmeldinger`;
}

export function* hentArbeidsgiversSykmeldinger() {
    yield put(actions.henterArbeidsgiversSykmeldinger());
    try {
        const data = yield call(get, arbeidsgiversSykmeldingerUrl());
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
