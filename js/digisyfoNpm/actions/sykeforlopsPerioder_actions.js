import * as actiontyper from './actiontyper';

export const hentSykeforlopsPerioder = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENT_SYKEFORLOPSPERIODER_FORESPURT,
        fnr,
        virksomhetsnummer,
    };
};

export const henterSykeforlopsPerioder = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENTER_SYKEFORLOPSPERIODER,
        fnr,
        virksomhetsnummer,
    };
};

export const sykeforlopsPerioderHentet = (periodeListe, fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.SYKEFORLOPSPERIODER_HENTET,
        periodeListe,
        fnr,
        virksomhetsnummer,
    };
};

export const hentSykeforlopsPerioderFeilet = (fnr, virksomhetsnummer) => {
    return {
        type: actiontyper.HENT_SYKEFORLOPSPERIODER_FEILET,
        fnr,
        virksomhetsnummer,
    };
};
