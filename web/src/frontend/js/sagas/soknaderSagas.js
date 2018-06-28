import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post, log } from 'digisyfo-npm';
import { browserHistory } from 'react-router';
import * as actions from '../actions/soknader_actions';
import {
    HENT_SOKNADER_FORESPURT, SEND_SOKNAD_FORESPURT, SYKMELDING_SENDT,
} from '../actions/actiontyper';
import mockSoknader from '../../test/mockSoknader';
import { toggleInnsendingAvSelvstendigSoknad, toggleSelvstendigSoknad } from '../toggles';

const gaTilKvittering = (soknadId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadId}/kvittering`);
};

export function* hentSoknader() {
    if (toggleSelvstendigSoknad()) {
        yield put(actions.henterSoknader());
        try {
            const data = yield call(get, '/syfosoknad/soknader');
            yield put(actions.soknaderHentet(data));
        } catch (e) {
            log(e);
            yield put(actions.soknaderHentet(mockSoknader));
        }
    } else {
        yield put(actions.soknaderHentet([]));
    }
}

export function* sendSoknad(action) {
    yield put(actions.senderSoknad(action.soknadId));
    try {
        if (toggleInnsendingAvSelvstendigSoknad()) {
            yield call(post, '/syfosoknad/sendSoknad', action.soknad);
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
    yield* takeEvery(SYKMELDING_SENDT, hentSoknader);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
    yield fork(watchSendSoknad);
    yield fork(watchSykmeldingSendt);
}
