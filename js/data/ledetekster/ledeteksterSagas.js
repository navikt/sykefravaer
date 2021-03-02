import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, HENT_LEDETEKSTER_FORESPURT, log, setLedetekster, henterLedetekster, ledeteksterHentet, hentLedeteksterFeilet } from '@navikt/digisyfo-npm';
import { getLedeteksterRoot } from '../../utils/urlUtils';


export function* hentLedetekster() {
    yield put(henterLedetekster());
    try {
        const ledetekster = yield call(get, `${getLedeteksterRoot()}/api/tekster`);
        setLedetekster(ledetekster);
        yield put(ledeteksterHentet(ledetekster));
    } catch (e) {
        log(e);
        yield put(hentLedeteksterFeilet());
    }
}

function* watchHentLedetekster() {
    yield takeEvery(HENT_LEDETEKSTER_FORESPURT, hentLedetekster);
}

export default function* ledeteksterSagas() {
    yield fork(watchHentLedetekster);
}
