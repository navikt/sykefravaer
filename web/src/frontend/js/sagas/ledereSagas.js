import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get, post } from '../api';
import { log } from 'digisyfo-npm';
import * as actions from '../actions/ledere_actions';

export function* hentLedere() {
    yield put(actions.henterLedere());
    try {
        const data = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/naermesteledere`);
        yield put(actions.ledereHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentLedereFeilet());
    }
}

export function* avkreftLeder(action) {
    yield put(actions.avkreftLeder(action.orgnummer));
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/naermesteledere/${action.orgnummer}/actions/avkreft`);
        yield put(actions.lederAvkreftet(action.orgnummer));
    } catch (e) {
        log(e);
        yield put(actions.avkreftLederFeilet());
    }
}

function* watchHentLedere() {
    yield* takeEvery('HENT_LEDERE_FORESPURT', hentLedere);
}

function* watchAvkreftLeder() {
    yield* takeEvery('AVKREFT_LEDER_FORESPURT', avkreftLeder);
}

export default function* ledereSagas() {
    yield fork(watchHentLedere);
    yield fork(watchAvkreftLeder);
}
