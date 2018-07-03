import { call, fork, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { browserHistory } from 'react-router';
import { get, post, hentApiUrl } from '../gateway-api';
import * as actions from '../actions/soknader_actions';
import { HENT_SOKNADER_FORESPURT, SEND_SOKNAD_FORESPURT, SYKMELDING_BEKREFTET } from '../actions/actiontyper';
import { toggleInnsendingAvSelvstendigSoknad, toggleSelvstendigSoknad } from '../toggles';

const gaTilKvittering = (soknadId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadId}/kvittering`);
};

export function* hentSoknader() {
    if (toggleSelvstendigSoknad()) {
        yield put(actions.henterSoknader());
        try {
            const data = yield call(get, `${hentApiUrl()}/soknader`);
            yield put(actions.soknaderHentet(data));
        } catch (e) {
            log(e);
            yield put(actions.hentSoknaderFeilet());
        }
    } else {
        yield put(actions.soknaderHentet([]));
    }
}

export function* sendSoknad(action) {
    yield put(actions.senderSoknad(action.soknadId));
    try {
        if (toggleInnsendingAvSelvstendigSoknad()) {
            yield call(post, `${hentApiUrl()}/sendSoknad`, action.soknad);
        }
        yield put(actions.soknadSendt(action.soknad));
        gaTilKvittering(action.soknad.id);
    } catch (e) {
        log(e);
        yield put(actions.sendSoknadFeilet());
    }
}

function* watchHentSoknader() {
    yield* takeEvery(HENT_SOKNADER_FORESPURT, hentSoknader);
}

function* watchSendSoknad() {
    yield* takeEvery(SEND_SOKNAD_FORESPURT, sendSoknad);
}

function* watchSykmeldingSendt() {
    yield* takeEvery(SYKMELDING_BEKREFTET, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
    yield fork(watchSendSoknad);
    yield fork(watchSykmeldingSendt);
}
