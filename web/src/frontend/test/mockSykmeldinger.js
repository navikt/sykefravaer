const sykmelding = {
    id: "3456789",
    pasient: {
        fnr: "***REMOVED***",
        fornavn: "Per",
        etternavn: "Person",
    },
    arbeidsgiver: "Selskapet AS",
    orgnummer: "123456789",
    status: 'NY',
    identdato: "2015-12-31",
    diagnose: {
        hoveddiagnose: {
            diagnose: "Influensa",
            diagnosesystem: "ICPC",
            diagnosekode: "LP2"
        },
    },
    mulighetForArbeid: {
        perioder: [{
            fom: "2015-12-31",
            tom: "2016-01-06",
            grad: 67
        }],
    },
    friskmelding: {
        arbeidsfoerEtterPerioden: true,
    },
    utdypendeOpplysninger: {},
    arbeidsevne: {},
    meldingTilNav: {},
    tilbakedatering: {},
    bekreftelse: {
        sykmelder: "Ove Olsen",
        utstedelsesdato: "2016-05-02"
    },
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
};

export default getSykmelding;