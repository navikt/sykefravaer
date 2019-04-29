import { call, put, fork, takeEvery, all, select } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    BEKREFT_LEST_SM_SYKMELDING_FORESPURT, bekrefterLestSmSykmelding,
    HENT_SM_SYKMELDINGER_FORESPURT,
    henterSmSykmeldinger,
    hentSmSykmeldingerFeilet, SM_SYKMELDING_BEKREFTET_LEST, smSykmeldingBekreftLestFeilet,
    smSykmeldingerHentet,
} from './smSykmeldingerActions';
import { skalHenteSmSykmeldingerSelector } from './smSykmeldingerSelectors';
import { API_NAVN, get, hentSyfoApiUrl, post } from '../../../gateway-api';
import { toggleNyttSykmeldingsmottak } from '../../../selectors/unleashTogglesSelectors';
import { HENTET_UNLEASH_TOGGLES } from '../../../actions/actiontyper';

export function* oppdaterSmSykmeldinger() {
    const toggle = yield select(toggleNyttSykmeldingsmottak);
    if (toggle) {
        yield put(henterSmSykmeldinger());
        try {
            const data = yield call(get, `${hentSyfoApiUrl(API_NAVN.SYFOSMREGISTER)}/v1/behandlingsutfall`);
            yield put(smSykmeldingerHentet(data));
        } catch (e) {
            log(e);
            yield put(hentSmSykmeldingerFeilet());
        }
    } else {
        yield put(smSykmeldingerHentet([]));
    }
}

export function* hentSmSykmeldingerHvisIkkeHentet() {
    const skalHente = yield select(skalHenteSmSykmeldingerSelector);
    if (skalHente) {
        yield oppdaterSmSykmeldinger();
    }
}

export function* bekreftSmSykmeldingLest() {
    const toggle = yield select(toggleNyttSykmeldingsmottak);
    if (toggle) {
        yield put(bekrefterLestSmSykmelding());
        try {
            yield call(post, `${hentSyfoApiUrl(API_NAVN.SYFOSMREGISTER)}/v1/bekreftLest`);
            yield put(bekreftSmSykmeldingLest());
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
    ], bekreftSmSykmeldingLest);
}

function* watchOppdaterSmSykmeldinger() {
    yield takeEvery([
        SM_SYKMELDING_BEKREFTET_LEST,
    ], oppdaterSmSykmeldinger);
}

export default function* smSykmeldingerSagas() {
    yield all([
        fork(watchHentSmSykmeldinger),
        fork(watchBekreftSmSykmeldinger),
        fork(watchOppdaterSmSykmeldinger),
    ]);
}
