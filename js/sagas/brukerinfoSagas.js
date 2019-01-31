import { call, put, fork, takeEvery, all, select } from 'redux-saga/effects';
import { get, getAjax, log } from '@navikt/digisyfo-npm';
import { get as gatewayGet, getHeaders } from '../gateway-api';
import * as actions from '../actions/brukerinfo_actions';
import * as actiontyper from '../actions/actiontyper';
import logger from '../logging';
import {
    skalHenteBrukerinfoSelector, skalHenteLoginInfo,
    skalHenteOppfolgingSelector,
    skalHenteSykmeldtinfodata,
} from '../selectors/brukerinfoSelectors';
import { MANGLER_OIDC_TOKEN } from '../enums/exceptionMessages';

const getConsumerIdHeaders = () => {
    const CustomHeaders = getHeaders();
    return new CustomHeaders({
        'Nav-Consumer-Id': 'sykefravaer',
    });
};

export function* hentBrukerinfo() {
    const skalHente = yield select(skalHenteBrukerinfoSelector);
    if (skalHente) {
        yield put(actions.henterBrukerinfo());
        try {
            const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/bruker`);
            yield put(actions.brukerinfoHentet(data));
        } catch (e) {
            log(e);
            logger.error(`Kunne ikke hente brukerinfo. URL: ${window.location.href} - ${e.message}`);
            yield put(actions.hentBrukerinfoFeilet());
        }
    }
}

export function* sjekkInnlogging() {
    yield put(actions.sjekkerInnlogging());
    try {
        yield call(getAjax, `${process.env.REACT_APP_CONTEXT_ROOT}/`);
        yield put(actions.setErInnlogget());
    } catch (e) {
        log(e);
        yield put(actions.setErUtlogget());
    }
}

export function* hentOppfolging() {
    const skalHente = yield select(skalHenteOppfolgingSelector);
    if (skalHente) {
        yield put(actions.henterOppfolging());
        try {
            const data = yield call(gatewayGet, process.env.REACT_APP_OPPFOLGING_REST_URL, getConsumerIdHeaders());
            yield put(actions.oppfolgingHentet(data));
        } catch (e) {
            if (e.message === MANGLER_OIDC_TOKEN) {
                yield put(actions.henterOppfolging());
            } else {
                logger.error(`Kunne ikke hente oppfølging. URL: ${window.location.href} - ${e.message}`);
                log(e);
                yield put(actions.hentOppfolgingFeilet());
            }
        }
    }
}

export function* hentSykmeldtinfodata() {
    const skalHente = yield select(skalHenteSykmeldtinfodata);
    if (skalHente) {
        yield put(actions.henterSykmeldtinfodata());
        try {
            const data = yield call(gatewayGet, process.env.REACT_APP_VEILARBREG_REST_URL, getConsumerIdHeaders());
            yield put(actions.sykmeldtInfodataHentet(data));
        } catch (e) {
            if (e.message === MANGLER_OIDC_TOKEN) {
                yield put(actions.henterSykmeldtinfodata());
            } else {
                logger.error(`Kunne ikke hente infodata om sykmeldt. URL: ${window.location.href} - ${e.message}`);
                log(e);
                yield put(actions.hentSykmeldtinfodataFeilet());
            }
        }
    }
}

export function* hentLoginInfo() {
    const skalHente = yield select(skalHenteLoginInfo);
    if (skalHente) {
        yield put(actions.henterLoginInfo());
        try {
            const data = yield call(get, `${process.env.REACT_APP_INNLOGGINGSLINJE_REST_URL}?randomness=${Math.random()}`);
            yield put(actions.loginInfoHentet(data));
        } catch (e) {
            logger.error(`Kunne ikke hente login info. URL: ${window.location.href} - ${e.message}`);
            log(e);
            yield put(actions.hentLoginInfoFeilet());
        }
    }
}

function* watchHentBrukerinfo() {
    yield takeEvery(actiontyper.HENT_BRUKERINFO_FORESPURT, hentBrukerinfo);
}

function* watchSjekkInnlogging() {
    yield takeEvery(actiontyper.SJEKK_INNLOGGING_FORESPURT, sjekkInnlogging);
}

function* watchHentOppfolging() {
    yield takeEvery(actiontyper.HENT_OPPFOLGING_FORESPURT, hentOppfolging);
}

function* watchHentSykmeldtinfodata() {
    yield takeEvery([
        actiontyper.HENT_SYKMELDTINFODATA_FORESPURT,
        actiontyper.HENTET_UNLEASH_TOGGLES,
    ], hentSykmeldtinfodata);
}

function* watchHentLoginInfo() {
    yield takeEvery(actiontyper.HENT_LOGIN_INFO_FORESPURT, hentLoginInfo);
}

export default function* brukerinfoSagas() {
    yield all([
        fork(watchHentOppfolging),
        fork(watchHentSykmeldtinfodata),
        fork(watchHentBrukerinfo),
        fork(watchHentLoginInfo),
        fork(watchSjekkInnlogging),
    ]);
}
