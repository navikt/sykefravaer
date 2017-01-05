import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post } from '../api';
import { svarActions, actiontyper } from 'moter-npm';

export function* sendSvar(action) {
    yield put(svarActions.senderSvar());
    try {
        const svar = yield call(post, `${window.APP_SETTINGS.MOTEREST_ROOT}/moter/${action.id}`, action.data);
        yield put(svarActions.svarSendt(action.data, svar.svarTidspunkt));
    } catch (e) {
        yield put(svarActions.sendSvarFeilet());
    }
}

function* watchSendSvar() {
    yield* takeEvery(actiontyper.SEND_SVAR_FORESPURT, sendSvar);
}

export default function* svarSagas() {
    yield fork(watchSendSvar);
}
