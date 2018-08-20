import { fork, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { log } from 'digisyfo-npm';
import { SYKEPENGESOKNAD_SENDT, SYKMELDING_BEKREFTET, SYKMELDING_SENDT } from '../actions/actiontyper';
import { beregnVarighet } from '../utils/metrikkerUtils';
import { TID_INNSENDING_SYKEPENGESOKNAD_ARBEIDSTAKER, TID_INNSENDING_SYKMELDING } from '../enums/metrikkerEnums';

const hentMetrikktype = (type) => {
    return `SYKEFRAVAER_METRIKK__${type}`;
};

const pushToDataLayer = (metrikk) => {
    /* eslint-disable */
    window.dataLayer.push({
        'event': metrikk.type,
        'value': metrikk.data.tid,
        'data': JSON.stringify(metrikk.data),
    });
    /* eslint-enable */
};

const hentMetrikk = (state, action) => {
    switch (action.type) {
        case SYKMELDING_BEKREFTET:
        case SYKMELDING_SENDT: {
            const tid = beregnVarighet(state, {
                ressursId: action.sykmeldingId,
                type: TID_INNSENDING_SYKMELDING,
            });
            return {
                type: hentMetrikktype(SYKMELDING_SENDT),
                data: {
                    tid,
                },
            };
        }
        case SYKEPENGESOKNAD_SENDT: {
            const tid = beregnVarighet(state, {
                ressursId: action.sykepengesoknad.id,
                type: TID_INNSENDING_SYKEPENGESOKNAD_ARBEIDSTAKER,
            });
            return {
                type: hentMetrikktype(`${SYKEPENGESOKNAD_SENDT}_ARBEIDSTAKER`),
                data: {
                    tid,
                },
            };
        }
        default: {
            return null;
        }
    }
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
    yield* takeEvery([
        SYKMELDING_SENDT,
        SYKMELDING_BEKREFTET,
        SYKEPENGESOKNAD_SENDT,
    ], lagreMetrikk);
}

export default function* metrikkerSagas() {
    yield fork(watch);
}
