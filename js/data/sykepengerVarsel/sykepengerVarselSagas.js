import {
    call, fork, put, takeEvery, all,
} from 'redux-saga/effects';
import { log } from '../../digisyfoNpm';
import { get, hentApiUrl } from '../gateway-api/index';
import * as actions from './sykepengerVarselActions';
import logger from '../../logging';
import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
} from './sykepengerVarselActionTyper';

export function* hentSykepengerVarsel() {
    try {
        const data = yield call(get, `${hentApiUrl()}/syfosyketilfelle/39ukersvarsel`);
        yield put(actions.sykepengerVarselHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentSykepengerVarselFeilet());
        logger.error(`Kunne ikke hente status på sykepengervarsel fra syfosyketilfelle. URL: ${window.location.href} - ${e.message}`);
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
