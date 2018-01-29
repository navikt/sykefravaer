import {
    erSykmeldingGyldigForOppfolgingMedGrensedato,
} from 'oppfolgingsdialog-npm';

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

export const finnArbeidsgivereForGyldigeSykmeldinger = (sykmeldinger, naermesteLedere) => {
    const dagensDato = new Date();
    return sykmeldinger.filter((sykmelding) => {
        return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, dagensDato);
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
    }).filter((sykmelding) => {
        return sykmelding.sendtdato !== null && erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, sykmelding.sendtdato);
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

export const sykmeldtHarGyldigSykmelding = (sykmeldinger) => {
    const tomGrenseDato = new Date();
    return sykmeldinger.filter((sykmelding) => {
        return erSykmeldingGyldigForOppfolgingMedGrensedato(sykmelding, tomGrenseDato);
    }).length > 0;
};
