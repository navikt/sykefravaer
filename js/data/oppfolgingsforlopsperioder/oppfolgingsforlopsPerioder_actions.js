import {
    HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
    HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER,
    HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET,
    HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET,
} from '../actiontyper';

export const hentOppfolgingsforlopsPerioder = (virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
        virksomhetsnummer,
    };
};

export const hentOppfolgingsforlopsPerioderHenter = (virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER,
        virksomhetsnummer,
    };
};

export const hentOppfolgingsforlopsPerioderHentet = (periodeListe, virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET,
        periodeListe,
        virksomhetsnummer,
    };
};

export const hentOppfolgingsforlopsPerioderFeilet = (virksomhetsnummer) => {
    return {
        type: HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET,
        virksomhetsnummer,
    };
};
