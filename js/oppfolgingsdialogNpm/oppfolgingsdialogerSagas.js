import {
    call, put, fork, takeEvery, all,
} from 'redux-saga/effects';
import { log } from '@navikt/digisyfo-npm';
import {
    API_NAVN,
    hentSyfoApiUrl,
    get,
} from '../data/gateway-api/gatewayApi';
import {
    HENT_OPPFOLGINGSDIALOGER_FORESPURT,
    henterOppfolgingsdialoger,
    hentOppfolgingsdialogerFeilet,
    oppfolgingsdialogerHentet,
} from './oppfolgingsdialoger_actions';
import logger from '../logging';

export function* hentOppfolgingsdialoger() {
    yield put(henterOppfolgingsdialoger());

    try {
        const url = `${hentSyfoApiUrl(API_NAVN.SYFOOPPFOLGINGSPLANSERVICE)}/arbeidstaker/oppfolgingsplaner`;
        const data = yield call(get, url);
        yield put(oppfolgingsdialogerHentet(data));
    } catch (e) {
        log(e);
        logger.error(`Kunne ikke hente oppfolgingsdialoger for arbeidstaker. ${e.message}`);
        yield put(hentOppfolgingsdialogerFeilet());
    }
}

function* watchHentOppfolgingsdialoger() {
    yield takeEvery(HENT_OPPFOLGINGSDIALOGER_FORESPURT, hentOppfolgingsdialoger);
}

export default function* oppfolgingsdialogerSagas() {
    yield all([
        fork(watchHentOppfolgingsdialoger),
    ]);
}
