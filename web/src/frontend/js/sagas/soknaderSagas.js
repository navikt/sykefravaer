import { call, fork, put, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { browserHistory } from 'react-router';
import { get, post, hentApiUrl } from '../gateway-api';
import * as actions from '../actions/soknader_actions';
import {
    OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT,
    HENT_SOKNADER_FORESPURT,
    SEND_SOKNAD_FORESPURT,
    SYKMELDING_BEKREFTET, AVBRYT_SYKEPENGESOKNAD_FORESPURT,
} from '../actions/actiontyper';
import { soknadrespons, soknadUtland1 } from '../../test/mockSoknader';
import {
    toggleBrukMockDataSelvstendigSoknad,
    toggleBrukMockdataUtland,
} from '../toggles';
import logger from '../logging';
import { OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../enums/soknadtyper';
import { toggleSykepengesoknadUtland } from '../selectors/unleashTogglesSelectors';

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
        if (toggleBrukMockDataSelvstendigSoknad()) {
            yield put(actions.soknaderHentet(soknadrespons));
        } else {
            yield put(actions.hentSoknaderFeilet());
        }
    }
}

export function* sendSoknad(action) {
    const toggleUtland = yield select(toggleSykepengesoknadUtland);
    try {
        if ((action.soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE)
            || (toggleUtland && action.soknad.soknadstype === OPPHOLD_UTLAND)) {
            yield put(actions.senderSoknad(action.soknadId));
            yield call(post, `${hentApiUrl()}/sendSoknad`, action.soknad);
            yield put(actions.soknadSendt(action.soknad));
            gaTilKvittering(action.soknad.id);
        } else {
            log('Innsending av søknad er togglet av.');
        }
    } catch (e) {
        log(e);
        yield put(actions.sendSoknadFeilet());
    }
}

export function* avbrytSoknad(action) {
    const toggleUtland = yield select(toggleSykepengesoknadUtland);
    if (action.soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE
        || (toggleUtland && action.soknad.soknadstype === OPPHOLD_UTLAND)) {
        try {
            yield put(actions.avbryterSoknad());
            yield call(post, `${hentApiUrl()}/avbrytSoknad`, action.soknad);
            yield put(actions.soknadAvbrutt(action.soknad));
        } catch (e) {
            log(e);
            yield put(actions.avbrytSoknadFeilet());
        }
    }
}

const gaTilSkjemaUtland = (soknadUtlandId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadUtlandId}`);
};

export function* opprettSoknadUtland() {
    const toggleUtland = yield select(toggleSykepengesoknadUtland);
    if (toggleUtland) {
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

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
    yield fork(watchSendSoknad);
    yield fork(watchSykmeldingSendt);
    yield fork(watchAvbrytSykepengeoknad);
    yield fork(watchOpprettSoknadUtland);
}
