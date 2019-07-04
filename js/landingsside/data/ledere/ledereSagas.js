import {
    all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { get, log, post } from '@navikt/digisyfo-npm';
import * as actions from './ledereActions';

const { AVKREFT_LEDER_FORESPURT, HENT_LEDERE_FORESPURT } = actions;

export function* hentLedere() {
    yield put(actions.henterLedere());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/naermesteledere`);
        yield put(actions.ledereHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentLedereFeilet());
    }
}

export function* avkreftLeder(action) {
    yield put(actions.avkrefterLeder(action.orgnummer));
    try {
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/naermesteledere/${action.orgnummer}/actions/avkreft`);
        yield put(actions.lederAvkreftet(action.orgnummer));
    } catch (e) {
        log(e);
        yield put(actions.avkreftLederFeilet());
    }
}

function* watchHentLedere() {
    yield takeEvery(HENT_LEDERE_FORESPURT, hentLedere);
}

function* watchAvkreftLeder() {
    yield takeEvery(AVKREFT_LEDER_FORESPURT, avkreftLeder);
}

export default function* ledereSagas() {
    yield all([
        fork(watchHentLedere),
        fork(watchAvkreftLeder),
    ]);
}
