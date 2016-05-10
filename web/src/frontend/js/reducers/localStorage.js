let initState;

try {
    initState = {
        skjulUnderUtviklingVarsel: window.localStorage.getItem('skjulUnderUtviklingVarsel') === 'true',
    };
} catch (e) {
    initState = {
        skjulUnderUtviklingVarsel: false,
    };
}

export default function localStorage(state = initState, action) {
    if (action.type === 'SKJUL_UNDER_UTVIKLING_VARSEL') {
        return {
            skjulUnderUtviklingVarsel: true,
        };
    }
    return state;
}
