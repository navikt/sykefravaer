import { INVALID } from '../../../enums/behandlingsutfallstatuser';

export const smSykmeldingerSliceSelector = state => state.smSykmeldinger;

export const henterSmSykmeldingerSelector = state => smSykmeldingerSliceSelector(state).henter;

export const hentingFeiletSmSykmeldingerSelector = state => smSykmeldingerSliceSelector(state).hentingFeilet;

export const hentetSmSykmeldingerSelector = state => smSykmeldingerSliceSelector(state).hentet;

export const skalHenteSmSykmeldingerSelector = state => !henterSmSykmeldingerSelector(state)
        && !hentetSmSykmeldingerSelector(state);

export const skalBekrefteSmSykmeldingSelector = state => !smSykmeldingerSliceSelector(state).bekrefter;

export const smSykmeldingerDataSelector = state => smSykmeldingerSliceSelector(state).data;

export const avvisteSmSykmeldingerDataSelector = state => smSykmeldingerDataSelector(state)
    .filter(sykmelding => sykmelding.behandlingsutfall.status === INVALID);

export const visAvvistSykmeldingBekreftetLestKvittering = state => smSykmeldingerSliceSelector(state).visKvittering;

export const smSykmeldingSelector = (state, sykmeldingId) => smSykmeldingerDataSelector(state).find(sykmelding => sykmelding.id === sykmeldingId);
