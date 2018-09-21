export const skalHenteArbeidsgiversSykmeldinger = (state) => {
    return !state.arbeidsgiversSykmeldinger.henter
        && !state.arbeidsgiversSykmeldinger.hentet;
};
