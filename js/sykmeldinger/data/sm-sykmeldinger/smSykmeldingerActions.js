export const SM_SYKMELDINGER_HENTET = 'SM_SYKMELDINGER_HENTET';
export const HENTER_SM_SYKMELDINGER = 'HENTER_SM_SYKMELDINGER';
export const HENT_SM_SYKMELDINGER_FEILET = 'HENT_SM_SYKMELDINGER_FEILET';
export const HENT_SM_SYKMELDINGER_FORESPURT = 'HENT_SM_SYKMELDINGER_FORESPURT';
export const BEKREFTER_LEST_SM_SYKMELDING = 'BEKREFTER_LEST_SM_SYKMELDING';
export const SM_SYKMELDING_BEKREFTET_LEST = 'SM_SYKMELDING_BEKREFTET_LEST';
export const BEKREFT_LEST_SM_SYKMELDING_FORESPURT = 'BEKREFT_LEST_SM_SYKMELDING_FORESPURT';
export const SM_SYKMELDING_BEKREFT_LEST_FEILET = 'SM_SYKMELDING_BEKREFT_LEST_FEILET';
export const KVITTERING_VIST_LENGE_NOK = 'KVITTERING_VIST_LENGE_NOK';

export const smSykmeldingerHentet = (data = []) => ({
    type: SM_SYKMELDINGER_HENTET,
    data,
});

export const henterSmSykmeldinger = () => ({
    type: HENTER_SM_SYKMELDINGER,
});

export const hentSmSykmeldingerFeilet = () => ({
    type: HENT_SM_SYKMELDINGER_FEILET,
});

export const hentSmSykmeldinger = () => ({
    type: HENT_SM_SYKMELDINGER_FORESPURT,
});

export const bekreftSmSykmeldingLest = smSykmelding => ({
    type: BEKREFT_LEST_SM_SYKMELDING_FORESPURT,
    smSykmelding,
});

export const bekrefterLestSmSykmelding = () => ({
    type: BEKREFTER_LEST_SM_SYKMELDING,
});

export const bekreftSmSykmeldingKvitteringVistLengeNok = () => ({
    type: KVITTERING_VIST_LENGE_NOK,
});

export const smSykmeldingBekreftetLest = smSykmelding => ({
    type: SM_SYKMELDING_BEKREFTET_LEST,
    smSykmelding,
});

export const smSykmeldingBekreftLestFeilet = () => ({
    type: SM_SYKMELDING_BEKREFT_LEST_FEILET,
});
