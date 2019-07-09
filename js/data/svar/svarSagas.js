import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { API_NAVN, hentSyfoApiUrl, post } from '../gateway-api/gatewayApi';
import { SEND_SVAR_FORESPURT, senderSvar, sendSvarFeilet, svarSendt } from './svar_actions';

export function* sendSvar(action) {
    yield put(senderSvar());
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/moter/${action.moteUuid}/send`;
        yield call(post, url, {
            valgteAlternativIder: action.data,
            deltakertype: action.deltakertype,
        });
        const a = svarSendt(action.data, action.deltakertype);
        yield put(a);
    } catch (e) {
        log(e);
        yield put(sendSvarFeilet());
    }
}

function* watchSendSvar() {
    yield takeEvery(SEND_SVAR_FORESPURT, sendSvar);
}

export default function* svarSagas() {
    yield fork(watchSendSvar);
}
