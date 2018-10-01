export const skalHenteDineSykmeldinger = (state) => {
    return !state.dineSykmeldinger.henter
        && !state.dineSykmeldinger.hentet
        && !state.dineSykmeldinger.hentingFeilet;
};
