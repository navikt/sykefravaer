import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { post, log } from 'digisyfo-npm';
import * as actions from '../actions/forskutteringssporsmal_actions';
import { SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FORESPURT } from '../actions/actiontyper';

export function* sjekkSkalViseForskutteringssporsmal(action) {
    yield put(actions.sjekkerSkalViseForskutteringssporsmal());
    try {
        const skalVise = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/soknader/${action.sykepengesoknad.id}/actions/vis-forskutteringsspoersmaal`, action.sykepengesoknad);
        const a = actions.skalViseForskutteringssporsmalSjekket(skalVise);
        yield put(a);
    } catch (e) {
        log(e);
        yield put(actions.sjekkSkalViseForskutteringssporsmalFeilet());
    }
}

function* watchSjekkSkalViseForskutteringssporsmal() {
    yield takeEvery(SJEKK_SKAL_VISE_FORSKUTTERINGSSPORSMAL_FORESPURT, sjekkSkalViseForskutteringssporsmal);
}

export default function* forskutteringssporsmalSagas() {
    yield fork(watchSjekkSkalViseForskutteringssporsmal);
}
