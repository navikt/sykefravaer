import {
    call, fork, put, takeEvery,
} from 'redux-saga/effects';
import * as actions from './unleashToggles_actions';
import { post } from '../gateway-api/index';
import * as toggles from '../../enums/unleashToggles';
import { erDevGcp, erFlexDockerCompose } from '../../utils/urlUtils';

function hentUnleashUrl() {
    if (erFlexDockerCompose()) {
        return 'http://localhost:1956/syfounleash';
    }
    if (erDevGcp()) {
        return 'https://syfounleash.dev.nav.no/syfounleash';
    }
    return '/syfounleash/';
}

export function* hentUnleashToggles() {
    yield put(actions.henterUnleashToggles());
    try {
        const data = yield call(post, hentUnleashUrl(), Object.values(toggles));
        yield put(actions.unleashTogglesHentet(data));
    } catch (e) {
        yield put(actions.hentUnleashTogglesFeilet());
    }
}

function* watchHentUnleashToggles() {
    yield takeEvery(actions.HENT_UNLEASH_TOGGLES_FORESPURT, hentUnleashToggles);
}

export default function* unleashTogglesSagas() {
    yield fork(watchHentUnleashToggles);
}
