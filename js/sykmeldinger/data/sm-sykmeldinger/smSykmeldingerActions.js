export const SM_SYKMELDINGER_HENTET = 'SM_SYKMELDINGER_HENTET';
export const HENTER_SM_SYKMELDINGER = 'HENTER_SM_SYKMELDINGER';
export const HENT_SM_SYKMELDINGER_FEILET = 'HENT_SM_SYKMELDINGER_FEILET';
export const HENT_SM_SYKMELDINGER_FORESPURT = 'HENT_SM_SYKMELDINGER_FORESPURT';
export const BEKREFTER_LEST_SM_SYKMELDING = 'BEKREFTER_LEST_SM_SYKMELDING';
export const SM_SYKMELDING_BEKREFTET_LEST = 'SM_SYKMELDING_BEKREFTET_LEST';
export const BEKREFT_LEST_SM_SYKMELDING_FORESPURT = 'BEKREFT_LEST_SM_SYKMELDING_FORESPURT';
export const SM_SYKMELDING_BEKREFT_LEST_FEILET = 'SM_SYKMELDING_BEKREFT_LEST_FEILET';

export const smSykmeldingerHentet = (data = []) => {
    return {
        type: SM_SYKMELDINGER_HENTET,
        data,
    };
};

export const henterSmSykmeldinger = () => {
    return {
        type: HENTER_SM_SYKMELDINGER,
    };
};

export const hentSmSykmeldingerFeilet = () => {
    return {
        type: HENT_SM_SYKMELDINGER_FEILET,
    };
};

export const hentSmSykmeldinger = () => {
    return {
        type: HENT_SM_SYKMELDINGER_FORESPURT,
    };
};

export const bekreftSmSykmeldingLest = (smSykmelding) => {
    return {
        type: BEKREFT_LEST_SM_SYKMELDING_FORESPURT,
        smSykmelding,
    };
};

export const bekrefterLestSmSykmelding = () => {
    return {
        type: BEKREFTER_LEST_SM_SYKMELDING,
    };
};

export const smSykmeldingBekreftetLest = () => {
    return {
        type: SM_SYKMELDING_BEKREFTET_LEST,
    };
};

export const smSykmeldingBekreftLestFeilet = () => {
    return {
        type: SM_SYKMELDING_BEKREFT_LEST_FEILET,
    };
};
