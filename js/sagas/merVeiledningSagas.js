import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import { BEKREFT_MER_VEILEDNING_FORESPURT, bekrefterMerVeiledning, bekreftMerVeiledningFeilet, merVeiledningBekreftet } from '../actions/merVeiledning_actions';
import { API_NAVN, hentSyfoApiUrl, post } from '../gateway-api';
import { hentHendelser } from '../actions/hendelser_actions';

export const lagUrl = (id) => { return `${hentSyfoApiUrl(API_NAVN.SYFOSERVICESTRANGLER)}/hendelse/${id}/bekreft`; };

export function* bekreftMerVeiledning(action) {
    yield put(bekrefterMerVeiledning());
    try {
        yield all(
            action.hendelseIder.map((hendelseId) => { return call(post, lagUrl(hendelseId)); }),
        );

        yield put(merVeiledningBekreftet());
        yield put(hentHendelser());
        yield call(action.callback);
    } catch (e) {
        log(e);
        yield put(hentHendelser());
        yield put(bekreftMerVeiledningFeilet());
    }
}

function* watchBekreftAktivitetskrav() {
    yield takeEvery(BEKREFT_MER_VEILEDNING_FORESPURT, bekreftMerVeiledning);
}

export default function* aktivitetskravSagas() {
    yield fork(watchBekreftAktivitetskrav);
}
