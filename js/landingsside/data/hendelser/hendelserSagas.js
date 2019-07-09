import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './hendelserActions';
import { AKTIVITETSKRAV_BEKREFTET } from '../../../aktivitetskrav/data/aktivitetskravActions';

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
    yield takeEvery(actions.HENT_HENDELSER_FORESPURT, hentHendelser);
}

function* watchAktivitetskravBekreftet() {
    yield takeEvery(AKTIVITETSKRAV_BEKREFTET, hentHendelser);
}

export default function* hendelserSagas() {
    yield all([
        fork(watchHentHendelser),
        fork(watchAktivitetskravBekreftet),
    ]);
}
