export const skalHenteReisetilskuddSoknader = (state) => {
    return !state.reisetilskuddSoknader.henter
        && !state.reisetilskuddSoknader.hentet
        && !state.reisetilskuddSoknader.hentingFeilet;
};
