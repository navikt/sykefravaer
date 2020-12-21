import {
    call, fork, put, select, takeEvery, all,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { get, hentApiUrl } from '../gateway-api/index';
import * as actions from './sykepengerVarselActions';
import logger from '../../logging';
import { MANGLER_OIDC_TOKEN } from '../../enums/exceptionMessages';
import {
    HENT_SYKEPENGERVARSEL_FORESPURT,
} from './sykepengerVarselActionTyper';
import { skalHenteSykepengerVarsel } from './sykepengerVarselSelectors';

export function* hentSykepengerVarsel() {
    yield put(actions.henterSykepengerVarsel());
    try {
        const data = yield call(get, `${hentApiUrl()}/syfosyketilfelle/39ukersvarsel`);
        yield put(actions.sykepengerVarselHentet(data));
    } catch (e) {
        log(e);
        if (e.message === MANGLER_OIDC_TOKEN) {
            yield put(actions.henterSykepengerVarsel());
        } else {
            logger.error(`Kunne ikke hente status på sykepengervarsel fra syfosoknad. URL: ${window.location.href} - ${e.message}`);
            yield put(actions.hentSykepengerVarselFeilet());
        }
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

export default function* sykepengervarselSagas() {
    yield all([
        fork(watchHentSykepengerVarsel),
    ]);
}
