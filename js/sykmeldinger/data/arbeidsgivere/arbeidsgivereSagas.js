import {
    call, fork, put, select, takeEvery,
} from 'redux-saga/effects';
import { get, log } from '../../../digisyfoNpm';
import * as actions from './arbeidsgivereActions';
import { toggleSykmeldingerBackendArbeidsforhold, unleashtogglesHentetSelector } from '../../../data/unleash-toggles/unleashTogglesSelectors';
import { HENTET_UNLEASH_TOGGLES } from '../../../data/unleash-toggles/unleashToggles_actions';
import { erNaisLabsDemo, getSyforestRoot } from '../../../utils/urlUtils';

const { HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT } = actions;

const getSykmeldingerBackendUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://sykmeldinger-backend-proxy.nav.no/api/v1/syforest/arbeidsforhold';
    }
    if (url.indexOf('localhost:2027') > -1) {
        return 'http://localhost:6998/api/v1/syforest/arbeidsforhold';
    }
    if (url.indexOf('localhost:2028') > -1) {
        return 'http://localhost:6998/api/v1/syforest/arbeidsforhold';
    }
    if (url.indexOf('localhost') > -1 || erNaisLabsDemo()) {
        // Lokalt
        return '/sykmeldinger-backend';
    }
    // Preprod
    return 'https://sykmeldinger-backend-proxy.dev.nav.no/api/v1/syforest/arbeidsforhold';
};

export const skalHenteArbeidsgivere = (state, sykmeldingId) => {
    return state.arbeidsgivere.sykmeldingId !== sykmeldingId;
};

export function* hentDineArbeidsgivere(action) {
    const { sykmeldingId } = action;
    const skalHente = yield select(skalHenteArbeidsgivere, sykmeldingId);
    if (skalHente) {
        const togglesHentet = yield select(unleashtogglesHentetSelector);
        const toggleNewUrl = yield select(toggleSykmeldingerBackendArbeidsforhold);
        if (togglesHentet) {
            const url = toggleNewUrl ? `${getSykmeldingerBackendUrl()}` : `${getSyforestRoot()}/informasjon/arbeidsgivere`;
            yield put(actions.henterAktuelleArbeidsgivere(sykmeldingId));
            try {
                const data = yield call(get, `${url}?sykmeldingId=${sykmeldingId}`);
                yield put(actions.aktuelleArbeidsgivereHentet(sykmeldingId, data));
            } catch (e) {
                log(e);
                yield put(actions.hentAktuelleArbeidsgivereFeilet(sykmeldingId));
            }
        }
    }
}

function* watchHentArbeidsgivere() {
    yield takeEvery([HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT, HENTET_UNLEASH_TOGGLES], hentDineArbeidsgivere);
}

export default function* arbeidsgivereSagas() {
    yield fork(watchHentArbeidsgivere);
}
