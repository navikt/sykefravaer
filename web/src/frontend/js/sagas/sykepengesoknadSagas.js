import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post } from '../api';
import * as actions from '../actions/sykepengesoknad_actions';
import { log } from 'digisyfo-npm';

export function* hentSykepengesoknader() {
    yield put(actions.henterSykepengesoknader());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/sykepengesoknad`);
        yield put(actions.setSykepengesoknader(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykepengesoknaderFeilet());
    }
}

export function* sendSykepengesoknad(action) {
    yield put({ type: 'SENDER_SYKEPENGESOKNAD' });
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykepengesoknad/actions/send/${action.soknad.id}`)
        yield put(actions.sykepengesoknadSendt(action.soknad.id));
    } catch (e) {
        yield put(actions.sendSykepengesoknadFeilet());
    }
}


function* watchHentSykepengesoknader() {
    yield* takeEvery('HENT_SYKEPENGESOKNADER_FORESPURT', hentSykepengesoknader)
}

function* watchSendSykepengesoknad() {
    yield* takeEvery('SEND_SYKEPENGESOKNAD_FORESPURT', sendSykepengesoknad)
}

export default function* sykepengesoknadSagas() {
    yield [
        fork(watchHentSykepengesoknader),
        fork(watchSendSykepengesoknad)
    ]
}
