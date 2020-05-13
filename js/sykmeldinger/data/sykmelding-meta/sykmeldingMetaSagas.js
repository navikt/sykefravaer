import {
    call, put, fork, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import * as actions from './sykmeldingMetaActions';
import { hentApiUrl } from '../../../data/gateway-api';

const { HENT_VENTETID_FORESPURT } = actions;

export function* hentVentetid(action) {
    yield put(actions.henterVentetid(action.sykmeldingId));
    try {
        const erUtenforVentetid = yield call(get,
            `${hentApiUrl()}/sykmeldinger/${action.sykmeldingId}/actions/erUtenforVentetid`);
        const a = actions.ventetidHentet(action.sykmeldingId, erUtenforVentetid);
        yield put(a);
    } catch (e) {
        log(e);
        yield put(actions.hentVentetidFeilet(action.sykmeldingId));
    }
}

function* watchHentVentetid() {
    yield takeEvery(HENT_VENTETID_FORESPURT, hentVentetid);
}

export default function* hentVentetidSagas() {
    yield fork(watchHentVentetid);
}
