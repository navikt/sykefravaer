const initiellState = {
    skjulUnderUtviklingVarsel: window.localStorage.getItem('skjulUnderUtviklingVarsel') === 'true',
};

export default function localStorage(state = initiellState, action) {
    switch (action.type) {
        case 'SKJUL_UNDER_UTVIKLING_VARSEL':
            return {
                skjulUnderUtviklingVarsel: true,
            };
        default:
            return state;
    }
}
