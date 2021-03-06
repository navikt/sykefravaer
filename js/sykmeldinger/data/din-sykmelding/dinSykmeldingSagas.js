import {
    all, call, fork, put, takeEvery,
} from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { arbeidssituasjoner, log, post } from '../../../digisyfoNpm';
import * as actions from './dinSykmeldingActions';
import { skalOppretteSoknadHentet } from '../sykmelding-meta/sykmeldingMetaActions';
import { hentApiUrl } from '../../../data/gateway-api';
import { erNaisLabsDemo } from '../../../utils/urlUtils';
import { convertToFomTomIsoDate } from '../../../utils/datoUtils';

const {
    ANGRE_BEKREFT_SYKMELDING_FORESPURT,
    GJENAAPNE_SYKMELDING_FORESPURT,
    AVBRYT_SYKMELDING_FORESPURT,
    SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT,
    BEKREFT_SYKMELDING_FORESPURT,
} = actions;

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

const getSykmeldingerBackendUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://sykmelding-gateway.nav.no/sykmeldinger-backend/api/v1/sykmeldinger';
    }
    if (url.indexOf('localhost:2027') > -1) {
        return 'http://localhost:6998/api/v1/sykmeldinger';
    }
    if (url.indexOf('localhost:2028') > -1) {
        return 'http://localhost:6998/api/v1/sykmeldinger';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/sykmeldinger-backend';
    }
    // Preprod
    return 'https://sykmelding-gateway.dev.nav.no/sykmeldinger-backend/api/v1/sykmeldinger';
};

export function* bekreftSykmelding(action) {
    yield put(actions.bekrefterSykmelding());
    const url = getSykmeldingerBackendUrl();
    try {
        const { sykmeldingId, verdier } = action;
        const sporsmalOgSvarListe = [{
            tekst: 'Jeg er sykmeldt fra',
            shortName: 'ARBEIDSSITUASJON',
            svartype: 'ARBEIDSSITUASJON',
            svar: verdier.arbeidssituasjon,
        }];
        if (erFrilanserEllerSelvstendig(verdier)) {
            if (verdier.harForsikring != null) {
                sporsmalOgSvarListe.push({
                    tekst: 'Har du forsikring som gjelder de første 16 dagene av sykefraværet?',
                    shortName: 'FORSIKRING',
                    svartype: 'JA_NEI',
                    svar: verdier.harForsikring ? 'JA' : 'NEI',
                });
            }
            if (verdier.harAnnetFravaer != null) {
                sporsmalOgSvarListe.push({
                    tekst: 'Brukte du egenmelding eller noen annen sykmelding før datoen denne sykmeldingen gjelder fra?',
                    shortName: 'FRAVAER',
                    svartype: 'JA_NEI',
                    svar: verdier.harAnnetFravaer ? 'JA' : 'NEI',
                });
            }
            if (verdier.egenmeldingsperioder != null) {
                sporsmalOgSvarListe.push({
                    tekst: 'Hvilke dager var du borte fra jobb før datoen sykmeldingen gjelder fra?',
                    shortName: 'PERIODE',
                    svartype: 'PERIODER',
                    svar: JSON.stringify(convertToFomTomIsoDate(verdier.egenmeldingsperioder)),
                });
            }
        }
        const body = {
            sporsmalOgSvarListe,
        };
        yield call(post, `${url}/${sykmeldingId}/bekreft`, body);
        const skalOppretteSoknad = yield call(post, `${hentApiUrl()}/sykmeldinger/${sykmeldingId}/actions/skalOppretteSoknad`, {
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
    const url = getSykmeldingerBackendUrl();
    const { type, sykmeldingId, ...body } = action;
    try {
        yield call(post, `${url}/${sykmeldingId}/send`, body);
        yield put(actions.sykmeldingSendt(sykmeldingId));
        gaTilKvittering(sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.sendSykmeldingFeilet());
    }
}

export function* avbrytSykmelding(action) {
    yield put(actions.avbryterSykmelding());
    const url = `${getSykmeldingerBackendUrl()}`;
    try {
        yield call(post, `${url}/${action.sykmeldingId}/avbryt`);
        yield put(actions.sykmeldingAvbrutt(action.sykmeldingId));
        gaTilKvittering(action.sykmeldingId);
    } catch (e) {
        log(e);
        yield put(actions.avbrytSykmeldingFeilet());
    }
}

export function* gjenaapneSykmelding(action) {
    yield put(actions.gjenaapnerSykmelding());
    const url = getSykmeldingerBackendUrl();
    try {
        yield call(post, `${url}/${action.sykmeldingId}/gjenapne`);
        yield put(actions.sykmeldingGjenaapnet(action.sykmeldingId));
    } catch (e) {
        log(e);
        yield put(actions.gjenaapneSykmeldingFeilet());
    }
}

export function* angreBekreftSykmelding(action) {
    yield put(actions.angrerBekreftSykmelding());
    const url = getSykmeldingerBackendUrl();
    try {
        yield call(post, `${url}/${action.sykmeldingId}/gjenapne`);
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
    yield takeEvery(ANGRE_BEKREFT_SYKMELDING_FORESPURT, angreBekreftSykmelding);
}

function* watchAvbrytSykmelding() {
    yield takeEvery(AVBRYT_SYKMELDING_FORESPURT, avbrytSykmelding);
}

function* watchGjenaapneSykmelding() {
    yield takeEvery(GJENAAPNE_SYKMELDING_FORESPURT, gjenaapneSykmelding);
}

function* watchSendSykmelding() {
    yield takeEvery(SEND_SYKMELDING_TIL_ARBEIDSGIVER_FORESPURT, sendSykmeldingTilArbeidsgiver);
}

function* watchBekreftSykmelding() {
    yield takeEvery(BEKREFT_SYKMELDING_FORESPURT, bekreftSykmelding);
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
