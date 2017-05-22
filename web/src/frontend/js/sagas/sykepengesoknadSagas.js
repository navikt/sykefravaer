import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post } from '../api';
import * as actions from '../actions/sykepengesoknader_actions';
import { log } from 'digisyfo-npm';
import * as actiontyper from '../actions/actiontyper';

export function* hentSykepengesoknader() {
    yield put(actions.henterSykepengesoknader());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/soknader`);
        yield put(actions.sykepengesoknaderHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykepengesoknaderFeilet());
    }
}

export function* sendSykepengesoknad(action) {
    yield put(actions.senderSykepengesoknad());
    try {
        const sykepengesoknad = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknad.id}/actions/send`, action.sykepengesoknad);
        yield put(actions.sykepengesoknadSendt(action.sykepengesoknad.id, sykepengesoknad));
    } catch (e) {
        yield put(actions.sendSykepengesoknadFeilet());
    }
}

export function* sendSykepengesoknadTilArbeidsgiver(action) {
    yield put(actions.senderSykepengesoknad());
    try {
        const sykepengesoknad = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknadsId}/actions/send-til-arbeidsgiver`);
        yield put(actions.sykepengesoknadSendt(action.sykepengesoknadsId, sykepengesoknad));
    } catch (e) {
        yield put(actions.sendSykepengesoknadFeilet());
    }
}

function* watchHentSykepengesoknader() {
    yield* takeEvery(actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT, hentSykepengesoknader);
}

function* watchSendSykepengesoknad() {
    yield* takeEvery(actiontyper.SEND_SYKEPENGESOKNAD_FORESPURT, sendSykepengesoknad);
}

function* watchSykmeldingSendt() {
    yield* takeEvery(actiontyper.SYKMELDING_SENDT, hentSykepengesoknader);
}

export default function* sykepengesoknadSagas() {
    yield [
        fork(watchHentSykepengesoknader),
        fork(watchSendSykepengesoknad),
        fork(watchSykmeldingSendt),
    ];
}
