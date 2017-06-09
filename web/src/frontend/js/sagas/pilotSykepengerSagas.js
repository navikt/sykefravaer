import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { log } from 'digisyfo-npm';
import * as actions from '../actions/pilot_actions.js';
import * as actiontyper from '../actions/actiontyper';

export function* hentPilotSykepenger(action) {
    yield put(actions.henterPilotSykepenger());
    try {
        const sykmeldingId = action.sykmeldingId;
        const erPilot = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/informasjon/sykepengepilot?sykmeldingId=${sykmeldingId}`);
        yield put(actions.pilotSykepengerHentet(erPilot, sykmeldingId));
    } catch (e) {
        log(e);
        yield put(actions.hentPilotSykepengerFeilet());
    }
}

function* watchHentPilotSykepenger() {
    yield* takeEvery(actiontyper.HENT_PILOT_SYKEPENGER_FORESPURT, hentPilotSykepenger);
}

export default function* pilotSykepengerSagas() {
    yield fork(watchHentPilotSykepenger);
}
