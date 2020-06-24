import {
    all, call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './dineSykmeldingerActions';
import { selectSkalHenteDineSykmeldinger } from './dineSykmeldingerSelectors';
import {
    BEKREFT_SYKMELDING_ANGRET,
    SYKMELDING_AVBRUTT,
    SYKMELDING_BEKREFTET,
    SYKMELDING_GJENAAPNET,
    SYKMELDING_SENDT,
} from '../din-sykmelding/dinSykmeldingActions';

const { HENT_DINE_SYKMELDINGER_FORESPURT } = actions;

export const hentSykmeldingerBackendUrl = (brukNginxProxy) => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (!brukNginxProxy) {
        if (url.indexOf('tjenester.nav') > -1) {
            // Prod
            return 'https://syfosmregisterproxy.nav.no';
        }
        // Preprod
        return 'https://syfosmregisterproxy-q.nav.no';
    }

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://sykmeldinger-backendproxy.nav.no';
    }
    if (url.indexOf('localhost:2027') > -1) {
        // docker compose
        return 'http://localhost:2042/api';
    }
    if (url.indexOf('localhost:2028') > -1) {
        // docker compose
        return 'http://localhost:2043/api';
    }
    if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
        // Lokalt
        return '/sykmeldingerBackend';
    }
    // Preprod
    return 'https://sykmeldinger-backendproxy-q.nav.no';
};

export function* oppdaterDineSykmeldinger() {
    yield put(actions.henterDineSykmeldinger());
    try {
        const data = yield call(get, `${hentSykmeldingerBackendUrl(true)}/api/v1/syforest/sykmeldinger`);
        yield put(actions.setDineSykmeldinger(data));
    } catch (e) {
        log(e);
        yield put(actions.hentDineSykmeldingerFeilet());
    }
}

export function* hentDineSykmeldingerHvisIkkeHentet() {
    const skalHente = yield select(selectSkalHenteDineSykmeldinger);
    if (skalHente) {
        yield oppdaterDineSykmeldinger();
    }
}

function* watchOppdaterDineSykmeldinger() {
    yield takeEvery([
        SYKMELDING_BEKREFTET,
        SYKMELDING_SENDT,
        SYKMELDING_AVBRUTT,
        SYKMELDING_GJENAAPNET,
        BEKREFT_SYKMELDING_ANGRET,
    ], oppdaterDineSykmeldinger);
}

function* watchHentDineSykmeldinger() {
    yield takeEvery(HENT_DINE_SYKMELDINGER_FORESPURT, hentDineSykmeldingerHvisIkkeHentet);
}

export default function* dineSykmeldingerSagas() {
    yield all([
        fork(watchOppdaterDineSykmeldinger),
        fork(watchHentDineSykmeldinger),
    ]);
}
