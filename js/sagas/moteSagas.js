import {
    call,
    put,
    fork,
    takeEvery,
    select,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import * as actions from '../actions/moter_actions';
import { skalHenteMote } from '../selectors/moteSelectors';
import {
    API_NAVN,
    hentSyfoApiUrl,
    get,
} from '../gateway-api/gatewayApi';

export function* hentMote() {
    yield put(actions.henterMote());
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOMOTEADMIN)}/bruker/arbeidstaker/moter/siste`;
        const mote = yield call(get, url);
        yield put(actions.moteHentet(mote));
    } catch (e) {
        if (e.message === '404') {
            yield put(actions.moteIkkeFunnet());
        } else {
            log(e);
            yield put(actions.hentMoteFeilet());
        }
    }
}

export function* hentMoteHvisIkkeHentet() {
    const skalHente = yield select(skalHenteMote);
    if (skalHente) {
        yield hentMote();
    }
}

function* watchHentMote() {
    yield takeEvery(actions.HENT_MOTE_FORESPURT, hentMoteHvisIkkeHentet);
}

export default function* svarSagas() {
    yield fork(watchHentMote);
}
