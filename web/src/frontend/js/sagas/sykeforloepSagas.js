import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, log } from 'digisyfo-npm';
import * as actions from '../actions/sykeforloep_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentStartdato() {
    yield put(actions.henterStartdato());
    try {
        const respons = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/tidslinje/startdato`);
        yield put(actions.startdatoHentet(respons.startdato));
    } catch (e) {
        log(e);
        yield put(actions.hentStartdatoFeilet());
    }
}

function* watchHentStartdato() {
    yield* takeEvery(actiontyper.HENT_SYKEFORLOEP_STARTDATO_FORESPURT, hentStartdato);
}

export default function* sykeforloepSagas() {
    yield fork(watchHentStartdato);
}
