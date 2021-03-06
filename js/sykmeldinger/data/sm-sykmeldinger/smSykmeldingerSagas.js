import { all, call, delay, fork, put, select, takeEvery } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { log } from '../../../digisyfoNpm';
import {
    BEKREFT_LEST_SM_SYKMELDING_FORESPURT,
    bekrefterLestSmSykmelding,
    bekreftSmSykmeldingKvitteringVistLengeNok,
    HENT_SM_SYKMELDINGER_FORESPURT,
    henterSmSykmeldinger,
    hentSmSykmeldingerFeilet,
    smSykmeldingBekreftetLest,
    smSykmeldingBekreftLestFeilet,
    smSykmeldingerHentet,
} from './smSykmeldingerActions';
import { skalBekrefteSmSykmeldingSelector, skalHenteSmSykmeldingerSelector } from './smSykmeldingerSelectors';
import { get, post } from '../../../data/gateway-api';
import { HENTET_UNLEASH_TOGGLES } from '../../../data/unleash-toggles/unleashToggles_actions';
import { erNaisLabsDemo } from '../../../utils/urlUtils';

export const hentSykmeldingerBackendUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://sykmelding-gateway.nav.no/sykmeldinger-backend/api';
    }
    if (url.indexOf('localhost:2027') > -1) {
        // docker compose container
        return 'http://localhost:6969/syfosmregister/api';
    }
    if (url.indexOf('localhost:2028') > -1) {
        // docker compose node prosess
        return 'http://localhost:6969/syfosmregister/api';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/syfosmregister';
    }
    // Preprod
    return 'https://sykmelding-gateway.dev.nav.no/sykmeldinger-backend/api';
};

export function* oppdaterSmSykmeldinger() {
    yield put(henterSmSykmeldinger());
    try {
        const data = yield call(get, `${hentSykmeldingerBackendUrl()}/v1/sykmeldinger`);
        yield put(smSykmeldingerHentet(data));
    } catch (e) {
        log(e);
        yield put(hentSmSykmeldingerFeilet());
    }
}

export function* hentSmSykmeldingerHvisIkkeHentet() {
    const skalHente = yield select(skalHenteSmSykmeldingerSelector);
    if (skalHente) {
        yield oppdaterSmSykmeldinger();
    }
}

export function* bekreftSmSykmeldingLestSaga(action) {
    const skalBekrefte = yield select(skalBekrefteSmSykmeldingSelector);
    if (skalBekrefte) {
        yield put(bekrefterLestSmSykmelding());
        try {
            yield call(post, `${hentSykmeldingerBackendUrl()}/v1/sykmeldinger/${action.smSykmelding.id}/bekreft`);
            yield put(smSykmeldingBekreftetLest(action.smSykmelding));
            browserHistory.push('/sykefravaer');
            yield delay(10000);
            yield put(bekreftSmSykmeldingKvitteringVistLengeNok());
        } catch (e) {
            log(e);
            yield put(smSykmeldingBekreftLestFeilet());
        }
    }
}

function* watchHentSmSykmeldinger() {
    yield takeEvery([
        HENT_SM_SYKMELDINGER_FORESPURT,
        HENTET_UNLEASH_TOGGLES,
    ], hentSmSykmeldingerHvisIkkeHentet);
}

function* watchBekreftSmSykmeldinger() {
    yield takeEvery([
        BEKREFT_LEST_SM_SYKMELDING_FORESPURT,
    ], bekreftSmSykmeldingLestSaga);
}

export default function* smSykmeldingerSagas() {
    yield all([
        fork(watchHentSmSykmeldinger),
        fork(watchBekreftSmSykmeldinger),
    ]);
}
