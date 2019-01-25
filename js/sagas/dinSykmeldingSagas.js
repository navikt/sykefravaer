import { call, put, fork, takeEvery, all } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { post, log, arbeidssituasjoner } from '@navikt/digisyfo-npm';
import * as actions from '../actions/dinSykmelding_actions';
import { skalOppretteSoknadHentet } from '../actions/sykmeldingMeta_actions';
import * as actiontyper from '../actions/actiontyper';

const gaTilKvittering = (sykmeldingId) => {
    browserHistory.push(`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/${sykmeldingId}/kvittering`);
};

const gaTilSykmelding = (sykmeldingId) => {
    browserHistory.push(`${process.env.REACT_APP_CONTEXT_ROOT}/sykmeldinger/${sykmeldingId}/`);
};

const erFrilanserEllerSelvstendig = (verdier) => {
    return verdier.arbeidssituasjon === arbeidssituasjoner.FRILANSER
        || verdier.arbeidssituasjon === arbeidssituasjoner.NAERINGSDRIVENDE;
};

export function* bekreftSykmelding(action) {
    yield put(actions.bekrefterSykmelding());
    try {
        const { sykmeldingId, verdier } = action;
        const body = {
            feilaktigeOpplysninger: verdier.feilaktigeOpplysninger,
            arbeidssituasjon: verdier.arbeidssituasjon,
            harForsikring: erFrilanserEllerSelvstendig(verdier)
                ? verdier.harForsikring : null,
            harAnnetFravaer: erFrilanserEllerSelvstendig(verdier)
                ? verdier.harAnnetFravaer : null,
            egenmeldingsperioder: erFrilanserEllerSelvstendig(verdier)
                ? verdier.egenmeldingsperioder : null,
        };
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/bekreft`, body);
        const skalOppretteSoknad = yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/skalOppretteSoknad`, {
            harForsikring: verdier.harForsikring,
            egenmeldingsperioder: verdier.egenmeldingsperioder,
        });
        yield put(skalOppretteSoknadHentet(sykmeldingId, skalOppretteSoknad));
        yield put(actions.setArbeidssituasjon(verdier.arbeidssituasjon, sykmeldingId));
        yield put(actions.sykmeldingBekreftet(sykmeldingId));
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
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${sykmeldingId}/actions/send`, body);
        yield put(actions.sykmeldingSendt(sykmeldingId));
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
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/avbryt`, body);
        yield put(actions.sykmeldingAvbrutt(action.sykmeldingId));
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.avbrytSykmeldingFeilet());
    }
}

export function* gjenaapneSykmelding(action) {
    yield put(actions.gjenaapnerSykmelding());
    try {
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/gjenaapne`);
        yield put(actions.sykmeldingGjenaapnet(action.sykmeldingId));
    } catch (e) {
        log(e);
        yield put(actions.gjenaapneSykmeldingFeilet());
    }
}

export function* angreBekreftSykmelding(action) {
    yield put(actions.angrerBekreftSykmelding());
    try {
        yield call(post, `${process.env.REACT_APP_SYFOREST_ROOT}/sykmeldinger/${action.sykmeldingId}/actions/gjenaapne`);
        yield put(actions.bekreftSykmeldingAngret(action.sykmeldingId));
        if (window.location.href.indexOf('sykmeldinger') === -1) {
            gaTilSykmelding(action.sykmeldingId);
        }
    } catch (e) {
        log(e);
        yield put(actions.angreBekreftSykmeldingFeilet());
    }
}

function* watchAngreBekreftSykmelding() {
    yield takeEvery(actiontyper.ANGRE_BEKREFT_SYKMELDING_FORESPURT, angreBekreftSykmelding);
}

function* watchAvbrytSykmelding() {
    yield takeEvery(actiontyper.AVBRYT_SYKMELDING_FORESPURT, avbrytSykmelding);
}

function* watchGjenaapneSykmelding() {
    yield takeEvery(actiontyper.GJENAAPNE_SYKMELDING_FORESPURT, gjenaapneSykmelding);
}

function* watchSendSykmelding() {
    yield takeEvery(actiontyper.SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT, sendSykmeldingTilArbeidsgiver);
}

function* watchBekreftSykmelding() {
    yield takeEvery(actiontyper.BEKREFT_SYKMELDING_FORESPURT, bekreftSykmelding);
}

export default function* dinSykmeldingSagas() {
    yield all([
        fork(watchAvbrytSykmelding),
        fork(watchGjenaapneSykmelding),
        fork(watchSendSykmelding),
        fork(watchBekreftSykmelding),
        fork(watchAngreBekreftSykmelding),
    ]);
}
