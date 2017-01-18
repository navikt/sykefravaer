import { combineReducers } from 'redux';
import * as actiontyper from '../actions/actiontyper';

let innstillingerInitState;

try {
    innstillingerInitState = {
        skjulUnderUtviklingVarsel: window.localStorage.getItem('skjulUnderUtviklingVarsel') === 'true',
    };
} catch (e) {
    innstillingerInitState = {
        skjulUnderUtviklingVarsel: false,
    };
}

function innstillinger(state = innstillingerInitState, action) {
    switch (action.type) {
        case actiontyper.SKJUL_UNDER_UTVIKLING_VARSEL: {
            return {
                skjulUnderUtviklingVarsel: true,
            };
        }
        case actiontyper.SET_TIDSLINJE_ARBEIDSSITUASJON: {
            return Object.assign({}, state, {
                arbeidssituasjon: action.arbeidssituasjon,
            });
        }
        default: {
            return state;
        }
    }
}

function bruker(state = {}, action) {
    switch (action.type) {
        case actiontyper.HENT_BRUKERINFO_FEILET: {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case actiontyper.HENTER_BRUKERINFO: {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case actiontyper.SET_BRUKERINFO: {
            const data = Object.assign({}, state.data, action.data);
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
            }, {
                data,
            });
        }
        case actiontyper.BRUKER_ER_UTLOGGET: {
            return {
                henter: false,
                hentingFeilet: false,
                data: {
                    erInnlogget: false,
                },
            };
        }
        case actiontyper.BRUKER_ER_INNLOGGET: {
            const data = Object.assign({}, state.data, {
                erInnlogget: true,
            });
            return Object.assign({}, state, {
                henter: false,
                hentingFeilet: false,
                data,
            });
        }
        case actiontyper.SJEKKER_INNLOGGING: {
            return Object.assign({}, state, {
                henter: true,
                hentingFeilet: false,
            });
        }
        default: {
            return state;
        }
    }
}

const brukerinfo = combineReducers({
    bruker,
    innstillinger,
});

export default brukerinfo;
