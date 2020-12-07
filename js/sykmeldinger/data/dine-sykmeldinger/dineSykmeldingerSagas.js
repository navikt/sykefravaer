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
import { toggleSykmeldingerBackend, unleashtogglesHentetSelector } from '../../../data/unleash-toggles/unleashTogglesSelectors';
import { HENTET_UNLEASH_TOGGLES } from '../../../data/unleash-toggles/unleashToggles_actions';
import { erNaisLabsDemo } from '../../../utils/urlUtils';

const { HENT_DINE_SYKMELDINGER_FORESPURT } = actions;

// Because envvars can not easily be injected in build
const getSykmeldingerBackendUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://sykmeldinger-backend-proxy.nav.no/api/v1/syforest';
    }
    if (url.indexOf('localhost:2027') > -1) {
        return 'http://localhost:6998/api/v1/syforest';
    }
    if (url.indexOf('localhost:2028') > -1) {
        return 'http://localhost:6998/api/v1/syforest';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/sykmeldinger-backend';
    }
    // Preprod
    return 'https://sykmeldinger-backend-proxy.dev.nav.no/api/v1/syforest';
};

export function* oppdaterDineSykmeldinger() {
    const togglesHentet = yield select(unleashtogglesHentetSelector);
    const toggleNewUrl = yield select(toggleSykmeldingerBackend);

    if (togglesHentet) {
        yield put(actions.henterDineSykmeldinger());
        const URL = toggleNewUrl ? `${getSykmeldingerBackendUrl()}` : `${process.env.REACT_APP_SYFOREST_ROOT}`;
        try {
            const data = yield call(get, `${URL}/sykmeldinger`);
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
        HENTET_UNLEASH_TOGGLES,
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
