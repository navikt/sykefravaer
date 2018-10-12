import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../actions/aktivitetskrav_actions';
import * as actiontyper from '../actions/actiontyper';

export function* bekreftAktivitetskrav() {
    yield put(actions.bekrefterAktivitetskrav());
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykefravaersoppfoelging/actions/bekreft-aktivitetskrav`);
        yield put(actions.aktivitetskravBekreftet());
    } catch (e) {
        log(e);
        yield put(actions.bekreftAktivitetskravFeilet());
    }
}

function* watchBekreftAktivitetskrav() {
    yield takeEvery(actiontyper.BEKREFT_AKTIVITETSKRAV_FORESPURT, bekreftAktivitetskrav);
}

export default function* aktivitetskravSagas() {
    yield fork(watchBekreftAktivitetskrav);
}
