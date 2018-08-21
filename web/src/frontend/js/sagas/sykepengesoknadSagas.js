import { call, put, fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post, log } from 'digisyfo-npm';
import { browserHistory } from 'react-router';
import * as actions from '../actions/sykepengesoknader_actions';
import * as actiontyper from '../actions/actiontyper';
import history from '../history';
import { finnSoknad } from '../reducers/sykepengesoknader';
import logger from '../logging';

const gaTilKvittering = (sykepengesoknadsId) => {
    browserHistory.push(`/sykefravaer/soknader/${sykepengesoknadsId}/kvittering`);
};

export function* hentSykepengesoknader() {
    yield put(actions.henterSykepengesoknader());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/soknader`);
        yield put(actions.sykepengesoknaderHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente sykepengesoknader. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.hentSykepengesoknaderFeilet());
    }
}

export function* sendSykepengesoknad(action) {
    yield put(actions.senderSykepengesoknad());
    try {
        const sykepengesoknad = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknad.id}/actions/send`, action.sykepengesoknad);
        yield put(actions.sykepengesoknadSendt(action.sykepengesoknad.id, sykepengesoknad));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke sende sykepengesøknad. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.sendSykepengesoknadFeilet());
    }
}

export function* sendSykepengesoknadTilArbeidsgiver(action) {
    yield put(actions.senderSykepengesoknad());
    try {
        const sykepengesoknad = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknadsId}/actions/send-til-arbeidsgiver`);
        yield put(actions.sykepengesoknadSendtTilArbeidsgiver(action.sykepengesoknadsId, sykepengesoknad));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke sende sykepengesøknad til arbeidsgiver. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.sendSykepengesoknadFeilet());
    }
}

export function* sendSykepengesoknadTilNAV(action) {
    yield put(actions.senderSykepengesoknad());
    try {
        const sykepengesoknad = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknadsId}/actions/send-til-nav`);
        yield put(actions.sykepengesoknadSendtTilNAV(action.sykepengesoknadsId, sykepengesoknad));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke sende sykepengesøknad til NAV. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.sendSykepengesoknadFeilet());
    }
}

export function* startEndring(action) {
    try {
        const sykepengesoknad = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknadsId}/actions/korriger`);
        yield put(actions.endringStartet(sykepengesoknad));
        yield history.push(`/sykefravaer/soknader/${sykepengesoknad.id}`);
    } catch (e) {
        log(e);
        yield put(actions.startEndringFeilet());
    }
}

export function* hentBerikelse(action) {
    const soknad = yield select(finnSoknad, action.sykepengesoknadsId);
    if (!soknad.id) {
        yield call(hentSykepengesoknader);
    }

    yield put(actions.henterBerikelse());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknadsId}/berik`);
        yield put(actions.berikelseHentet(data, action.sykepengesoknadsId));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente berikelse av søknaden. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.hentBerikelseFeilet());
    }
}

export function* avbrytSoknad(action) {
    yield put(actions.avbryterSoknad());
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknadsId}/actions/avbryt`);
        yield put(actions.soknadAvbrutt(action.sykepengesoknadsId));
        gaTilKvittering(action.sykepengesoknadsId);
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke avbryte søknad. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.avbrytSoknadFeilet());
    }
}

export function* gjenapneSoknad(action) {
    yield put(actions.gjenapnerSoknad());
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknadsId}/actions/gjenapne`);
        yield put(actions.soknadGjenapnet(action.sykepengesoknadsId));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke gjenåpne søknad. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.gjenapneSoknadFeilet());
    }
}

function* watchHentBerikelse() {
    yield* takeEvery(actiontyper.SYKEPENGESOKNAD_BERIKELSE_FORESPURT, hentBerikelse);
}

function* watchHentSykepengesoknader() {
    yield* takeEvery(actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT, hentSykepengesoknader);
}

function* watchSendSykepengesoknad() {
    yield* takeEvery(actiontyper.SEND_SYKEPENGESOKNAD_FORESPURT, sendSykepengesoknad);
}

function* watchSendSykepengesoknadTilNAV() {
    yield* takeEvery(actiontyper.SEND_SYKEPENGESOKNAD_TIL_NAV_FORESPURT, sendSykepengesoknadTilNAV);
}

function* watchSendSykepengesoknadTilArbeidsgiver() {
    yield* takeEvery(actiontyper.SEND_SYKEPENGESOKNAD_TIL_ARBEIDSGIVER_FORESPURT, sendSykepengesoknadTilArbeidsgiver);
}

function* watchSykmeldingSendt() {
    yield* takeEvery(actiontyper.SYKMELDING_SENDT, hentSykepengesoknader);
}

function* watchEndreSykepengesoknad() {
    yield* takeEvery(actiontyper.START_ENDRING_SYKEPENGESOKNAD_FORESPURT, startEndring);
}

function* watchAvbrytSoknad() {
    yield* takeEvery(actiontyper.AVBRYT_SOKNAD_FORESPURT, avbrytSoknad);
}

function* watchGjenapneSoknad() {
    yield* takeEvery(actiontyper.GJENAPNE_SOKNAD_FORESPURT, gjenapneSoknad);
}

export default function* sykepengesoknadSagas() {
    yield [
        fork(watchHentSykepengesoknader),
        fork(watchSendSykepengesoknad),
        fork(watchSykmeldingSendt),
        fork(watchSendSykepengesoknadTilNAV),
        fork(watchSendSykepengesoknadTilArbeidsgiver),
        fork(watchEndreSykepengesoknad),
        fork(watchHentBerikelse),
        fork(watchAvbrytSoknad),
        fork(watchGjenapneSoknad),
    ];
}
