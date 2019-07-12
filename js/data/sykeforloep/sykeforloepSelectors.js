export const skalHenteSykeforloep = state => !state.sykeforloep.hentet
        && !state.sykeforloep.henter
        && !state.sykeforloep.hentingFeilet;
