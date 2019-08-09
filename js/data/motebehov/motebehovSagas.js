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
} from '../gateway-api/gatewayApi';
import * as actions from './motebehov_actions';
import { skalHenteMotebehov } from './motebehovSelectors';

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

function* watchHentMotebehov() {
    yield takeEvery(actions.HENT_MOTEBEHOV_FORESPURT, hentMotebehovHvisIkkeHentet);
}

export default function* motebehovSagas() {
    yield all([
        fork(watchHentMotebehov),
    ]);
}
