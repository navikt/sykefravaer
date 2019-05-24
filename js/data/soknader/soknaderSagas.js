import { call, fork, put, select, takeEvery, all } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get, hentApiUrl } from '../gateway-api/index';
import * as actions from './soknaderActions';
import { soknadrespons } from '../../../test/mock/mockSoknadSelvstendig';
import { toggleBrukMockDataSelvstendigSoknad } from '../../toggles';
import logger from '../../logging';
import { skalHenteSoknader, skalHenteSoknaderHvisIkkeHenter } from './soknaderSelectors';
import { MANGLER_OIDC_TOKEN } from '../../enums/exceptionMessages';
import {
    HENT_SOKNADER_FORESPURT,
} from './soknaderActiontyper';
import { SYKMELDING_BEKREFTET, SYKMELDING_SENDT } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';

export function* oppdaterSoknader() {
    yield put(actions.henterSoknader());
    try {
        const data = yield call(get, `${hentApiUrl()}/soknader`);
        yield put(actions.soknaderHentet(data));
    } catch (e) {
        log(e);
        if (e.message === MANGLER_OIDC_TOKEN) {
            yield put(actions.henterSoknader());
        } else if (toggleBrukMockDataSelvstendigSoknad()) {
            yield put(actions.soknaderHentet(soknadrespons));
        } else {
            logger.error(`Kunne ikke hente soknader fra syfosoknad. URL: ${window.location.href} - ${e.message}`);
            yield put(actions.hentSoknaderFeilet());
        }
    }
}

export function* hentSoknaderHvisIkkeHentet() {
    const skalHente = yield select(skalHenteSoknader);
    if (skalHente) {
        yield oppdaterSoknader();
    }
}

export function* oppdaterSoknaderHvisIkkeHenter() {
    const skalHente = yield select(skalHenteSoknaderHvisIkkeHenter);
    if (skalHente) {
        yield oppdaterSoknader();
    }
}

function* watchHentSoknader() {
    yield takeEvery(HENT_SOKNADER_FORESPURT, hentSoknaderHvisIkkeHentet);
}

function* watchOppdaterSoknader() {
    yield takeEvery([
        SYKMELDING_BEKREFTET,
        SYKMELDING_SENDT,
    ], oppdaterSoknader);
}

export default function* soknaderSagas() {
    yield all([
        fork(watchHentSoknader),
        fork(watchOppdaterSoknader),
    ]);
}
