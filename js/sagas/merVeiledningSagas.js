import { call, fork, put, takeEvery } from 'redux-saga/effects';
import { log, post } from 'digisyfo-npm';
import { BEKREFT_MER_VEILEDNING_FORESPURT, bekrefterMerVeiledning, bekreftMerVeiledningFeilet, merVeiledningBekreftet } from '../actions/merVeiledning_actions';
import { API_NAVN, hentSyfoApiUrl } from '../gateway-api';

export function* bekreftMerVeiledning(action) {
    yield put(bekrefterMerVeiledning());
    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOSERVICESTRANGLER)}/hendelse/${action.hendelseId}/bekreft`;
        yield call(post, url);
        yield put(merVeiledningBekreftet());
    } catch (e) {
        log(e);
        yield put(bekreftMerVeiledningFeilet());
    }
}

function* watchBekreftAktivitetskrav() {
    yield takeEvery(BEKREFT_MER_VEILEDNING_FORESPURT, bekreftMerVeiledning);
}

export default function* aktivitetskravSagas() {
    yield fork(watchBekreftAktivitetskrav);
}
