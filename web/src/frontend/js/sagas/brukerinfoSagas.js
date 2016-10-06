import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, getAjax } from '../api';

export function* hentBrukerinfo() {
    yield put({ type: 'HENTER_BRUKERINFO' });
    try {
        const data = yield call(get, `${window.SYFO_SETTINGS.REST_ROOT}/informasjon/bruker`);
        yield put({ type: 'SET_BRUKERINFO', data });
    } catch (e) {
        yield put({ type: 'HENT_BRUKERINFO_FEILET' });
    }
}

export function* sjekkInnlogging() {
    yield put({ type: 'SJEKKER_INNLOGGING' });
    try {
        const data = yield call(getAjax, '/sykefravaer/');
        yield put({ type: 'BRUKER_ER_INNLOGGET'})
    } catch (e) {
        yield put({ type: 'BRUKER_ER_UTLOGGET'})
    }
}

function* watchHentBrukerinfo() {
    yield* takeEvery('HENT_BRUKERINFO_FORESPURT', hentBrukerinfo);
}

function* watchSjekkInnlogging() {
    yield* takeEvery('SJEKK_INNLOGGING_FORESPURT', sjekkInnlogging);
}

export default function* brukerinfoSagas() {
    yield [
        fork(watchHentBrukerinfo),
        fork(watchSjekkInnlogging)
    ]
}
