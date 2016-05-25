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
            return Object.assign(state, {
                henter: false,
                hentingFeilet: false,
            }, {
                data: action.data,
            });
        }
        default: {
            return state;
        }
    }
}
