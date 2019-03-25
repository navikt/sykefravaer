import { call, fork, put, select, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { browserHistory } from 'react-router';
import { initialize, change } from 'redux-form';
import { get, hentApiUrl, post } from '../../../gateway-api';
import * as actions from './soknaderActions';
import {
    SYKMELDING_BEKREFTET,
    SYKMELDING_SENDT,
} from '../../../actions/actiontyper';
import { soknadrespons } from '../../../../test/mock/mockSoknadSelvstendig';
import { toggleBrukMockDataSelvstendigSoknad, toggleBrukMockdataUtland } from '../../../toggles';
import logger from '../../../logging';
import { ARBEIDSTAKERE, OPPHOLD_UTLAND, SELVSTENDIGE_OG_FRILANSERE } from '../../enums/soknadtyper';
import { hentSoknad, skalHenteSoknader } from './soknaderSelectors';
import { populerSoknadMedSvarUtenKonvertertePerioder } from '../../utils/populerSoknadMedSvar';
import fraBackendsoknadTilInitiellSoknad from '../../utils/fraBackendsoknadTilInitiellSoknad';
import { hentSkjemaVerdier } from '../../../selectors/reduxFormSelectors';
import { getSkjemanavnFraSoknad } from '../../utils/getSkjemanavnFraSoknad';
import getContextRoot from '../../../utils/getContextRoot';
import { soknadUtland1 } from '../../../../test/mock/mockSoknadUtland';
import { UTKAST_TIL_KORRIGERING } from '../../enums/soknadstatuser';
import { toggleNyArbeidstakerSoknad } from '../../../selectors/unleashTogglesSelectors';
import { MANGLER_OIDC_TOKEN } from '../../../enums/exceptionMessages';
import {
    AVBRYT_SOKNAD_FORESPURT,
    GJENAPNE_SOKNAD_FORESPURT,
    HENT_SOKNADER_FORESPURT,
    LAGRE_SOKNAD_FORESPURT,
    OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT,
    OPPRETT_UTKAST_TIL_KORRIGERING_FORESPURT,
    SEND_SOKNAD_FORESPURT,
    SOKNAD_ENDRET,
    SOKNAD_SENDT,
} from './soknaderActiontyper';
import { PERIODER } from '../../enums/svartyper';
import { getObjectValueByString } from '../../../utils';
import { erGyldigPeriode } from '../../../utils/periodeUtils';

const gaTilKvittering = (soknadId) => {
    browserHistory.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknadId}/kvittering`);
};

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

export function* sendSoknad(action) {
    try {
        const toggle = yield select(toggleNyArbeidstakerSoknad);
        if (action.soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE
            || action.soknad.soknadstype === OPPHOLD_UTLAND
            || (action.soknad.soknadstype === ARBEIDSTAKERE && toggle)) {
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
            yield call(post, `${hentApiUrl()}/soknader/${action.soknad.id}/avbryt`);
            yield put(actions.soknadAvbrutt(action.soknad));
            if (action.soknad.soknadstype === OPPHOLD_UTLAND || action.soknad.status === UTKAST_TIL_KORRIGERING) {
                browserHistory.push(`${getContextRoot()}/soknader`);
            }
        } catch (e) {
            log(e);
            yield put(actions.avbrytSoknadFeilet());
        }
    }
}

export function* gjenapneSoknad(action) {
    if (action.soknad.soknadstype === SELVSTENDIGE_OG_FRILANSERE) {
        try {
            yield put(actions.gjenapnerSoknad(action.soknad));
            yield call(post, `${hentApiUrl()}/soknader/${action.soknad.id}/gjenapne`);
            yield put(actions.soknadGjenapnet(action.soknad));
        } catch (e) {
            log(e);
            yield put(actions.gjenapneSoknadFeilet());
        }
    }
}

export function* oppdaterSporsmal(action) {
    const soknad = yield select(hentSoknad, action.soknad);
    const skjemanavn = getSkjemanavnFraSoknad(action.soknad);
    yield put(change(skjemanavn, action.feltnavn, action.nyVerdi));
    const nyeverdierISkjema = yield select(hentSkjemaVerdier, skjemanavn);
    const populertSoknad = populerSoknadMedSvarUtenKonvertertePerioder(soknad, nyeverdierISkjema);
    const skalOppdatereSporsmal = action.svartype === PERIODER
        ? (() => {
            const feltnavn = action.feltnavn.split('.')[0];
            const verdi = getObjectValueByString(nyeverdierISkjema, feltnavn);
            return erGyldigPeriode(verdi);
        })()
        : true;

    if (skalOppdatereSporsmal) {
        try {
            const oppdatertSoknad = yield call(post, `${hentApiUrl()}/oppdaterSporsmal`, populertSoknad);
            yield put(actions.soknadOppdatert(oppdatertSoknad));
            yield put(initialize(skjemanavn, fraBackendsoknadTilInitiellSoknad(oppdatertSoknad)));
        } catch (e) {
            log(e);
            yield put(actions.oppdaterSoknadFeilet());
        }
    }
}

export function* lagreSoknad(action) {
    const soknad = yield select(hentSoknad, action.soknad);
    const skjemanavn = getSkjemanavnFraSoknad(action.soknad);
    const verdier = yield select(hentSkjemaVerdier, skjemanavn);
    const populertSoknad = populerSoknadMedSvarUtenKonvertertePerioder(soknad, verdier);
    try {
        // TODO: Endre URL for endepunkt i Syfosoknad
        const oppdatertSoknad = yield call(post, `${hentApiUrl()}/oppdaterSporsmal`, populertSoknad);
        yield put(actions.soknadOppdatert(oppdatertSoknad));
        yield put(initialize(skjemanavn, fraBackendsoknadTilInitiellSoknad(oppdatertSoknad)));
    } catch (e) {
        log(e);
        yield put(actions.oppdaterSoknadFeilet());
    }
}


const gaTilSkjemaUtland = (soknadUtlandId) => {
    browserHistory.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknadUtlandId}`);
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

