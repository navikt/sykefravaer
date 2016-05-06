const initiellState = {
    skjulUnderUtviklingVarsel: window.localStorage.getItem('skjulUnderUtviklingVarsel') === 'true',
};

export default function localStorage(state = initiellState, action) {
    if (action.type === 'SKJUL_UNDER_UTVIKLING_VARSEL') {
        return {
            skjulUnderUtviklingVarsel: true,
        };
    }
    return state;
}
