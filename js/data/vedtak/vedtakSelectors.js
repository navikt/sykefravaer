export const skalHenteVedtak = (state) => {
    return !state.vedtak.henter
        && !state.vedtak.hentet
        && !state.vedtak.hentingFeilet;
};
