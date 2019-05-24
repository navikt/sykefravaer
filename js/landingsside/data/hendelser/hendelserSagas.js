import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './hendelserActions';
import * as actiontyper from '../../../data/actiontyper';

export function* hentHendelser() {
    yield put(actions.henterHendelser());
    try {
        const data = yield call(get, `${process.env.REACT_APP_SYFOREST_ROOT}/informasjon/hendelser`);
        yield put(actions.hendelserHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentHendelserFeilet());
    }
}

function* watchHentHendelser() {
    yield takeEvery(actiontyper.HENT_HENDELSER_FORESPURT, hentHendelser);
}

function* watchAktivitetskravBekreftet() {
    yield takeEvery(actiontyper.AKTIVITETSKRAV_BEKREFTET, hentHendelser);
}

export default function* hendelserSagas() {
    yield all([
        fork(watchHentHendelser),
        fork(watchAktivitetskravBekreftet),
    ]);
}
