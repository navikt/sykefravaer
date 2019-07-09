import {
    call,
    put,
    fork,
    takeEvery,
    all,
    select,
} from 'redux-saga/effects';
import {
    log,
} from '@navikt/digisyfo-npm';
import {
    API_NAVN,
    hentSyfoApiUrl,
    get,
    post,
} from '../gateway-api/gatewayApi';
import * as actions from './motebehov_actions';
import { skalHenteMotebehov } from './motebehovSelectors';
import { input2RSLagreMotebehov } from '../../utils/motebehovUtils';

export function* hentMotebehov() {
    yield put(actions.hentMotebehovHenter());
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/motebehov?fnr=${''}&virksomhetsnummer=${''}`;
        const data = yield call(get, url);
        yield put(actions.hentMotebehovHentet(data));
    } catch (e) {
        log(e);
        if (e.message === '403') {
            yield put(actions.hentMotebehovForbudt());
            return;
        }
        yield put(actions.hentMotebehovFeilet());
    }
}

export function* hentMotebehovHvisIkkeHentet() {
    const skalHente = yield select(skalHenteMotebehov);
    if (skalHente) {
        yield hentMotebehov();
    }
}

export function* svarMotebehov(action) {
    const virksomhetsnummer = action.virksomhetsnummer;
    const body = input2RSLagreMotebehov(action.svar, action.virksomhetsnummer);
    yield put(actions.svarMotebehovSender(virksomhetsnummer));
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV)}/motebehov?fnr=${''}`;
        yield call(post, url, body);
        yield put(actions.svarMotebehovSendt(body, virksomhetsnummer));
    } catch (e) {
        log(e);
        yield put(actions.svarMotebehovFeilet(virksomhetsnummer));
    }
}

function* watchHentMotebehov() {
    yield takeEvery(actions.HENT_MOTEBEHOV_FORESPURT, hentMotebehovHvisIkkeHentet);
}

function* watchSvarMotebehov() {
    yield takeEvery(actions.SVAR_MOTEBEHOV_FORESPURT, svarMotebehov);
}

export default function* motebehovSagas() {
    yield all([
        fork(watchHentMotebehov),
        fork(watchSvarMotebehov),
    ]);
}
