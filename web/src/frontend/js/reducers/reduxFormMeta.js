import * as actiontyper from '../actions/actiontyper';
import { SEND_SKJEMA_FEILET, SEND_SKJEMA_FEILET_HANDTERT } from '../enums/reduxFormMetaEnums';
import { combineReducers } from 'redux';
import { SYKEPENGER_SKJEMANAVN } from '../components/sykepengesoknad/setup';
import { DIN_SYKMELDING_SKJEMANAVN } from '../components/sykmeldingskjema/DinSykmeldingSkjema';

const defaultState = {};

const skjemafeil = (state, action) => {
    switch (action.type) {
        case actiontyper.SEND_SKJEMA_FEILET: {
            return {
                status: SEND_SKJEMA_FEILET,
                settFokus: true,
            };
        }
        case actiontyper.SEND_SKJEMA_FEILET_HANDTERT: {
            return {
                status: SEND_SKJEMA_FEILET,
                settFokus: false,
            };
        }
        case actiontyper.SKJEMA_ER_GYLDIG: {
            return {
                status: SEND_SKJEMA_FEILET_HANDTERT,
                settFokus: false,
            };
        }
        default: {
            return state;
        }
    }
};

function sykmeldingskjema(state = defaultState, action = {}) {
    if (action.skjemanavn === DIN_SYKMELDING_SKJEMANAVN) {
        return skjemafeil(state, action);
    }
    return state;
}

function sykepengesoknadskjema(state = defaultState, action = {}) {
    if (action.skjemanavn === SYKEPENGER_SKJEMANAVN) {
        return skjemafeil(state, action);
    }
    return state;
}

const reducers = {};
reducers[DIN_SYKMELDING_SKJEMANAVN] = sykmeldingskjema;
reducers[SYKEPENGER_SKJEMANAVN] = sykepengesoknadskjema;

const rootReduxer = combineReducers(reducers);

export default rootReduxer;
