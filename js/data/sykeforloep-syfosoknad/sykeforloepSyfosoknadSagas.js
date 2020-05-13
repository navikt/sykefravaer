import {
    call, put, fork, takeEvery, select, all,
} from 'redux-saga/effects';
import { get, log } from '@navikt/digisyfo-npm';
import { skalHenteSykeforloep } from './sykeforloepSyfosoknadSelectors';
import {
    henterSykeforloepSyfosoknad, sykeforloepSyfosoknadHentet, hentSykeforloepSyfosoknadFeilet, HENT_SYKEFORLOEP_SYFOSOKNAD_FORESPURT,
} from './sykeforloepSyfosoknad_actions';
import { SYKMELDING_BEKREFTET, SYKMELDING_GJENAAPNET, SYKMELDING_SENDT } from '../../sykmeldinger/data/din-sykmelding/dinSykmeldingActions';
import { hentApiUrl } from '../gateway-api';

function* oppdaterSykeforloep() {
    yield put(henterSykeforloepSyfosoknad());
    try {
        const data = yield call(get, `${hentApiUrl()}/sykeforloep`);
        yield put(sykeforloepSyfosoknadHentet(data));
    } catch (e) {
        log(e);
        yield put(hentSykeforloepSyfosoknadFeilet());
    }
}

export function* hentSykeforloepSyfosoknad() {
    const skalHente = yield select(skalHenteSykeforloep);
    if (skalHente) {
        yield* oppdaterSykeforloep();
    }
}

function* watchHentSykeforloepSyfosoknad() {
    yield takeEvery([
        HENT_SYKEFORLOEP_SYFOSOKNAD_FORESPURT,
    ], hentSykeforloepSyfosoknad);
}

function* watchOppdaterSykeforloep() {
    yield takeEvery([
        SYKMELDING_SENDT,
        SYKMELDING_BEKREFTET,
        SYKMELDING_GJENAAPNET,
    ], oppdaterSykeforloep);
}

export default function* sykeforloepSyfosoknadSagas() {
    yield all([
        fork(watchHentSykeforloepSyfosoknad),
        fork(watchOppdaterSykeforloep),
    ]);
}
