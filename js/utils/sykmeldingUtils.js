import erSykmeldingGyldigForOppfolgingMedGrensedato from '../oppfolgingsdialogNpm/erSykmeldingGyldigForOppfolgingMedGrensedato';

export const sykmeldtHarNaermestelederHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
    return naermesteLedere.filter((leder) => {
        return virksomhetsnummer === leder.orgnummer;
    }).length > 0;
};

export const finnSykmeldtSinNaermestelederNavnHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
    const naermesteLeder = naermesteLedere.filter((leder) => {
        return virksomhetsnummer === leder.orgnummer;
    })[0];
    return naermesteLeder ? naermesteLeder.navn : undefined;
};

export const sykmeldtHarGyldigSykmelding = (sykmeldinger) => {
    const tomGrenseDato = new Date();
    return sykmeldinger.filter((sykmelding) => {
        return sykmelding.orgnummer && sykmelding.orgnummer !== null;
    }).filter((sykmelding) => {
        return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, tomGrenseDato);
    }).length > 0;
};

export const erSykmeldingAktiv = (sykmelding) => {
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);
    return sykmelding.mulighetForArbeid &&
        sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            return new Date(periode.tom) >= new Date(dagensDato);
        }).length > 0;
};

export const finnArbeidsgivereForAktiveSykmeldinger = (sykmeldinger, naermesteLedere) => {
    return sykmeldinger.filter((sykmelding) => {
        return erSykmeldingAktiv(sykmelding);
    }).map((sykmelding) => {
        return {
            virksomhetsnummer: sykmelding.orgnummer,
            navn: sykmelding.arbeidsgiver,
            harNaermesteLeder: sykmeldtHarNaermestelederHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
            naermesteLeder: finnSykmeldtSinNaermestelederNavnHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
        };
    }).filter((sykmelding, idx, self) => {
        return self.findIndex((t) => {
            return t.virksomhetsnummer === sykmelding.virksomhetsnummer && sykmelding.virksomhetsnummer !== null;
        }) === idx;
    });
};

export const skalViseOppfoelgingsdialogLenke = (sykmeldinger, oppfolgingsdialoger) => {
    return sykmeldtHarGyldigSykmelding(sykmeldinger) || oppfolgingsdialoger.data.length > 0;
};

export const getTidligsteStartdatoSykeforloep = (sykepengesoknad) => {
    return sykepengesoknad.oppfoelgingsdato && sykepengesoknad.oppfoelgingsdato < sykepengesoknad.identdato
        ? sykepengesoknad.oppfoelgingsdato
        : sykepengesoknad.identdato;
};

export const getSykmeldtFornavn = (sykmelding) => {
    return sykmelding.pasient.mellomnavn
        ? `${sykmelding.pasient.fornavn} ${sykmelding.pasient.mellomnavn}`
        : `${sykmelding.pasient.fornavn}`;
};
