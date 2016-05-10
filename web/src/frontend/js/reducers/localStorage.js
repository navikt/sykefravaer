let initiellState; 

try {
    initiellState = {
        skjulUnderUtviklingVarsel: window.localStorage.getItem('skjulUnderUtviklingVarsel') === 'true',
    };
} catch (e) {
    initiellState = {
        skjulUnderUtviklingVarsel: false,
    };
}

export default function localStorage(state = initiellState, action) {
    if (action.type === 'SKJUL_UNDER_UTVIKLING_VARSEL') {
        return {
            skjulUnderUtviklingVarsel: true,
        };
    }
    return state;
}
