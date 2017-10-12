import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/hendelser_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentHendelser() {
    yield put(actions.henterHendelser());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/informasjon/hendelser`);
        yield put(actions.hendelserHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentHendelserFeilet());
    }
}

function* watchHentHendelser() {
    yield* takeEvery(actiontyper.HENT_HENDELSER_FORESPURT, hentHendelser);
}

function* watchAktivitetskravBekreftet() {
    yield* takeEvery(actiontyper.AKTIVITETSKRAV_BEKREFTET, hentHendelser);
}

export default function* hendelserSagas() {
    yield [
        fork(watchHentHendelser),
        fork(watchAktivitetskravBekreftet),
    ];
}
