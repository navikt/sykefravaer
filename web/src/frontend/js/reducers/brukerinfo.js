import { combineReducers } from 'redux';
import * as actiontyper from '../actions/actiontyper';

function innstillinger(state = {}, action) {
    switch (action.type) {
        case actiontyper.SET_TIDSLINJE_ARBEIDSSITUASJON: {
            return {
                ...state,
                arbeidssituasjon: action.arbeidssituasjon,
            };
        }
        default: {
            return state;
        }
    }
}

const defaultState = {
    erInnlogget: true,
    henter: false,
    hentingFeilet: false,
};

function innlogging(state = defaultState, action) {
    switch (action.type) {
        case actiontyper.BRUKER_ER_UTLOGGET: {
            return {
                erInnlogget: false,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.BRUKER_ER_INNLOGGET: {
            return {
                ...state,
                erInnlogget: true,
                henter: false,
                hentingFeilet: false,
            };
        }
        case actiontyper.SJEKKER_INNLOGGING: {
            return {
                ...state,
                henter: true,
                hentingFeilet: false,
            };
        }
        case actiontyper.SJEKK_INNLOGGING_FEILET: {
            return {
                erInnlogget: false,
                hentingFeilet: true,
                henter: false,
            };
        }
        default: {
            return state;
        }
    }
}

function bruker(state = { data: {} }, action) {
    switch (action.type) {
        case actiontyper.HENT_BRUKERINFO_FEILET: {
            return {
                ...state,
                data: {},
                henter: false,
                hentingFeilet: true,
                hentet: true,
            };
        }
        case actiontyper.HENTER_BRUKERINFO: {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
                hentet: false,
            };
        }
        case actiontyper.SET_BRUKERINFO: {
            const data = {
                ...state.data,
                ...action.data,
            };
            return {
                ...state,
                henter: false,
                hentingFeilet: false,
                hentet: true,
                data,
            };
        }
        default: {
            return state;
        }
    }
}

const brukerinfo = combineReducers({
    bruker,
    innstillinger,
    innlogging,
});

export default brukerinfo;
