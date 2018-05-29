import { combineReducers } from 'redux';
import * as actiontyper from '../actions/actiontyper';
import { SEND_SKJEMA_FEILET, SEND_SKJEMA_FEILET_HANDTERT } from '../enums/reduxFormMetaEnums';
import { SYKEPENGER_SKJEMANAVN } from '../utils/sykepengesoknadUtils';
import { DIN_SYKMELDING_SKJEMANAVN } from '../enums/sykmeldingskjemaenums';

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

const genererReducer = (skjemanavn) => {
    return (state = defaultState, action = {}) => {
        if (action.skjemanavn === skjemanavn) {
            return skjemafeil(state, action);
        }
        return state;
    };
};

const reducers = {};
reducers[DIN_SYKMELDING_SKJEMANAVN] = genererReducer(DIN_SYKMELDING_SKJEMANAVN);
reducers[SYKEPENGER_SKJEMANAVN] = genererReducer(SYKEPENGER_SKJEMANAVN);

const rootReduxer = combineReducers(reducers);

export default rootReduxer;
