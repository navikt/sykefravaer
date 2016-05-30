let initState;

try {
    initState = {
        data: {
            skjulUnderUtviklingVarsel: window.localStorage.getItem('skjulUnderUtviklingVarsel') === 'true',
        },
    };
} catch (e) {
    initState = {
        data: {
            skjulUnderUtviklingVarsel: false,
        },
    };
}

const hentVarselState = (state) => {
    return (state.data && state.data.skjulUnderUtviklingVarsel) === true;
};

export default function brukerinfo(state = initState, action) {
    switch (action.type) {
        case 'SKJUL_UNDER_UTVIKLING_VARSEL': {
            const nyData = Object.assign({}, state.data, {
                skjulUnderUtviklingVarsel: true,
            });
            return Object.assign({}, state, {
                data: nyData,
            });
        }
        case 'HENT_BRUKERINFO_FEILET': {
            return Object.assign({}, state, {
                data: {
                    skjulUnderUtviklingVarsel: hentVarselState(state),
                },
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_BRUKERINFO': {
            return {
                data: {
                    skjulUnderUtviklingVarsel: hentVarselState(state),
                },
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'SET_BRUKERINFO': {
            const data = Object.assign({}, action.data, {
                skjulUnderUtviklingVarsel: hentVarselState(state),
            });
            return Object.assign(state, {
                henter: false,
                hentingFeilet: false,
            }, {
                data,
            });
        }
        case 'SET_ARBEIDSSITUASJON': {
            const data = Object.assign({}, state.data || {}, {
                arbeidssituasjon: action.arbeidssituasjon,
            });
            return Object.assign({}, state, {
                data,
            });
        }
        default: {
            return state;
        }
    }
}
