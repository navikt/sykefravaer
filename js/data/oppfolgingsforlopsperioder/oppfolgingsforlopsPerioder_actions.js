export const HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT = 'HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT';
export const HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER = 'HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER';
export const HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET = 'HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET';
export const HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET = 'HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET';

export const hentOppfolgingsforlopsPerioder = virksomhetsnummer => ({
    type: HENT_OPPFOLGINGSFORLOPSPERIODER_FORESPURT,
    virksomhetsnummer,
});

export const hentOppfolgingsforlopsPerioderHenter = virksomhetsnummer => ({
    type: HENT_OPPFOLGINGSFORLOPSPERIODER_HENTER,
    virksomhetsnummer,
});

export const hentOppfolgingsforlopsPerioderHentet = (periodeListe, virksomhetsnummer) => ({
    type: HENT_OPPFOLGINGSFORLOPSPERIODER_HENTET,
    periodeListe,
    virksomhetsnummer,
});

export const hentOppfolgingsforlopsPerioderFeilet = virksomhetsnummer => ({
    type: HENT_OPPFOLGINGSFORLOPSPERIODER_FEILET,
    virksomhetsnummer,
});
