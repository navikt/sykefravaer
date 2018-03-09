import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { browserHistory } from 'react-router';
import { post, log } from 'digisyfo-npm';
import * as actions from '../actions/dinSykmelding_actions';
import { skalOppretteSoknadHentet } from '../actions/sykmeldingMeta_actions';
import * as dineSykmeldingerActions from '../actions/dineSykmeldinger_actions';
import * as arbeidsgiversSykmeldingerActions from '../actions/arbeidsgiversSykmeldinger_actions';
import * as actiontyper from '../actions/actiontyper';

const gaTilKvittering = (sykmeldingId) => {
    browserHistory.push(`/sykefravaer/sykmeldinger/${sykmeldingId}/kvittering`);
};

export function* bekreftSykmelding(action) {
    yield put(actions.bekrefterSykmelding());
    try {
        const { type, sykmeldingId, dekningsgrad, egenmeldingsperioder, ...body } = action;
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${sykmeldingId}/actions/bekreft`, body);
        if (dekningsgrad || egenmeldingsperioder) {
            const skalOppretteSoknad = yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${sykmeldingId}/actions/skalOppretteSoknad`, {
                dekningsgrad, egenmeldingsperioder,
            });
            yield put(skalOppretteSoknadHentet(sykmeldingId, skalOppretteSoknad));
        }
        yield put(actions.sykmeldingBekreftet(sykmeldingId));
        yield put(dineSykmeldingerActions.hentDineSykmeldinger());
        yield put(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
        gaTilKvittering(sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.bekreftSykmeldingFeilet());
    }
}

export function* sendSykmeldingTilArbeidsgiver(action) {
    yield put(actions.senderSykmelding(action.sykmeldingId));
    const { type, sykmeldingId, ...body } = action;
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${sykmeldingId}/actions/send`, body);
        yield put(actions.sykmeldingSendt(sykmeldingId));
        yield put(dineSykmeldingerActions.hentDineSykmeldinger());
        yield put(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
        gaTilKvittering(sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.sendSykmeldingFeilet());
    }
}

export function* avbrytSykmelding(action) {
    yield put(actions.avbryterSykmelding());
    const body = action.feilaktigeOpplysninger;
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/avbryt`, body);
        yield put(actions.sykmeldingAvbrutt(action.sykmeldingId));
        yield put(dineSykmeldingerActions.hentDineSykmeldinger());
        yield put(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.avbrytSykmeldingFeilet());
    }
}

export function* gjenaapneSykmelding(action) {
    yield put(actions.gjenaapnerSykmelding());
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/gjenaapne`);
        yield put(actions.sykmeldingGjenaapnet(action.sykmeldingId));
        yield put(dineSykmeldingerActions.hentDineSykmeldinger());
        yield put(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
    } catch (e) {
        log(e);
        yield put(actions.gjenaapneSykmeldingFeilet());
    }
}

export function* angreBekreftSykmelding(action) {
    yield put(actions.angrerBekreftSykmelding());
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/gjenaapne`);
        yield put(actions.bekreftSykmeldingAngret(action.sykmeldingId));
        yield put(dineSykmeldingerActions.hentDineSykmeldinger());
        yield put(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
    } catch (e) {
        log(e);
        yield put(actions.angreBekreftSykmeldingFeilet());
    }
}

function* watchAngreBekreftSykmelding() {
    yield* takeEvery(actiontyper.ANGRE_BEKREFT_SYKMELDING_FORESPURT, angreBekreftSykmelding);
}

function* watchAvbrytSykmelding() {
    yield* takeEvery(actiontyper.AVBRYT_SYKMELDING_FORESPURT, avbrytSykmelding);
}

function* watchGjenaapneSykmelding() {
    yield* takeEvery(actiontyper.GJENAAPNE_SYKMELDING_FORESPURT, gjenaapneSykmelding);
}

function* watchSendSykmelding() {
    yield* takeEvery(actiontyper.SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT, sendSykmeldingTilArbeidsgiver);
}

function* watchBekreftSykmelding() {
    yield* takeEvery(actiontyper.BEKREFT_SYKMELDING_FORESPURT, bekreftSykmelding);
}

export default function* dinSykmeldingSagas() {
    yield [
        fork(watchAvbrytSykmelding),
        fork(watchGjenaapneSykmelding),
        fork(watchSendSykmelding),
        fork(watchBekreftSykmelding),
        fork(watchAngreBekreftSykmelding),
    ];
}
