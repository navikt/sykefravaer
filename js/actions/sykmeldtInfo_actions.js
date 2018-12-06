import * as actiontyper from './actiontyper';

export const hentSykmeldtInfo = () => {
    return {
        type: actiontyper.HENT_SYKMELDT_INFO_FORESPURT,
    };
};

export const henterSykmeldtInfo = () => {
    return {
        type: actiontyper.HENTER_SYKMELDT_INFO,
    };
};

export const sykmeldtInfoHentet = (data) => {
    return {
        type: actiontyper.HENTET_SYKMELDT_INFO,
        data,
    };
};

export const hentSykmeldtInfoFeilet = () => {
    return {
        type: actiontyper.HENT_SYKEFORLOEP_FEILET,
    };
};
