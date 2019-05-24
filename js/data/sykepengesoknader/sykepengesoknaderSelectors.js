export const skalHenteSykepengesoknader = (state) => {
    return !state.sykepengesoknader.henter
        && !state.sykepengesoknader.hentet
        && !state.sykepengesoknader.hentingFeilet;
};
