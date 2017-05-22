export const erBrukerSykmeldtPdd = (sykmeldinger) => {
    return sykmeldinger.filter(sykmelding => {
        return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            const tom = new Date(periode.tom);
            tom.setDate(tom.getDate() + 1);
            return new Date(periode.fom) < new Date() && new Date(periode.tom) > new Date();
        }).length > 0;
    }).length > 0;
};

export const finnArbeidsgivereForAktiveSykmeldinger = (sykmeldinger) => {
    return sykmeldinger.filter(sykmelding => {
        return sykmelding.mulighetForArbeid.perioder.filter((periode) => {
            const tom = new Date(periode.tom);
            tom.setDate(tom.getDate() + 1);
            return new Date(periode.fom) < new Date() && new Date(periode.tom) > new Date();
        }).length > 0;
    }).map((sykmelding) => {
        return {
            virksomhetsnummer: sykmelding.orgnummer,
            navn: sykmelding.arbeidsgiver,
        };
    });
};
