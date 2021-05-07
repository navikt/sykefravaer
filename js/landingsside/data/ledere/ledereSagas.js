import {
    all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { get, log, post } from '../../../digisyfoNpm';
import * as actions from './ledereActions';
import { erFlexDockerCompose, erNaisLabsDemo } from '../../../utils/urlUtils';

const { AVKREFT_LEDER_FORESPURT, HENT_LEDERE_FORESPURT } = actions;

// Because envvars can not easily be injected in build
export const getNarmesteLederUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://narmesteleder.nav.no';
    }
    if (erFlexDockerCompose()) {
        return 'http://localhost:6998/api/v1/syforest';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/narmesteleder';
    }
    // Preprod
    return 'https://narmesteleder.dev.nav.no';
};

export function* hentLedere() {
    const url = getNarmesteLederUrl();
    yield put(actions.henterLedere());
    try {
        const data = yield call(get, `${url}/syforest/narmesteledere`);
        yield put(actions.ledereHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentLedereFeilet());
    }
}

export function* avkreftLeder(action) {
    const url = getNarmesteLederUrl();
    yield put(actions.avkrefterLeder(action.orgnummer));
    try {
        yield call(post, `${url}/${action.orgnummer}/avkreft`);
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
