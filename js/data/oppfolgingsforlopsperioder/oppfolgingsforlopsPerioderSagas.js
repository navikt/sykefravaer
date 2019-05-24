import {
    call,
    put,
    fork,
    takeEvery,
} from 'redux-saga/effects';
import {
    get,
    log,
} from '@navikt/digisyfo-npm';
import * as actions from './oppfolgingsforlopsPerioder_actions';
import { HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT } from '../actiontyper';

export function* hentOppfolgingsforlopsPerioder(action) {
    yield put(actions.hentOppfolgingsforlopsPerioderHenter(action.virksomhetsnummer));
    try {
        const fnr = '';
        const url = `${process.env.REACT_APP_SYFOREST_ROOT}/sykeforloep/siste/perioder?fnr=${fnr}&orgnr=${action.virksomhetsnummer}`;
        const periodeListe = yield call(get, url);
        yield put(actions.hentOppfolgingsforlopsPerioderHentet(periodeListe, action.virksomhetsnummer));
    } catch (e) {
        log(e);
        yield put(actions.hentOppfolgingsforlopsPerioderFeilet(action.virksomhetsnummer));
    }
}

function* watchHentOppfolgingsforlopsPerioder() {
    yield takeEvery(HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT, hentOppfolgingsforlopsPerioder);
}

export default function* oppfolgingsforlopsPerioderSagas() {
    yield fork(watchHentOppfolgingsforlopsPerioder);
}