export function* opprettUtkastTilKorrigering(action) {
    yield put(actions.oppretterKorrigering());
    try {
        const data = yield call(post, `${hentApiUrl()}/soknader/${action.sykepengesoknadsId}/korriger`);
        yield put(actions.korrigeringOpprettet(data));
        browserHistory.push(`${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${data.id}`);
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke opprette utkast til korrigering. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.opprettUtkastTilKorrigeringFeilet());
    }
}

function* watchHentSoknader() {
    yield takeEvery(HENT_SOKNADER_FORESPURT, hentSoknaderHvisIkkeHentet);
}

function* watchOppdaterSoknader() {
    yield takeEvery([
        SYKMELDING_BEKREFTET,
        SYKMELDING_SENDT,
        SOKNAD_SENDT,
    ], oppdaterSoknader);
}

function* watchSendSoknad() {
    yield takeEvery(SEND_SOKNAD_FORESPURT, sendSoknad);
}

function* watchAvbrytSoknad() {
    yield takeEvery(AVBRYT_SOKNAD_FORESPURT, avbrytSoknad);
}

function* watchGjenapneSoknad() {
    yield takeEvery(GJENAPNE_SOKNAD_FORESPURT, gjenapneSoknad);
}

function* watchOpprettSoknadUtland() {
    yield takeEvery(OPPRETT_SYKEPENGESOKNADUTLAND_FORESPURT, opprettSoknadUtland);
}

function* watchEndringSoknad() {
    yield takeLatest(SOKNAD_ENDRET, oppdaterSporsmal);
}

function* watchLagreSoknad() {
    yield takeEvery(LAGRE_SOKNAD_FORESPURT, lagreSoknad);
}

function* watchOpprettUtkastTilKorrigering() {
    yield takeEvery(OPPRETT_UTKAST_TIL_KORRIGERING_FORESPURT, opprettUtkastTilKorrigering);
}

export default function* soknaderSagas() {
    yield all([
        fork(watchHentSoknader),
        fork(watchSendSoknad),
        fork(watchOppdaterSoknader),
        fork(watchAvbrytSoknad),
        fork(watchOpprettSoknadUtland),
        fork(watchEndringSoknad),
        fork(watchGjenapneSoknad),
        fork(watchOpprettUtkastTilKorrigering),
        fork(watchLagreSoknad),
    ]);
}
