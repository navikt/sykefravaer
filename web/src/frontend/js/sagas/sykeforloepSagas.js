import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import * as actions from '../actions/sykeforloep_actions';
import * as actiontyper from '../actions/actiontyper';
import { get } from '../api';

const getVarighet = (dato) => {
    if (!dato) {
        return 0;
    }
    const iDag = new Date();
    const s = new Date(dato);
    const ETT_DOGN = 1000 * 60 * 60 * 24;
    const varighet = (iDag.getTime() - s.getTime()) / ETT_DOGN;
    return Math.round(varighet);
};

const lagreSykmeldtStatistikk = (dato) => {
    try {
        const varighet = getVarighet(dato);
        window.dataLayer.push({
            'event': 'SYKEFORLOP_HENTET',
            'varighet': varighet,
            'dato': dato,
        });
    } catch (e) {
        log(e);
    }
};

export function* hentStartdato() {
    yield put(actions.henterStartdato());
    try {
        const respons = yield call(get, `${window.APP_SETTINGS.REST_ROOT}/tidslinje/startdato`);
        yield put(actions.startdatoHentet(respons.startdato));
        lagreSykmeldtStatistikk(respons.startdato);
    } catch (e) {
        log(e);
        yield put(actions.hentStartdatoFeilet());
    }
}

function* watchHentStartdato() {
    yield* takeEvery(actiontyper.HENT_SYKEFORLOEP_STARTDATO_FORESPURT, hentStartdato);
}

export default function* sykeforloepSagas() {
    yield fork(watchHentStartdato);
}
