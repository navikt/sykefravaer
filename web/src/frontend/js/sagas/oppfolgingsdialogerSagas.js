import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { log } from 'digisyfo-npm';
import * as actions from '../actions/oppfolgingsdialoger_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentOppfolgingsdialoger(action) {
    yield put(actions.henterOppfolgingsdialoger(action.enhet));
    try {
        const data = yield call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/sykmeldt/oppfolgingsdialoger`);
        yield put(actions.oppfolgingsdialogerHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentOppfolgingsdialogerFeilet());
    }
}


function* watchHentOppfolgingsdialoger() {
    yield* takeEvery(actiontyper.HENT_OPPFOLGINGSDIALOGER_FORESPURT, hentOppfolgingsdialoger);
}

export default function* oppfolgingsdialogerSagas() {
    yield [
        fork(watchHentOppfolgingsdialoger),
    ];
}
