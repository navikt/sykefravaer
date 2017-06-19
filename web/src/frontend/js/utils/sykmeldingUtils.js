export const erBrukerSykmeldtPdd = (sykmeldinger) => {
    return sykmeldinger.filter(sykmelding => {
        return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            const tom = new Date(periode.tom);
            tom.setDate(tom.getDate() + 1);
            return new Date(periode.fom) < new Date() && new Date(periode.tom) > new Date();
        }).length > 0;
    }).length > 0;
};

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
            tomGrenseDato.setMonth(tomGrenseDato.getMonth() - 3);
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
            return t.virksomhetsnummer === sykmelding.virksomhetsnummer;
        }) === idx;
    });
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
