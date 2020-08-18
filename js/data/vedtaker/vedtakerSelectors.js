export const skalHenteVedtaker = (state) => {
    return !state.vedtaker.henter
        && !state.vedtaker.hentet
        && !state.vedtaker.hentingFeilet;
};
