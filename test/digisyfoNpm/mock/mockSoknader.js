export const getSoknad = (soknad = {}) => {
    return Object.assign({}, {
        id: '66a8ec20-b813-4b03-916f-7a2f0751b600',
        status: 'NY',
        innsendtDato: null,
        opprettetDato: '2017-01-18',
        arbeidsgiver: {
            navn: 'TESTBEDRIFT AS',
            orgnummer: '999888777',
            naermesteLeder: null,
        },
        identdato: '2016-07-15',
        oppfoelgingsdato: '2017-12-24',
        ansvarBekreftet: false,
        bekreftetKorrektInformasjon: false,
        arbeidsgiverUtbetalerLoenn: false,
        egenmeldingsperioder: [],
        gjenopptattArbeidFulltUtDato: null,
        ferie: [],
        permisjon: [],
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        aktiviteter: [{
            periode: {
                fom: '2017-01-01',
                tom: '2017-01-15',
            },
            grad: 100,
            avvik: null,
        }, {
            periode: {
                fom: '2017-01-01',
                tom: '2017-01-25',
            },
            grad: 50,
            avvik: null,
        }],
        andreInntektskilder: [],
        utdanning: null,
        sykmeldingSkrevetDato: '2017-08-05',
        fom: '2017-01-01',
        tom: '2017-01-25',
        sykmeldingId: 'ca18a51b-02da-4b17-bf6c-8819a8dc8c9a',
        del: 1,
        forrigeSykeforloepTom: null,
        sendtTilArbeidsgiverDato: '2017-07-21',
        sendtTilNAVDato: '2017-07-21',
    }, soknad);
};

export const getParsetSoknad = (soknad = {}) => {
    return Object.assign({}, {
        id: '66a8ec20-b813-4b03-916f-7a2f0751b600',
        status: 'NY',
        innsendtDato: null,
        opprettetDato: new Date('2017-01-18'),
        arbeidsgiver: {
            navn: 'TESTBEDRIFT AS',
            orgnummer: '999888777',
            naermesteLeder: null,
        },
        identdato: new Date('2016-07-15'),
        oppfoelgingsdato: new Date('2017-12-24'),
        ansvarBekreftet: false,
        bekreftetKorrektInformasjon: false,
        arbeidsgiverUtbetalerLoenn: false,
        egenmeldingsperioder: [],
        gjenopptattArbeidFulltUtDato: null,
        ferie: [],
        permisjon: [],
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        aktiviteter: [{
            periode: {
                fom: new Date('2017-01-01'),
                tom: new Date('2017-01-15'),
            },
            grad: 100,
            avvik: null,
        }, {
            periode: {
                fom: new Date('2017-01-01'),
                tom: new Date('2017-01-25'),
            },
            grad: 50,
            avvik: null,
        }],
        andreInntektskilder: [],
        utdanning: null,
        sykmeldingSkrevetDato: new Date('2017-08-05'),
        fom: new Date('2017-01-01'),
        tom: new Date('2017-01-25'),
        sykmeldingId: 'ca18a51b-02da-4b17-bf6c-8819a8dc8c9a',
        del: 1,
        forrigeSykeforloepTom: null,
        forrigeSendteSoknadTom: null,
        sendtTilArbeidsgiverDato: new Date('2017-07-21'),
        sendtTilNAVDato: new Date('2017-07-21'),
        avbruttDato: null,
    }, soknad);
};

export default getSoknad;
