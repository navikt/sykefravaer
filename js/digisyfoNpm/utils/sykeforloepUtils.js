const senestePeriode = (perioder) => {
    return perioder.sort((periode1, periode2) => {
        return periode1.tom.getTime() - periode2.tom.getTime();
    })[0];
};

const tidligstePeriode = (perioder) => {
    return perioder.sort((periode1, periode2) => {
        return periode2.fom.getTime() - periode1.fom.getTime();
    })[0];
};

const antallDagerMellom = (dato1, dato2) => {
    return Math.round((dato1 - dato2) / (1000 * 60 * 60 * 24));
};

const ANTALL_DAGER_MELLOM_TO_SYKEFORLOEP = 16;

export const finnNyesteSykeforloepHosBedrift = (sykmeldinger, virksomhetsnummer) => {
    return sykmeldinger
        .filter((sykmelding) => {
            return sykmelding.orgnummer === virksomhetsnummer;
        })
        .sort((sykmelding1, sykmelding2) => {
            return senestePeriode(sykmelding1.mulighetForArbeid.perioder)
                .tom
                .getTime() - senestePeriode(sykmelding2.mulighetForArbeid.perioder)
                .tom
                .getTime();
        })
        .map((sykmelding) => {
            return {
                senesteTom: {
                    dato: senestePeriode(sykmelding.mulighetForArbeid.perioder).tom,
                    grad: senestePeriode(sykmelding.mulighetForArbeid.perioder).grad,
                },
                tidligsteFom: {
                    dato: tidligstePeriode(sykmelding.mulighetForArbeid.perioder).fom,
                    grad: tidligstePeriode(sykmelding.mulighetForArbeid.perioder).grad,
                    identdato: sykmelding.identdato,
                },
            };
        })
        .reverse()
        .reduce((acc, periode) => {
            return {
                senesteTom: acc.senesteTom,
                tidligsteFom: antallDagerMellom(acc.tidligsteFom.dato, periode.senesteTom.dato) <= ANTALL_DAGER_MELLOM_TO_SYKEFORLOEP ? periode.tidligsteFom : acc.tidligsteFom,
            };
        });
};
