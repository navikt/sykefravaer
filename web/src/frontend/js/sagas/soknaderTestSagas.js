import { call, fork, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log, getCookie } from 'digisyfo-npm';

export function* hentSoknaderTest() {
    yield put(henterSoknader());
    try {
        const data = yield call(get, 'https://syfoapi.nav.no/syfoapi/rest/soknad/soknader');
        yield put(soknaderHentet(data));
    } catch (e) {
        log(e);
        yield put(hentSoknaderFeilet());
    }
}

function* watchHentSoknaderTest() {
    yield* takeEvery(HENT_SOKNADER_TEST_FORESPURT, hentSoknaderTest);
}

export default function* soknaderTestSagas() {
    yield fork(watchHentSoknaderTest);
}

function get(url) {
    return fetch(url, {
        credentials: 'include',
    })
        .then((res) => {
            if (res.status === 401) {
                log(res, "Redirect til login");
                window.location.href = hentLoginUrl() + '?redirect=' + window.location.href.replace('/hemmelig', '');
            } else if (res.status > 400) {
                log(res);
                throw new Error('Forespørsel feilet');
            }
            return res.json();
        })
        .catch((err) => {
            log(err);
            throw err;
        });
}

const soknaderHentet = (soknader) => {
    return {
        type: SOKNADER_HENTET,
        soknader,
    };
};

const henterSoknader = () => {
    return {
        type: HENTER_SOKNADER,
    };
};

const hentSoknaderFeilet = () => {
    return {
        type: HENT_SOKNADER_FEILET,
    };
};

const hentLoginUrl = () => {
    if (window.location.href.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://loginservice.nav.no/login'
    } else if (window.location.href.indexOf('localhost') > -1) {
        // Lokalt
        return 'http://localhost:8080/syfoapi/local/cookie'
    } else {
        // Preprod
        return 'https://loginservice-q.nav.no/login'
    }
};

const HENT_SOKNADER_FEILET = 'HENT_SOKNADER_TEST_FEILET';
const HENT_SOKNADER_TEST_FORESPURT = 'HENT_SOKNADER_TEST_FORESPURT';
const HENTER_SOKNADER = 'HENTER_SOKNADER_TEST';
const SOKNADER_HENTET = 'SOKNADER_TEST_HENTE';