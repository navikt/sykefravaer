import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post } from '../api';
import { svarActions, actiontyper } from 'moter-npm';
import { log } from 'digisyfo-npm';

export function* sendSvar(action) {
    yield put(svarActions.senderSvar());
    try {
        const svar = yield call(post, `${window.APP_SETTINGS.MOTEREST_ROOT}/v2/moter/actions/${action.moteUuid}/send`, action.data);
        yield put(svarActions.svarSendt(action.data, action.deltakertype, svar.svartidspunkt));
    } catch (e) {
        log(e);
        yield put(svarActions.sendSvarFeilet());
    }
}

function* watchSendSvar() {
    yield* takeEvery(actiontyper.SEND_SVAR_FORESPURT, sendSvar);
}

export default function* svarSagas() {
    yield fork(watchSendSvar);
}
