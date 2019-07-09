import {
    all, call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, getAjax, log } from '@navikt/digisyfo-npm';
import { get as gatewayGet, getHeaders } from '../gateway-api/index';
import * as actions from './brukerinfo_actions';
import logger from '../../logging';
import { skalHenteBrukerinfoSelector, skalHenteOppfolgingSelector, skalHenteSykmeldtinfodata } from './brukerinfoSelectors';
import { MANGLER_OIDC_TOKEN } from '../../enums/exceptionMessages';
import { HENTET_UNLEASH_TOGGLES } from '../unleash-toggles/unleashToggles_actions';

const {
    HENT_BRUKERINFO_FORESPURT, HENT_OPPFOLGING_FORESPURT, HENT_SYKMELDTINFODATA_FORESPURT, SJEKK_INNLOGGING_FORESPURT,
} = actions;

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

function* watchHentBrukerinfo() {
    yield takeEvery(HENT_BRUKERINFO_FORESPURT, hentBrukerinfo);
}

function* watchSjekkInnlogging() {
    yield takeEvery(SJEKK_INNLOGGING_FORESPURT, sjekkInnlogging);
}

function* watchHentOppfolging() {
    yield takeEvery(HENT_OPPFOLGING_FORESPURT, hentOppfolging);
}

function* watchHentSykmeldtinfodata() {
    yield takeEvery([
        HENT_SYKMELDTINFODATA_FORESPURT,
        HENTET_UNLEASH_TOGGLES,
    ], hentSykmeldtinfodata);
}

export default function* brukerinfoSagas() {
    yield all([
        fork(watchHentOppfolging),
        fork(watchHentSykmeldtinfodata),
        fork(watchHentBrukerinfo),
        fork(watchSjekkInnlogging),
    ]);
}
