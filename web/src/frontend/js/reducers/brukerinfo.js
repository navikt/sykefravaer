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

const hentVarsel = (state) => {
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
                    skjulUnderUtviklingVarsel: hentVarsel(state),
                },
                henter: false,
                hentingFeilet: true,
            });
        }
        case 'HENTER_BRUKERINFO': {
            return {
                data: {
                    skjulUnderUtviklingVarsel: hentVarsel(state),
                },
                henter: true,
                hentingFeilet: false,
            };
        }
        case 'SET_BRUKERINFO': {
            const data = Object.assign({}, action.data, {
                skjulUnderUtviklingVarsel: hentVarsel(state),
            });
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
