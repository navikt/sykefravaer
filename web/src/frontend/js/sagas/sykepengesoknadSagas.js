import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post } from '../api';
import * as actions from '../actions/sykepengesoknader_actions';
import { log } from 'digisyfo-npm';

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
    yield put({ type: 'SENDER_SYKEPENGESOKNAD' });
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/actions/send/${action.sykepengesoknad.id}`);
        yield put(actions.sykepengesoknadSendt(action.sykepengesoknad.id));
    } catch (e) {
        yield put(actions.sendSykepengesoknadFeilet());
    }
}

function* watchHentSykepengesoknader() {
    yield* takeEvery('HENT_SYKEPENGESOKNADER_FORESPURT', hentSykepengesoknader);
}

function* watchSendSykepengesoknad() {
    yield* takeEvery('SEND_SYKEPENGESOKNAD_FORESPURT', sendSykepengesoknad);
}

function* watchSykmeldingSendt() {
    yield* takeEvery('SYKMELDING_SENDT', hentSykepengesoknader);
}

export default function* sykepengesoknadSagas() {
    yield [
        fork(watchHentSykepengesoknader),
        fork(watchSendSykepengesoknad),
        fork(watchSykmeldingSendt),
    ];
}
