import { call, put, fork, takeEvery } from 'redux-saga/effects';
import { get, log, setLedetekster, henterLedetekster, ledeteksterHentet, HENT_LEDETEKSTER_FORESPURT, hentLedeteksterFeilet } from '@navikt/digisyfo-npm';
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
