export const smSykmeldingerSliceSelector = (state) => {
    return state.smSykmeldinger;
};

export const skalHenteSmSykmeldingerSelector = (state) => {
    const smSykmeldinger = smSykmeldingerSliceSelector(state);
    return !smSykmeldinger.henter && !smSykmeldinger.hentet;
};
