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

export const finnArbeidsgivereForAktiveSykmeldinger = (sykmeldinger, naermesteLedere) => {
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);
    return sykmeldinger.filter((sykmelding) => {
        return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            return new Date(periode.tom) >= dagensDato;
        }).length > 0;
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

export const skalViseOppfoelgingsdialogLenke = (sykmeldinger) => {
    return sykmeldinger.filter((sykmelding, idx, self) => {
        return self.findIndex((t) => {
            return t.orgnummer === sykmelding.orgnummer && sykmelding.orgnummer !== null;
        }) === idx;
    }).length > 0;
};

export const sykmeldtHarManglendeNaermesteLeder = (arbeidsgivere) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return !arbeidsgiver.harNaermesteLeder;
    }).length > 0;
};

export const sykmeldtHarNaermestelederHosArbeidsgivere = (arbeidsgivere) => {
    return arbeidsgivere.filter((arbeidsgiver) => {
        return arbeidsgiver.harNaermesteLeder;
    }).length > 0;
};

export const sykmeldtHarAktivSykmelding = (sykmeldinger) => {
    const dagensDato = new Date();
    dagensDato.setHours(0, 0, 0, 0);
    return sykmeldinger.filter((sykmelding) => {
        return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            return new Date(periode.tom) >= dagensDato;
        }).length > 0;
    }).length > 0;
};
