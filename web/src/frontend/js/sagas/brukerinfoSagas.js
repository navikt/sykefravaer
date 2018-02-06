import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, getAjax, log } from 'digisyfo-npm';
import * as actions from '../actions/brukerinfo_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentBrukerinfo() {
    yield put(actions.henterBrukerinfo());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/informasjon/bruker`);
        yield put(actions.setBrukerinfo(data));
    } catch (e) {
        log(e);
        yield put(actions.hentBrukerinfoFeilet());
    }
}

export function* sjekkInnlogging() {
    yield put(actions.sjekkerInnlogging());
    try {
        yield call(getAjax, '/sykefravaer/');
        yield put(actions.setErInnlogget());
    } catch (e) {
        log(e);
        yield put(actions.setErUtlogget());
    }
}

function* watchHentBrukerinfo() {
    yield* takeEvery(actiontyper.HENT_BRUKERINFO_FORESPURT, hentBrukerinfo);
}

function* watchSjekkInnlogging() {
    yield* takeEvery(actiontyper.SJEKK_INNLOGGING_FORESPURT, sjekkInnlogging);
}

export default function* brukerinfoSagas() {
    yield [
        fork(watchHentBrukerinfo),
        fork(watchSjekkInnlogging),
    ];
}
