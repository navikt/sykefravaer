import erSykmeldingGyldigForOppfolgingMedGrensedato
    from '../oppfolgingsdialogNpm/erSykmeldingGyldigForOppfolgingMedGrensedato';

export const sykmeldtHarNaermestelederHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) =>
    naermesteLedere.filter(leder => virksomhetsnummer === leder.orgnummer).length > 0;

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
    const naermesteLeder = naermesteLedere.filter(leder => virksomhetsnummer === leder.orgnummer)[0];
    return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger) => {
    const tomGrenseDato = new Date();
    return sykmeldinger
        .filter(sykmelding => sykmelding.orgnummer !== null && sykmelding.orgnummer)
        .filter(sykmelding => erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, tomGrenseDato)).length > 0;
};

export const erSykmeldingAktiv = (sykmelding) => {
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);
    return sykmelding.mulighetForArbeid
        && sykmelding.mulighetForArbeid.perioder
            .filter(periode => new Date(periode.tom) >= new Date(dagensDato)).length > 0;
};

export const finnArbeidsgivereForAktiveSykmeldinger = (sykmeldinger, naermesteLedere) =>
    sykmeldinger
        .filter(sykmelding => erSykmeldingAktiv(sykmelding))
        .map(sykmelding => ({
            virksomhetsnummer: sykmelding.orgnummer,
            navn: sykmelding.arbeidsgiver,
            harNaermesteLeder: sykmeldtHarNaermestelederHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
            naermesteLeder: finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
        }))
        .filter((sykmelding, idx, self) => self
            .findIndex(t =>
                t.virksomhetsnummer === sykmelding.virksomhetsnummer && sykmelding.virksomhetsnummer !== null)
            === idx);

export const skalViseOppfoelgingsdialogLenke = (sykmeldinger, oppfolgingsdialoger) =>
    sykmeldtHarGyldigSykmelding(sykmeldinger) || oppfolgingsdialoger.data.length > 0;

export const getTidligsteStartdatoSykeforloep = sykepengesoknad =>
    (sykepengesoknad.oppfoelgingsdato && sykepengesoknad.oppfoelgingsdato < sykepengesoknad.identdato
        ? sykepengesoknad.oppfoelgingsdato
        : sykepengesoknad.identdato);

export const getSykmeldtFornavn = sykmelding => (sykmelding.pasient.mellomnavn
    ? `${sykmelding.pasient.fornavn} ${sykmelding.pasient.mellomnavn}`
    : `${sykmelding.pasient.fornavn}`);
