import { call, fork, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { browserHistory } from 'react-router';
import { initialize } from 'redux-form';
import { get, hentApiUrl, post } from '../gateway-api';
import * as actions from '../actions/soknader_actions';
import {
    AVBRYT_SYKEPENGESOKNAD_FORESPURT,
    HENT_SOKNADER_FORESPURT,
    OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT,
    SEND_SOKNAD_FORESPURT,
    SOKNAD_ENDRET,
    SYKMELDING_BEKREFTET,
} from '../actions/actiontyper';
import { soknadrespons, soknadUtland1 } from '../../test/mockSoknader';
import { toggleBrukMockDataSelvstendigSoknad, toggleBrukMockdataUtland } from '../toggles';
import logger from '../logging';
import { OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../enums/soknadtyper';
import { hentSoknad } from '../selectors/soknaderSelectors';
import { populerSoknadMedSvarUtenKonvertertePerioder } from '../utils/soknad-felles/populerSoknadMedSvar';
import populerSkjemaverdier from '../utils/soknad-felles/populerSkjemaverdier';
import fraBackendsoknadTilInitiellSoknad from '../utils/soknad-felles/fraBackendsoknadTilInitiellSoknad';
import { hentSkjemaVerdier } from '../selectors/reduxFormSelectors';
import { getSkjemanavnFraSoknad } from '../utils/soknad-felles/getSkjemanavnFraSoknad';
import getContextRoot from '../utils/getContextRoot';

const gaTilKvittering = (soknadId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadId}/kvittering`);
};

export function* hentSoknader() {
    yield put(actions.henterSoknader());
    try {
        const data = yield call(get, `${hentApiUrl()}/soknader`);
        yield put(actions.soknaderHentet(data));
    } catch (e) {
        log(e);
        if (e.message === 'MANGLER_OIDC_TOKEN') {
            yield put(actions.henterSoknader());
        } else if (toggleBrukMockDataSelvstendigSoknad()) {
            yield put(actions.soknaderHentet(soknadrespons));
        } else {
            yield put(actions.hentSoknaderFeilet());
        }
    }
}

export function* sendSoknad(action) {
    try {
        if (action.soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE
            || action.soknad.soknadstype === OPPHOLD_UTLAND) {
            yield put(actions.senderSoknad(action.soknadId));
            yield call(post, `${hentApiUrl()}/sendSoknad`, action.soknad);
            yield put(actions.soknadSendt(action.soknad));
            gaTilKvittering(action.soknad.id);
        } else {
            log('Ukjent søknadstype - kan ikke sende.');
        }
    } catch (e) {
        log(e);
        yield put(actions.sendSoknadFeilet());
    }
}

export function* avbrytSoknad(action) {
    if (action.soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE
        || action.soknad.soknadstype === OPPHOLD_UTLAND) {
        try {
            yield put(actions.avbryterSoknad());
            yield call(post, `${hentApiUrl()}/avbrytSoknad`, action.soknad);
            yield put(actions.soknadAvbrutt(action.soknad));
            browserHistory.push(getContextRoot());
        } catch (e) {
            log(e);
            yield put(actions.avbrytSoknadFeilet());
        }
    }
}

export function* oppdaterSporsmal(action) {
    const soknad = yield select(hentSoknad, action.soknad);
    const skjemanavn = getSkjemanavnFraSoknad(action.soknad);
    const gamleVerdierISkjema = yield select(hentSkjemaVerdier, skjemanavn);
    const nyeVerdierISkjema = populerSkjemaverdier(gamleVerdierISkjema, action.feltnavn, action.nyVerdi);
    const populertSoknad = populerSoknadMedSvarUtenKonvertertePerioder(soknad, nyeVerdierISkjema);
    try {
        const oppdatertSoknad = yield call(post, `${hentApiUrl()}/oppdaterSporsmal`, populertSoknad);
        yield put(actions.soknadOppdatert(oppdatertSoknad));
        yield put(initialize(skjemanavn, fraBackendsoknadTilInitiellSoknad(oppdatertSoknad)));
    } catch (e) {
        log(e);
        yield put(actions.oppdaterSoknadFeilet());
    }
}

const gaTilSkjemaUtland = (soknadUtlandId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadUtlandId}`);
};

export function* opprettSoknadUtland() {
    yield put(actions.oppretterSoknadUtland());
    try {
        const data = yield call(post, `${hentApiUrl()}/opprettSoknadUtland`);
        yield put(actions.soknadUtlandOpprettet(data));
        gaTilSkjemaUtland(data.id);
    } catch (e) {
        log(e);
        if (toggleBrukMockdataUtland()) {
            yield put(actions.soknadUtlandOpprettet(soknadUtland1));
            gaTilSkjemaUtland(soknadUtland1.id);
        } else {
            logger.error(`Kunne ikke opprette søknad utland. URL: ${window.location.href} - ${e.message}`);
            yield put(actions.opprettSoknadUtlandFeilet());
        }
    }
}

function* watchHentSoknader() {
    yield* takeEvery(HENT_SOKNADER_FORESPURT, hentSoknader);
}

function* watchSendSoknad() {
    yield* takeEvery(SEND_SOKNAD_FORESPURT, sendSoknad);
}

function* watchSykmeldingSendt() {
    yield* takeEvery(SYKMELDING_BEKREFTET, hentSoknader);
}

function* watchAvbrytSykepengeoknad() {
    yield* takeEvery(AVBRYT_SYKEPENGESOKNAD_FORESPURT, avbrytSoknad);
}

function* watchOpprettSoknadUtland() {
    yield* takeEvery(OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT, opprettSoknadUtland);
}

function* watchEndringSoknad() {
    yield* takeEvery(SOKNAD_ENDRET, oppdaterSporsmal);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
    yield fork(watchSendSoknad);
    yield fork(watchSykmeldingSendt);
    yield fork(watchAvbrytSykepengeoknad);
    yield fork(watchOpprettSoknadUtland);
    yield fork(watchEndringSoknad);
}
