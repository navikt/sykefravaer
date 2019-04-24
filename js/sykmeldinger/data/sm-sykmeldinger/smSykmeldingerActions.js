export const SM_SYKMELDINGER_HENTET = 'SM_SYKMELDINGER_HENTET';
export const HENTER_SM_SYKMELDINGER = 'HENTER_SM_SYKMELDINGER';
export const HENT_SM_SYKMELDINGER_FEILET = 'HENT_SM_SYKMELDINGER_FEILET';
export const HENT_SM_SYKMELDINGER_FORESPURT = 'HENT_SM_SYKMELDINGER_FORESPURT';

export const smSykmeldingerHentet = (data) => {
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
