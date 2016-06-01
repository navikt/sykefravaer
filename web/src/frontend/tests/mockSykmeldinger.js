const sykmelding = {
    id: 3456789,
    pasient: {
        fnr: "***REMOVED***",
        fornavn: "Per",
        etternavn: "Person",
    },
    arbeidsgiver: "Selskapet AS",
    diagnose: {
        hoveddiagnose: {
            diagnose: "Influensa",
            diagnosesystem: "ICPC",
            diagnosekode: "LP2"
        },
    },
    mulighetForArbeid: {
        perioder: [{
            fom: "2015-12-31T00:00:00Z",
            tom: "2016-01-06T00:00:00Z",
            grad: 67
        }],
    },
    friskmelding: {
        arbeidsfoerEtterPerioden: true,
    },
    utdypendeOpplysninger: {
    },
    arbeidsevne: {
    },
    meldingTilNav: {
    },
    tilbakedatering: {
    },
    bekreftelse: {
        sykmelder: "Ove Olsen",
        utstedelsesdato: "2016-05-02T22:00:00.000Z"
    },
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
};

export default getSykmelding;