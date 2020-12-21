export const skalHenteSykepengerVarsel = (state) => {
    return !state.sykepengerVarsel.hentet
        && !state.sykepengerVarsel.henter
        && !state.sykepengerVarsel.hentingFeilet;
};

export const selectSykepengerVarsel = (state) => {
    return state.sykepengerVarsel.data;
}
