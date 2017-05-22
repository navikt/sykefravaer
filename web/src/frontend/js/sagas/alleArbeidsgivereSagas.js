import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { get } from '../api';
import { log } from 'digisyfo-npm';
import * as actions from '../actions/alleArbeidsgivere_actions';
import * as actiontyper from '../actions/actiontyper';

export function* hentAlleArbeidsgivere() {
    yield put(actions.henterAlleArbeidsgivere());
    try {
        // const data = yield call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/sykmeldt/arbeidsgivere`);
        const data = [{
            navn: 'DNB',
            virksomhetsnummer: '***REMOVED***',
        }, {
            navn: 'KIWI',
            virksomhetsnummer: '981566379',
        }];
        yield put(actions.alleArbeidsgivereHentet(data));
    } catch (e) {
        log(e);
        yield put(actions.hentAlleArbeidsgivereFeilet());
    }
}

function* watchHentAlleArbeidsgivere() {
    yield* takeEvery(actiontyper.HENT_ALLE_ARBEIDSGIVERE_FORESPURT, hentAlleArbeidsgivere);
}

export default function* alleArbeidsgivereSagas() {
    yield fork(watchHentAlleArbeidsgivere);
}
