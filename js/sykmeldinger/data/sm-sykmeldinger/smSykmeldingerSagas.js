import { call, put, fork, takeEvery, all, select } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    HENT_SM_SYKMELDINGER_FORESPURT,
    henterSmSykmeldinger,
    hentSmSykmeldingerFeilet,
    smSykmeldingerHentet,
} from './smSykmeldingerActions';
import { skalHenteSmSykmeldingerSelector } from './smSykmeldingerSelectors';
import { API_NAVN, get, hentSyfoApiUrl } from '../../../gateway-api';
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

function* watchHentSmSykmeldinger() {
    yield takeEvery([
        HENT_SM_SYKMELDINGER_FORESPURT,
        HENTET_UNLEASH_TOGGLES,
    ], hentSmSykmeldingerHvisIkkeHentet);
}

export default function* smSykmeldingerSagas() {
    yield all([
        fork(watchHentSmSykmeldinger),
    ]);
}
