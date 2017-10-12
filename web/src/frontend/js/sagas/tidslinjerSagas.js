import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { apneHendelser, log } from 'digisyfo-npm';
import { get } from '../api';
import * as actions from '../actions/tidslinjer_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentTidslinjer(action) {
    yield put(actions.henterTidslinjer());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/tidslinje?type=${action.arbeidssituasjon}`);
        yield put(actions.setTidslinjer(data, action.arbeidssituasjon));
        if (action.apneHendelseIder.length) {
            yield put(apneHendelser(action.apneHendelseIder));
        }
    } catch (e) {
        log(e);
        yield put(actions.hentTidslinjerFeilet());
    }
}

function* watchHentTidslinjer() {
    yield* takeEvery(actiontyper.HENT_TIDSLINJER_FORESPURT, hentTidslinjer);
}

export default function* tidslinjerSagas() {
    yield fork(watchHentTidslinjer);
}
