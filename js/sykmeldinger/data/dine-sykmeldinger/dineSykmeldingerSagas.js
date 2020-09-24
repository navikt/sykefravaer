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
import { toggleSykmeldingerBackend } from '../../../data/unleash-toggles/unleashTogglesSelectors';
import { HENTET_UNLEASH_TOGGLES, unleashTogglesHentet } from '../../../data/unleash-toggles/unleashToggles_actions';

const { HENT_DINE_SYKMELDINGER_FORESPURT } = actions;

export const hentSykmeldingerBackendUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://sykmeldinger-backend-proxy.nav.no';
    }
    if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
        // Lokalt
        return '/sykmeldinger-backend';
    }
    // Preprod
    return 'https://sykmeldinger-backend-proxy.dev.nav.no';
};

export function* oppdaterDineSykmeldinger() {
    const toggle = yield select(toggleSykmeldingerBackend);
    const toggleHentet = yield select(unleashTogglesHentet);
    if (toggle && toggleHentet) {
        yield put(actions.henterDineSykmeldinger());
        try {
            const dineSykmeldingerUrl = toggle
                ? `${hentSykmeldingerBackendUrl()}/api/v1/syforest/sykmeldinger`
                : `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger`;
            const data = yield call(get, dineSykmeldingerUrl);
            yield put(actions.setDineSykmeldinger(data));
        } catch (e) {
            log(e);
            yield put(actions.hentDineSykmeldingerFeilet());
        }
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
    yield takeEvery([HENT_DINE_SYKMELDINGER_FORESPURT, HENTET_UNLEASH_TOGGLES], hentDineSykmeldingerHvisIkkeHentet);
}

export default function* dineSykmeldingerSagas() {
    yield all([
        fork(watchOppdaterDineSykmeldinger),
        fork(watchHentDineSykmeldinger),
    ]);
}
