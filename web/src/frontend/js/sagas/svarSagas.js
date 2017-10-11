import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { svarActions, actiontyper, lagJsDate } from 'moter-npm';
import { post } from '../api';

export function* sendSvar(action) {
    yield put(svarActions.senderSvar());
    try {
        const svar = yield call(post, `${window.APP_SETTINGS.MOTEREST_ROOT}/v2/moter/actions/${action.moteUuid}/send`, {
            valgteAlternativIder: action.data,
            deltakertype: action.deltakertype,
        });
        const a = svarActions.svarSendt(action.data, action.deltakertype, lagJsDate(svar.svartidspunkt));
        yield put(a);
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
