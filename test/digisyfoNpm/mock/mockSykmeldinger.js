/* eslint-disable max-len */

const getSykmelding = (sykmelding = {}) => {
    return Object.assign({}, {
        id: '73970c89-1173-4d73-b1cb-e8445c2840e2',
        startLegemeldtFravaer: '2017-07-07',
        skalViseSkravertFelt: true,
        identdato: '2017-07-07',
        status: 'SENDT',
        merknader: [
            {
                type: 'UGYLDIG_TILBAKEDATERING',
                beskrivelse: 'Dette er en beskrivelse',
            },
        ],
        naermesteLederStatus: null,
        innsendtArbeidsgivernavn: 'TESTBEDRIFT AS',
        valgtArbeidssituasjon: null,
        orgnummer: '999888777',
        sendtdato: '2017-07-24T10:19:15',
        pasient: {
            fnr: '12121200000',
            fornavn: 'Frida',
            etternavn: 'Frost',
        },
        arbeidsgiver: 'Selskapet AS',
        stillingsprosent: 100,
        diagnose: {
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosekode: 'LP2',
                diagnosesystem: 'ICPC-2',
            },
            bidiagnoser: [
                {
                    diagnose: 'GANGLION SENE',
                    diagnosekode: 'LP2',
                    diagnosesystem: 'ICPC-2',
                },
            ],
            fravaersgrunnLovfestet: null,
            fravaerBeskrivelse: 'Medising årsak i kategorien annet',
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2017-07-07',
        },
        mulighetForArbeid: {
            perioder: [
                {
                    fom: '2017-07-07',
                    tom: '2017-07-23',
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                },
            ],
            aktivitetIkkeMulig433: [
                'Annet',
            ],
            aktivitetIkkeMulig434: [
                'Annet',
            ],
            aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
            aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
        },
        friskmelding: {
            arbeidsfoerEtterPerioden: true,
            antarReturSammeArbeidsgiver: true,
            antattDatoReturSammeArbeidsgiver: '2017-07-07',
            antarReturAnnenArbeidsgiver: true,
            tilbakemeldingReturArbeid: '2017-07-07',
            utenArbeidsgiverAntarTilbakeIArbeid: false,
            utenArbeidsgiverAntarTilbakeIArbeidDato: '2017-03-10',
            utenArbeidsgiverTilbakemelding: '2017-03-10',
        },
        utdypendeOpplysninger: {
            sykehistorie: null,
            paavirkningArbeidsevne: null,
            resultatAvBehandling: null,
            henvisningUtredningBehandling: null,
        },
        arbeidsevne: {
            tilretteleggingArbeidsplass: 'Fortsett som sist.',
            tiltakNAV: 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
            tiltakAndre: null,
        },
        meldingTilNav: {
            navBoerTaTakISaken: false,
            navBoerTaTakISakenBegrunnelse: null,
        },
        innspillTilArbeidsgiver: null,
        tilbakedatering: {
            dokumenterbarPasientkontakt: '2017-03-12',
            tilbakedatertBegrunnelse: null,
        },
        bekreftelse: {
            utstedelsesdato: '2017-07-24',
            sykmelder: 'Test Testesen',
            sykmelderTlf: '12345678',
        },
    }, sykmelding);
};

export const getParsetSykmelding = (sykmelding = {}) => {
    return Object.assign({}, {
        id: '73970c89-1173-4d73-b1cb-e8445c2840e2',
        startLegemeldtFravaer: new Date('2017-07-07'),
        skalViseSkravertFelt: true,
        identdato: new Date('2017-07-07'),
        status: 'SENDT',
        merknader: [
            {
                type: 'UGYLDIG_TILBAKEDATERING',
                beskrivelse: 'Dette er en beskrivelse',
            },
        ],
        naermesteLederStatus: null,
        innsendtArbeidsgivernavn: 'TESTBEDRIFT AS',
        valgtArbeidssituasjon: null,
        orgnummer: '999888777',
        sendtdato: new Date('2017-07-24T10:19:15'),
        pasient: {
            fnr: '12121200000',
            fornavn: 'Frida',
            etternavn: 'Frost',
        },
        arbeidsgiver: 'Selskapet AS',
        stillingsprosent: 100,
        diagnose: {
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosekode: 'LP2',
                diagnosesystem: 'ICPC-2',
            },
            bidiagnoser: [
                {
                    diagnose: 'GANGLION SENE',
                    diagnosekode: 'LP2',
                    diagnosesystem: 'ICPC-2',
                },
            ],
            fravaersgrunnLovfestet: null,
            fravaerBeskrivelse: 'Medising årsak i kategorien annet',
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: new Date('2017-07-07'),
        },
        mulighetForArbeid: {
            perioder: [
                {
                    fom: new Date('2017-07-07'),
                    tom: new Date('2017-07-23'),
                    grad: 100,
                    behandlingsdager: null,
                    reisetilskudd: null,
                    avventende: null,
                },
            ],
            aktivitetIkkeMulig433: [
                'Annet',
            ],
            aktivitetIkkeMulig434: [
                'Annet',
            ],
            aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
            aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
        },
        friskmelding: {
            arbeidsfoerEtterPerioden: true,
            antarReturSammeArbeidsgiver: true,
            antattDatoReturSammeArbeidsgiver: new Date('2017-07-07'),
            antarReturAnnenArbeidsgiver: true,
            tilbakemeldingReturArbeid: new Date('2017-07-07'),
            utenArbeidsgiverAntarTilbakeIArbeid: false,
            utenArbeidsgiverAntarTilbakeIArbeidDato: new Date('2017-03-10'),
            utenArbeidsgiverTilbakemelding: new Date('2017-03-10'),
        },
        utdypendeOpplysninger: {
            sykehistorie: null,
            paavirkningArbeidsevne: null,
            resultatAvBehandling: null,
            henvisningUtredningBehandling: null,
        },
        arbeidsevne: {
            tilretteleggingArbeidsplass: 'Fortsett som sist.',
            tiltakNAV: 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
            tiltakAndre: null,
        },
        meldingTilNav: {
            navBoerTaTakISaken: false,
            navBoerTaTakISakenBegrunnelse: null,
        },
        innspillTilArbeidsgiver: null,
        tilbakedatering: {
            dokumenterbarPasientkontakt: new Date('2017-03-12'),
            tilbakedatertBegrunnelse: null,
        },
        bekreftelse: {
            utstedelsesdato: new Date('2017-07-24'),
            sykmelder: 'Test Testesen',
            sykmelderTlf: '12345678',
        },
    }, sykmelding);
};

/* eslint-enable max-len */

export default getSykmelding;
