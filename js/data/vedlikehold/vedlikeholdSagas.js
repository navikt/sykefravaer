import {
    call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './vedlikehold_actions';
import { getSyforestRoot } from '../../utils/urlUtils';

export function* hentVedlikehold() {
    yield put(actions.henterVedlikehold());
    try {
        const vedlikehold = yield call(get, `${getSyforestRoot()}/informasjon/vedlikehold`);
        yield put(actions.vedlikeholdHentet(vedlikehold));
    } catch (e) {
        log(e);
        yield put(actions.hentVedlikeholdFeilet());
    }
}

function* watchHentVedlikehold() {
    yield takeEvery(actions.HENT_VEDLIKEHOLD_FORESPURT, hentVedlikehold);
}

export default function* vedlikeholdSagas() {
    yield fork(watchHentVedlikehold);
}
