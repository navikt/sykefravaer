import {
    call, fork, put, select, takeEvery, all,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get, hentApiUrl } from '../gateway-api/index';
import * as actions from './sykepengerVarselActions';
import logger from '../../logging';
import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
} from './sykepengerVarselActionTyper';
import { skalHenteSykepengerVarsel } from './sykepengerVarselSelectors';

export function* hentSykepengerVarsel() {
    try {
        const data = yield call(get, `${hentApiUrl()}/syfosyketilfelle/39ukersvarsel`);
        yield put(actions.sykepengerVarselHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente status på sykepengervarsel fra syfosyketilfelle. URL: ${window.location.href} - ${e.message}`);
    }
}

export function* hentSykepengerVarselHvisIkkeHentet() {
    const skalHente = yield select(skalHenteSykepengerVarsel);
    if (skalHente) {
        yield hentSykepengerVarsel();
    }
}

function* watchHentSykepengerVarsel() {
    yield takeEvery(HENT_SYKEPENGERVARSEL_FORESPURT, hentSykepengerVarsel);
}

export default function* sykepengerVarselSagas() {
    yield all([
        fork(watchHentSykepengerVarsel),
    ]);
}
