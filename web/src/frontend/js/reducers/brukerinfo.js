import { combineReducers } from 'redux';

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
        case 'SKJUL_UNDER_UTVIKLING_VARSEL': {
            return {
                skjulUnderUtviklingVarsel: true,
            };
        }
        case 'SET_TIDSLINJE_ARBEIDSSITUASJON': {
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
        case 'HENT_BRUKERINFO_FEILET': {
            return Object.assign({}, state, {
                data: {},
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_BRUKERINFO': {
            return {
                data: {},
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'SET_BRUKERINFO': {
            const data = Object.assign({}, action.data);
            return Object.assign(state, {
                henter: false,
                hentingFeilet: false,
            }, {
                data,
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
