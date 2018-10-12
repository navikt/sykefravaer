import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import { svarActions, actiontyper } from 'moter-npm';

export function* sendSvar(action) {
    yield put(svarActions.senderSvar());
    try {
        yield call(post, `${window.APP_SETTINGS.MOTEREST_ROOT}/v2/moter/actions/${action.moteUuid}/send`, {
            valgteAlternativIder: action.data,
            deltakertype: action.deltakertype,
        });
        const a = svarActions.svarSendt(action.data, action.deltakertype);
        yield put(a);
    } catch (e) {
        log(e);
        yield put(svarActions.sendSvarFeilet());
    }
}

function* watchSendSvar() {
    yield takeEvery(actiontyper.SEND_SVAR_FORESPURT, sendSvar);
}

export default function* svarSagas() {
    yield fork(watchSendSvar);
}
