import { INVALID } from '../../../enums/behandlingsutfallstatuser';

export const smSykmeldingerSliceSelector = (state) => {
    return state.smSykmeldinger;
};

export const henterSmSykmeldingerSelector = (state) => {
    return smSykmeldingerSliceSelector(state).henter;
};

export const hentingFeiletSmSykmeldingerSelector = (state) => {
    return smSykmeldingerSliceSelector(state).hentingFeilet;
};

export const hentetSmSykmeldingerSelector = (state) => {
    return smSykmeldingerSliceSelector(state).hentet;
};

export const skalHenteSmSykmeldingerSelector = (state) => {
    return !henterSmSykmeldingerSelector(state)
        && !hentetSmSykmeldingerSelector(state);
};

export const skalBekrefteSmSykmeldingSelector = (state) => {
    return !smSykmeldingerSliceSelector(state).bekrefter;
};

export const smSykmeldingerDataSelector = (state) => {
    return smSykmeldingerSliceSelector(state).data;
};

export const avvisteSmSykmeldingerDataSelector = (state) => {
    return smSykmeldingerDataSelector(state)
        .filter((sykmelding) => {
            return sykmelding.behandlingsutfall.status === INVALID;
        });
};

export const visAvvistSykmeldingBekreftetLestKvittering = (state) => {
    return smSykmeldingerSliceSelector(state).visKvittering;
};

export const smSykmeldingSelector = (state, sykmeldingId) => {
    return smSykmeldingerDataSelector(state).find((sykmelding) => {
        return sykmelding.id === sykmeldingId;
    });
};
