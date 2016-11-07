import { call, put, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { post } from '../api';
import * as actions from '../actions/dinSykmelding_actions';
import { browserHistory } from 'react-router';

const gaTilKvittering = (sykmeldingId) => {
    browserHistory.push(`/sykefravaer/sykmeldinger/${sykmeldingId}/kvittering`);
};

export function* bekreftSykmelding(action) {
    yield put({ type: 'BEKREFTER_SYKMELDING' });
    try {
        const body = {
            arbeidssituasjon: action.arbeidssituasjon,
            feilaktigeOpplysninger: action.feilaktigeOpplysninger,
        };
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/bekreft`, body);
        yield put(actions.sykmeldingBekreftet(action.sykmeldingId));
        yield put({ type: 'HENT_DINE_SYKMELDINGER_FORESPURT' });
        yield put({ type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT' });
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        yield put(actions.bekreftSykmeldingFeilet());
    }
}

export function* sendSykmeldingTilArbeidsgiver(action) {
    yield put({ type: 'SENDER_SYKMELDING' });
    const body = {
        feilaktigeOpplysninger: action.feilaktigeOpplysninger,
        beOmNyNaermesteLeder: action.beOmNyNaermesteLeder,
        orgnummer: action.orgnummer,
    };
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/send`, body);
        yield put(actions.sykmeldingSendt(action.sykmeldingId));
        yield put({ type: 'HENT_DINE_SYKMELDINGER_FORESPURT' });
        yield put({ type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT' });
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        yield put(actions.sendSykmeldingFeilet());
    }
}

export function* avbrytSykmelding(action) {
    yield put({ type: 'AVBRYTER_SYKMELDING' });
    const body = action.feilaktigeOpplysninger;
    try {
        yield call(post, `${window.APP_SETTINGS.REST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/avbryt`, body);
        yield put(actions.sykmeldingAvbrutt(action.sykmeldingId));
        yield put({ type: 'HENT_DINE_SYKMELDINGER_FORESPURT' });
        yield put({ type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FORESPURT' });
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        yield put(actions.avbrytSykmeldingFeilet());
    }
}

function* watchAvbrytSykmelding() {
    yield* takeEvery('AVBRYT_SYKMELDING_FORESPURT', avbrytSykmelding);
}

function* watchSendSykmelding() {
    yield* takeEvery('SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT', sendSykmeldingTilArbeidsgiver);
}

function* watchBekreftSykmelding() {
    yield* takeEvery('BEKREFT_SYKMELDING_FORESPURT', bekreftSykmelding);
}

export default function* dinSykmeldingSagas() {
    yield [
        fork(watchAvbrytSykmelding),
        fork(watchSendSykmelding),
        fork(watchBekreftSykmelding),
    ];
}
