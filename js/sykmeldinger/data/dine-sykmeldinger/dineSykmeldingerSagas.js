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

const { HENT_DINE_SYKMELDINGER_FORESPURT } = actions;

export function* oppdaterDineSykmeldinger() {
    const togglesHentet = yield select(unleashtogglesHentetSelector);
    const toggleNewUrl = yield select(toggleSykmeldingerBackend);

    if (togglesHentet) {
        yield put(actions.henterDineSykmeldinger());
        const URL = toggleNewUrl ? `${process.env.REACT_APP_SYKMELDINGER_BACKEND}` : `${process.env.REACT_APP_SYFOREST_ROOT}`;
        if (toggleNewUrl) {
            console.log('Sykmeldinger hentes fra ny url');
        }

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
