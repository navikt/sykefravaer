/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const nySoknadArbeidstaker = {
    id: 'a313490b-559a-401f-9673-839e6d4bee16',
    sykmeldingId: '02cb0660-41f3-4ce7-9cd5-579e7c7e9afa',
    status: 'NY',
    opprettetDato: '2018-09-28',
    arbeidsgiver: {
        navn: 'BERGEN KOMMUNE HR KONSERN',
        orgnummer: '900000000',
        naermesteLeder: null,
        stilling: null,
    },
    identdato: '2018-09-19',
    ansvarBekreftet: false,
    bekreftetKorrektInformasjon: false,
    arbeidsgiverForskutterer: null,
    egenmeldingsperioder: [],
    gjenopptattArbeidFulltUtDato: null,
    ferie: [],
    permisjon: [],
    utenlandsopphold: null,
    aktiviteter: [{ periode: { fom: '2018-09-19', tom: '2018-09-27' }, grad: 100, avvik: null, id: 116359 }],
    andreInntektskilder: [],
    utdanning: null,
    sykmeldingSkrevetDato: '2018-09-19',
    sendtTilArbeidsgiverDato: null,
    sendtTilNAVDato: null,
    forrigeSykeforloepTom: null,
    korrigerer: null,
    fom: '2018-09-19',
    tom: '2018-09-27',
    avbruttDato: null,
    forrigeSendteSoknadTom: null,
    del: 1,
    oppsummering: null,
};
/* eslint-enable no-unused-vars */

const sendtSoknadArbeidstaker = {
    id: 'a313490b-559a-401f-9673-839e6d4bee16',
    sykmeldingId: '02cb0660-41f3-4ce7-9cd5-579e7c7e9afa',
    status: 'SENDT',
    opprettetDato: '2018-09-28',
    arbeidsgiver: {
        navn: 'BERGEN KOMMUNE HR KONSERN',
        orgnummer: '900000000',
        naermesteLeder: null,
        stilling: null,
    },
    identdato: '2018-09-19',
    ansvarBekreftet: true,
    bekreftetKorrektInformasjon: true,
    arbeidsgiverForskutterer: null,
    egenmeldingsperioder: [],
    gjenopptattArbeidFulltUtDato: null,
    ferie: [],
    permisjon: [],
    utenlandsopphold: null,
    aktiviteter: [{ periode: { fom: '2018-09-19', tom: '2018-09-27' }, grad: 100, avvik: null, id: 116359 }],
    andreInntektskilder: [],
    utdanning: null,
    sykmeldingSkrevetDato: '2018-09-19',
    sendtTilArbeidsgiverDato: '2018-09-28',
    sendtTilNAVDato: null,
    forrigeSykeforloepTom: null,
    korrigerer: null,
    fom: '2018-09-19',
    tom: '2018-09-27',
    avbruttDato: null,
    forrigeSendteSoknadTom: null,
    del: 1,
    oppsummering: {
        brukerDod: null,
        soknad: [{
            ledetekst: {
                nokkel: null,
                tekst: 'Vi har registrert at du ble sykmeldt onsdag 19. september 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 3. – 18. september 2018?',
                verdier: {},
            },
            svar: [{
                ledetekst: { nokkel: null, tekst: 'Nei', verdier: {} },
                type: 'RADIOKNAPPER',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: 'EGENMELDINGSDAGER',
        }, {
            ledetekst: {
                nokkel: null,
                tekst: 'Var du tilbake i fullt arbeid hos BERGEN KOMMUNE HR KONSERN før 28. september 2018?',
                verdier: {},
            },
            svar: [{
                ledetekst: { nokkel: null, tekst: 'Nei', verdier: {} },
                type: 'RADIOKNAPPER',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: 'GJENOPPTATT_ARBEID_FULLT_UT',
        }, {
            ledetekst: {
                nokkel: null,
                tekst: 'Har du hatt ferie, permisjon eller oppholdt deg utenfor Norge i perioden 19. – 27. september 2018?',
                verdier: {},
            },
            svar: [{
                ledetekst: { nokkel: null, tekst: 'Nei', verdier: {} },
                type: 'RADIOKNAPPER',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: 'FERIE_PERMISJON_UTENLANDSOPPHOLD',
        }, {
            ledetekst: {
                nokkel: null,
                tekst: 'I perioden 19. – 27. september 2018 var du 100 % sykmeldt fra BERGEN KOMMUNE HR KONSERN. Jobbet du noe i denne perioden?',
                verdier: {},
            },
            svar: [{
                ledetekst: { nokkel: null, tekst: 'Nei', verdier: {} },
                type: 'RADIOKNAPPER',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: 'AKTIVITET',
        }, {
            ledetekst: {
                nokkel: null,
                tekst: 'Har du andre inntektskilder, eller jobber du for andre enn BERGEN KOMMUNE HR KONSERN?',
                verdier: {},
            },
            svar: [{
                ledetekst: { nokkel: null, tekst: 'Nei', verdier: {} },
                type: 'RADIOKNAPPER',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: 'INNTEKTSKILDER',
        }, {
            ledetekst: {
                nokkel: null,
                tekst: 'Har du vært under utdanning i løpet av perioden 19. – 27. september 2018?',
                verdier: {},
            },
            svar: [{
                ledetekst: { nokkel: null, tekst: 'Nei', verdier: {} },
                type: 'RADIOKNAPPER',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: 'UTDANNING',
        }, {
            ledetekst: null,
            svar: [{
                ledetekst: {
                    nokkel: null,
                    tekst: 'Jeg vet at dersom jeg gir uriktige opplysninger, eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar. Jeg er også klar over at jeg må melde fra til NAV dersom jeg sitter i varetekt, soner straff eller er under forvaring.  ',
                    verdier: {},
                },
                type: 'CHECKBOX',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: 'ANSVAR_BEKREFTET',
        }],
        bekreftetKorrektInformasjon: {
            ledetekst: null,
            svar: [{
                ledetekst: {
                    nokkel: null,
                    tekst: 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
                    verdier: {},
                },
                type: 'CHECKBOX',
                tilleggstekst: null,
                undersporsmal: [],
            }],
            type: null,
        },
        vaerKlarOverAt: {
            ledetekst: {
                nokkel: null,
                tekst: '<p>Vær klar over at</p><ul><li>rett til sykepenger forutsetter at du er borte fra arbeid på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li><li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li><li>sykepenger utbetales i maksimum 52 uker, også for gradert (delvis) sykmelding</li><li>fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul>',
                verdier: {},
            },
            type: 'HTML',
        },
    },
};

const arbeidstakersoknader = [sendtSoknadArbeidstaker];

module.exports = {
    arbeidstakersoknader,
};
/* eslint-enable max-len */
