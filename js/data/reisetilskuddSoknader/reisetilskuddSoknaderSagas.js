import {
    all, call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './reisetilskuddSoknader_actions';
import logger from '../../logging';
import { skalHenteReisetilskuddSoknader } from './reisetilskuddSoknaderSelectors';
import { hentReisetilskuddBackendUrl } from '../gateway-api';

export function* oppdaterReisetilskuddSoknader() {
    yield put(actions.henterReisetilskuddSoknader());
    try {
        const data = yield call(get, `${hentReisetilskuddBackendUrl()}`);
        yield put(actions.reisetilskuddSoknaderHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente reisetilskuddSoknader. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.hentReisetilskuddSoknaderFeilet());
    }
}

export function* hentReisetilskuddSoknaderHvisIkkeHentet() {
    const skalHente = yield select(skalHenteReisetilskuddSoknader);
    if (skalHente) {
        yield oppdaterReisetilskuddSoknader();
    }
}


function* watchHentReisetilskuddSoknader() {
    yield takeEvery(actions.HENT_REISETILSKUDDSOKNADER_FORESPURT, hentReisetilskuddSoknaderHvisIkkeHentet);
}

function* watchOppdaterReisetilskuddSoknader() {
    yield takeEvery([
        actions.HENT_REISETILSKUDDSOKNADER_FORESPURT,
    ], oppdaterReisetilskuddSoknader);
}

export default function* reisetilskuddSoknaderSagas() {
    yield all([
        fork(watchHentReisetilskuddSoknader),
        fork(watchOppdaterReisetilskuddSoknader),
    ]);
}
