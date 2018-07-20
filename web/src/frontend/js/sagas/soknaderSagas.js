import { call, fork, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { browserHistory } from 'react-router';
import { get, post, hentApiUrl } from '../gateway-api';
import * as actions from '../actions/soknader_actions';
import {
    OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT,
    HENT_SOKNADER_FORESPURT,
    SEND_SOKNAD_FORESPURT,
    SYKMELDING_BEKREFTET,
} from '../actions/actiontyper';
import { soknadrespons, soknadUtland1 } from '../../test/mockSoknader';
import {
    toggleBrukMockDataSelvstendigSoknad,
    toggleBrukMockdataUtland,
    toggleInnsendingAvSelvstendigSoknad,
    toggleSelvstendigSoknad,
    toggleSykepengesoknadUtland,
} from '../toggles';
import logger from '../logging';
import { OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../enums/soknadtyper';

const gaTilKvittering = (soknadId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadId}/kvittering`);
};

export function* hentSoknader() {
    if (toggleSelvstendigSoknad()) {
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
    } else {
        yield put(actions.soknaderHentet([]));
    }
}

export function* sendSoknad(action) {
    yield put(actions.senderSoknad(action.soknadId));
    try {
        if ((toggleInnsendingAvSelvstendigSoknad() && action.soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE)
            || (toggleSykepengesoknadUtland() && action.soknad.soknadstype === OPPHOLD_UTLAND)) {
            yield call(post, `${hentApiUrl()}/sendSoknad`, action.soknad);
        }
        yield put(actions.soknadSendt(action.soknad));
        gaTilKvittering(action.soknad.id);
    } catch (e) {
        log(e);
        yield put(actions.sendSoknadFeilet());
    }
}

const gaTilSkjemaUtland = (soknadUtlandId) => {
    browserHistory.push(`/sykefravaer/soknader/${soknadUtlandId}`);
};

export function* opprettSoknadUtland() {
    if (toggleSykepengesoknadUtland()) {
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

function* watchOpprettSoknadUtland() {
    yield* takeEvery(OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT, opprettSoknadUtland);
}

export default function* soknaderSagas() {
    yield fork(watchHentSoknader);
    yield fork(watchSendSoknad);
    yield fork(watchSykmeldingSendt);
    yield fork(watchOpprettSoknadUtland);
}
