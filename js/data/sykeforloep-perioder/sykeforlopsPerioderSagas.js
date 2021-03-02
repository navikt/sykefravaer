import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log, henterSykeforlopsPerioder, sykeforlopsPerioderHentet, hentSykeforlopsPerioderFeilet, HENT_SYKEFORLOPSPERIODER_FORESPURT } from '@navikt/digisyfo-npm';
import { getSyforestRoot } from '../../utils/urlUtils';


export function* hentSykeforlopsPerioderSaga(action) {
    yield put(henterSykeforlopsPerioder(action.fnr, action.virksomhetsnummer));
    try {
        const periodeListe = yield call(get, `${getSyforestRoot()}/sykeforloep/siste/perioder?fnr=${action.fnr}&orgnr=${action.virksomhetsnummer}`);
        yield put(sykeforlopsPerioderHentet(periodeListe, action.fnr, action.virksomhetsnummer));
    } catch (e) {
        log(e);
        yield put(hentSykeforlopsPerioderFeilet(action.fnr, action.virksomhetsnummer));
    }
}

function* watchHentSykeforlopsPerioder() {
    yield takeEvery(HENT_SYKEFORLOPSPERIODER_FORESPURT, hentSykeforlopsPerioderSaga);
}

export default function* sykeforlopsPerioderSagas() {
    yield fork(watchHentSykeforlopsPerioder);
}
