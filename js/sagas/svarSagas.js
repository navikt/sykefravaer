import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../actions/moter_actions';

export function* sendSvar(action) {
    yield put(actions.senderSvar());
    try {
        yield call(post, `${process.env.REACT_APP_MOTEREST_ROOT}/api/v2/moter/actions/${action.moteUuid}/send`, {
            valgteAlternativIder: action.data,
            deltakertype: action.deltakertype,
        });
        const a = actions.svarSendt(action.data, action.deltakertype);
        yield put(a);
    } catch (e) {
        log(e);
        yield put(actions.sendSvarFeilet());
    }
}

function* watchSendSvar() {
    yield takeEvery(actions.SEND_SVAR_FORESPURT, sendSvar);
}

export default function* svarSagas() {
    yield fork(watchSendSvar);
}
