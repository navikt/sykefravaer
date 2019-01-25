import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import * as actions from '../actions/moter_actions';
import {
    API_NAVN,
    hentSyfoApiUrl,
    post,
} from '../gateway-api/gatewayApi';

export function* sendSvar(action) {
    yield put(actions.senderSvar());
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/moter/${action.moteUuid}/send`;
        yield call(post, url, {
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
