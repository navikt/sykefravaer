const MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING = 3;

export const sykmeldtHarNaermestelederHosArbeidsgiver = (virksomhetsnummer, naermesteLedere) => {
    return naermesteLedere.filter(leder => {
        return virksomhetsnummer === leder.orgnummer;
    }).length > 0;
};

export const finnArbeidsgivereForGyldigeSykmeldinger = (sykmeldinger, naermesteLedere) => {
    return sykmeldinger.filter(sykmelding => {
        return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            const tomGrenseDato = new Date();
            tomGrenseDato.setHours(0, 0, 0, 0);
            tomGrenseDato.setMonth(tomGrenseDato.getMonth() - MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING);
            return new Date(periode.tom) >= new Date(tomGrenseDato);
        }).length > 0;
    }).map((sykmelding) => {
        return {
            virksomhetsnummer: sykmelding.orgnummer,
            navn: sykmelding.arbeidsgiver,
            harNaermesteLeder: sykmeldtHarNaermestelederHosArbeidsgiver(sykmelding.orgnummer, naermesteLedere),
        };
    }).filter((sykmelding, idx, self) => {
        return self.findIndex(t => {
            return t.virksomhetsnummer === sykmelding.virksomhetsnummer && sykmelding.virksomhetsnummer !== null;
        }) === idx;
    });
};

export const harSykmeldtHattAktivSykmeldingSiste3mnd = (sykmeldinger) => {
    return sykmeldinger.filter(sykmelding => {
        return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            const tomGrenseDato = new Date();
            tomGrenseDato.setHours(0, 0, 0, 0);
            tomGrenseDato.setMonth(tomGrenseDato.getMonth() - MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING);
            return new Date(periode.tom) >= new Date(tomGrenseDato);
        }).length > 0;
    }).filter((sykmelding, idx, self) => {
        return self.findIndex(t => {
            return t.orgnummer === sykmelding.orgnummer && sykmelding.orgnummer !== null;
        }) === idx;
    }).length > 0;
};

export const sykmeldtHarManglendeNaermesteLeder = (arbeidsgivere) => {
    return arbeidsgivere.filter(arbeidsgiver => {
        return !arbeidsgiver.harNaermesteLeder;
    }).length > 0;
};

export const sykmeldtHarNaermestelederHosArbeidsgivere = (arbeidsgivere) => {
    return arbeidsgivere.filter(arbeidsgiver => {
        return arbeidsgiver.harNaermesteLeder;
    }).length > 0;
};
