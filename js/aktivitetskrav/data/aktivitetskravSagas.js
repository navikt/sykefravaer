import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { log, post } from '@navikt/digisyfo-npm';
import * as actions from './aktivitetskravActions';

const { BEKREFT_AKTIVITETSKRAV_FORESPURT } = actions;

export function* bekreftAktivitetskrav() {
    yield put(actions.bekrefterAktivitetskrav());
    try {
        const url = `${process.env.REACT_APP_SYFOREST_ROOT}/sykefravaersoppfoelging/actions/bekreft-aktivitetskrav`;
        yield call(post, url);
        yield put(actions.aktivitetskravBekreftet());
    } catch (e) {
        log(e);
        yield put(actions.bekreftAktivitetskravFeilet());
    }
}

function* watchBekreftAktivitetskrav() {
    yield takeEvery(BEKREFT_AKTIVITETSKRAV_FORESPURT, bekreftAktivitetskrav);
}

export default function* aktivitetskravSagas() {
    yield fork(watchBekreftAktivitetskrav);
}
