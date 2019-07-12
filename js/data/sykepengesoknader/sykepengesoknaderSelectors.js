export const skalHenteSykepengesoknader = state => !state.sykepengesoknader.henter
        && !state.sykepengesoknader.hentet
        && !state.sykepengesoknader.hentingFeilet;
