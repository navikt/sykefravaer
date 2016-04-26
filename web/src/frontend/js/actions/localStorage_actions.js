export function skjulUnderUtviklingVarsel() {
    window.localStorage.setItem('skjulUnderUtviklingVarsel', true);
    return {
        type: 'SKJUL_UNDER_UTVIKLING_VARSEL',
    };
}
