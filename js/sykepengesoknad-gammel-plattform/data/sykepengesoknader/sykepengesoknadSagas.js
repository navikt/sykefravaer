import { call, fork, put, select, takeEvery, all } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './sykepengesoknader_actions';
import * as actiontyper from '../../../actions/actiontyper';
import logger from '../../../logging';
import { skalHenteSykepengesoknader } from './sykepengesoknaderSelectors';

export function* oppdaterSykepengesoknader() {
    yield put(actions.henterSykepengesoknader());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/soknader`);
        yield put(actions.sykepengesoknaderHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente sykepengesoknader. URL: ${window.location.href} - ${e.message}`);
        yield put(actions.hentSykepengesoknaderFeilet());
    }
}

export function* hentSykepengesoknaderHvisIkkeHentet() {
    const skalHente = yield select(skalHenteSykepengesoknader);
    if (skalHente) {
        yield oppdaterSykepengesoknader();
    }
}


function* watchHentSykepengesoknader() {
    yield takeEvery(actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT, hentSykepengesoknaderHvisIkkeHentet);
}

function* watchSykmeldingSendt() {
    yield takeEvery(actiontyper.SYKMELDING_SENDT, oppdaterSykepengesoknader);
}

export default function* sykepengesoknadSagas() {
    yield all([
        fork(watchHentSykepengesoknader),
        fork(watchSykmeldingSendt),
    ]);
}
