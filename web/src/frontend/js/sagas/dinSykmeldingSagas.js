import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { browserHistory } from 'react-router';
import { log } from 'digisyfo-npm';
import { post } from '../api';
import * as actions from '../actions/dinSykmelding_actions';
import * as dineSykmeldingerActions from '../actions/dineSykmeldinger_actions';
import * as arbeidsgiversSykmeldingerActions from '../actions/arbeidsgiversSykmeldinger_actions';
import * as actiontyper from '../actions/actiontyper';

const gaTilKvittering = (sykmeldingId) => {
    browserHistory.push(`/sykefravaer/sykmeldinger/${sykmeldingId}/kvittering`);
};

export function* bekreftSykmelding(action) {
    yield put(actions.bekrefterSykmelding());
    try {
        const body = {
            arbeidssituasjon: action.arbeidssituasjon,
            feilaktigeOpplysninger: action.feilaktigeOpplysninger,
        };
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/bekreft`, body);
        yield put(actions.sykmeldingBekreftet(action.sykmeldingId));
        yield put(dineSykmeldingerActions.hentDineSykmeldinger());
        yield put(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.bekreftSykmeldingFeilet());
    }
}

export function* sendSykmeldingTilArbeidsgiver(action) {
    yield put({ type: actiontyper.SENDER_SYKMELDING });
    const body = {
        feilaktigeOpplysninger: action.feilaktigeOpplysninger,
        beOmNyNaermesteLeder: action.beOmNyNaermesteLeder,
        orgnummer: action.orgnummer,
    };
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/send`, body);
        yield put(actions.sykmeldingSendt(action.sykmeldingId));
        yield put(dineSykmeldingerActions.hentDineSykmeldinger());
        yield put(arbeidsgiversSykmeldingerActions.hentArbeidsgiversSykmeldinger());
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.sendSykmeldingFeilet());
    }
}

export function* avbrytSykmelding(action) {
    yield put({ type: actiontyper.AVBRYTER_SYKMELDING });
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
    yield put({ type: actiontyper.GJENAAPNER_SYKMELDING });
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
    ];
}
