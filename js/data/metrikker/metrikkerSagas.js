import { fork, select, takeEvery } from 'redux-saga/effects';
import { log } from '../../digisyfoNpm';
import { SYKMELDING_SENDT, SYKMELDING_BEKREFTET } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';
import { hentMetrikk } from './metrikkerSelectors';

const pushToDataLayer = (metrikk) => {
    /* eslint-disable */
    window.dataLayer.push({
        'event': metrikk.type,
        'value': metrikk.data.tid,
        'data': JSON.stringify(metrikk.data),
    });
    /* eslint-enable */
};

export function* lagreMetrikk(action) {
    try {
        const metrikk = yield select(hentMetrikk, action);
        log(metrikk);
        pushToDataLayer(metrikk);
    } catch (e) {
        log(e);
    }
}

function* watch() {
    yield takeEvery([
        SYKMELDING_SENDT,
        SYKMELDING_BEKREFTET,
    ], lagreMetrikk);
}

export default function* metrikkerSagas() {
    yield fork(watch);
}
