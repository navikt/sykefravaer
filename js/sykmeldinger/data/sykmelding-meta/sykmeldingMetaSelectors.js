export const skalHenteVentetid = (state, sykmeldingId) => {
    const sykmeldingMeta = state.sykmeldingMeta[sykmeldingId]
        || {};
    return !sykmeldingMeta.henterVentetid
        && !sykmeldingMeta.hentVentetidFeilet
        && !sykmeldingMeta.ventetidHentet;
};

export const erUtenforVentetid = (state, sykmeldingId) => {
    const sykmeldingMeta = state.sykmeldingMeta[sykmeldingId]
        || {};
    return sykmeldingMeta.erUtenforVentetid;
};
