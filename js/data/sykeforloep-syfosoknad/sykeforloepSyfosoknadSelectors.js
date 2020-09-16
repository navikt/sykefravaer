export const skalHenteSykeforloep = (state) => {
    return !state.sykeforloepSyfosoknad.hentet
        && !state.sykeforloepSyfosoknad.henter
        && !state.sykeforloepSyfosoknad.hentingFeilet;
};
