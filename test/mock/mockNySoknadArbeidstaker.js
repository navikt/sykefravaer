import { parseSoknad } from '../../js/sykepengesoknad/data/soknader/soknader';

/* eslint-disable max-len */
export const nySoknadArbeidstaker = {
    id: '05cf3a4a-16b1-4cd7-8096-de03964f5295',
    aktorId: '1328256131648',
    sykmeldingId: '6f4c99ed-7202-4ac0-8abe-879874feed05',
    soknadstype: 'ARBEIDSTAKERE',
    status: 'NY',
    fom: '2019-02-03',
    tom: '2019-02-11',
    opprettetDato: '2019-02-12',
    innsendtDato: null,
    sendtTilNAVDato: null,
    sendtTilArbeidsgiverDato: null,
    avbruttDato: null,
    startSykeforlop: '2019-02-03',
    sykmeldingUtskrevet: '2019-02-03',
    arbeidsgiver: {
        navn: 'Min arbeidsgiver',
        orgnummer: '999777666',
    },
    korrigerer: null,
    korrigertAv: null,
    arbeidssituasjon: 'ARBEIDSTAKER',
    soknadPerioder: [
        {
            fom: '2019-02-03',
            tom: '2019-02-11',
            grad: 100,
        },
    ],
    sporsmal: [
        {
            id: '59659',
            tag: 'ANSVARSERKLARING',
            sporsmalstekst: 'Jeg vet at dersom jeg gir uriktige opplysninger, eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar. Jeg er også klar over at jeg må melde fra til NAV dersom jeg i sykmeldingsperioden satt i varetekt, sonet straff eller var under forvaring.',
            undertekst: null,
            svartype: 'CHECKBOX_PANEL',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [

            ],
            undersporsmal: [

            ],
        },
        {
            id: '59660',
            tag: 'EGENMELDINGER',
            sporsmalstekst: 'Vi har registrert at du ble sykmeldt søndag 3. februar 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 18. januar - 2. februar 2019?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [

            ],
            undersporsmal: [
                {
                    id: '59661',
                    tag: 'EGENMELDINGER_NAR',
                    sporsmalstekst: 'Hvilke dager før 3. februar 2019 var du borte fra jobb?',
                    undertekst: null,
                    svartype: 'PERIODER',
                    min: '2018-08-03',
                    max: '2019-02-02',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [

                    ],
                },
            ],
        },
        {
            id: '59662',
            tag: 'TILBAKE_I_ARBEID',
            sporsmalstekst: 'Var du tilbake i fullt arbeid hos Min arbeidsgiver før 12. februar 2019?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [

            ],
            undersporsmal: [
                {
                    id: '59663',
                    tag: 'TILBAKE_NAR',
                    sporsmalstekst: 'Fra hvilken dato ble arbeidet gjenopptatt?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: '2019-02-03',
                    max: '2019-02-11',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [

                    ],
                },
            ],
        },
        {
            id: '59664',
            tag: 'JOBBET_DU_100_PROSENT_0',
            sporsmalstekst: 'I perioden 3. - 11. februar 2019 var du 100 % sykmeldt fra Min arbeidsgiver. Jobbet du noe i denne perioden?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [

            ],
            undersporsmal: [
                {
                    id: '59665',
                    tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                    sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                    undertekst: 'timer per uke',
                    svartype: 'TALL',
                    min: '1',
                    max: '150',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [

                    ],
                },
                {
                    id: '59666',
                    tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                    sporsmalstekst: 'Hvor mye jobbet du totalt 3. - 11. februar 2019 hos Min arbeidsgiver?',
                    undertekst: null,
                    svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [
                        {
                            id: '59667',
                            tag: 'HVOR_MYE_PROSENT_0',
                            sporsmalstekst: 'prosent',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [
                                {
                                    verdi: 'CHECKED',
                                },
                            ],
                            undersporsmal: [
                                {
                                    id: '59668',
                                    tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                    sporsmalstekst: null,
                                    undertekst: 'prosent',
                                    svartype: 'TALL',
                                    min: '1',
                                    max: '99',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59669',
                            tag: 'HVOR_MYE_TIMER_0',
                            sporsmalstekst: 'timer',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59670',
                                    tag: 'HVOR_MYE_TIMER_VERDI_0',
                                    sporsmalstekst: null,
                                    undertekst: 'timer totalt',
                                    svartype: 'TALL',
                                    min: '1',
                                    max: '193',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '59664',
            tag: 'JOBBET_DU_GRADERT_1',
            sporsmalstekst: 'I perioden 3. - 11. februar 2019 var du 40 % sykmeldt fra Min arbeidsgiver. Jobbet du noe i denne perioden?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [

            ],
            undersporsmal: [
                {
                    id: '59665',
                    tag: 'HVOR_MANGE_TIMER_PER_UKE_1',
                    sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                    undertekst: 'timer per uke',
                    svartype: 'TALL',
                    min: '1',
                    max: '150',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [

                    ],
                },
                {
                    id: '59666',
                    tag: 'HVOR_MYE_HAR_DU_JOBBET_1',
                    sporsmalstekst: 'Hvor mye jobbet du totalt 3. - 11. februar 2019 hos Min arbeidsgiver?',
                    undertekst: null,
                    svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [
                        {
                            id: '59667',
                            tag: 'HVOR_MYE_PROSENT_1',
                            sporsmalstekst: 'prosent',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [
                                {
                                    verdi: 'CHECKED',
                                },
                            ],
                            undersporsmal: [
                                {
                                    id: '59668',
                                    tag: 'HVOR_MYE_PROSENT_VERDI_1',
                                    sporsmalstekst: null,
                                    undertekst: 'prosent',
                                    svartype: 'TALL',
                                    min: '1',
                                    max: '99',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59669',
                            tag: 'HVOR_MYE_TIMER_1',
                            sporsmalstekst: 'timer',
                            undertekst: null,
                            svartype: 'RADIO',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59670',
                                    tag: 'HVOR_MYE_TIMER_VERDI_1',
                                    sporsmalstekst: null,
                                    undertekst: 'timer totalt',
                                    svartype: 'TALL',
                                    min: '1',
                                    max: '193',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '59671',
            tag: 'FERIE_PERMISJON_UTLAND',
            sporsmalstekst: 'Har du hatt ferie, permisjon eller oppholdt deg utenfor Norge i perioden 3. - 11. februar 2019?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [

            ],
            undersporsmal: [
                {
                    id: '59672',
                    tag: 'FERIE_PERMISJON_UTLAND_HVA',
                    sporsmalstekst: 'Kryss av alt som gjelder deg:',
                    undertekst: null,
                    svartype: 'CHECKBOX_GRUPPE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [
                        {
                            id: '59673',
                            tag: 'FERIE',
                            sporsmalstekst: 'Jeg tok ut ferie',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59674',
                                    tag: 'FERIE_NAR',
                                    sporsmalstekst: null,
                                    undertekst: null,
                                    svartype: 'PERIODER',
                                    min: '2019-02-03',
                                    max: '2019-02-11',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59675',
                            tag: 'PERMISJON',
                            sporsmalstekst: 'Jeg hadde permisjon',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59676',
                                    tag: 'PERMISJON_NAR',
                                    sporsmalstekst: null,
                                    undertekst: null,
                                    svartype: 'PERIODER',
                                    min: '2019-02-03',
                                    max: '2019-02-11',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59677',
                            tag: 'UTLAND',
                            sporsmalstekst: 'Jeg var utenfor Norge',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59678',
                                    tag: 'UTLAND_NAR',
                                    sporsmalstekst: null,
                                    undertekst: null,
                                    svartype: 'PERIODER',
                                    min: '2019-02-03',
                                    max: '2019-02-11',
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                                {
                                    id: '59679',
                                    tag: 'UTLANDSOPPHOLD_SOKT_SYKEPENGER',
                                    sporsmalstekst: 'Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '59680',
            tag: 'ANDRE_INNTEKTSKILDER',
            sporsmalstekst: 'Har du andre inntektskilder, eller jobber du for andre enn Min arbeidsgiver?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [

            ],
            undersporsmal: [
                {
                    id: '59681',
                    tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
                    sporsmalstekst: 'Hvilke andre inntektskilder har du?',
                    undertekst: 'Du trenger ikke oppgi andre ytelser fra NAV',
                    svartype: 'CHECKBOX_GRUPPE',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [
                        {
                            id: '59682',
                            tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                            sporsmalstekst: 'Andre arbeidsforhold',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59683',
                                    tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
                                    sporsmalstekst: 'Er du sykmeldt fra dette?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59684',
                            tag: 'INNTEKTSKILDE_SELVSTENDIG',
                            sporsmalstekst: 'Selvstendig næringsdrivende',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59685',
                                    tag: 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT',
                                    sporsmalstekst: 'Er du sykmeldt fra dette?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59686',
                            tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                            sporsmalstekst: 'Selvstendig næringsdrivende dagmamma',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59687',
                                    tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT',
                                    sporsmalstekst: 'Er du sykmeldt fra dette?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59688',
                            tag: 'INNTEKTSKILDE_JORDBRUKER',
                            sporsmalstekst: 'Jordbruker / Fisker / Reindriftsutøver',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59689',
                                    tag: 'INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT',
                                    sporsmalstekst: 'Er du sykmeldt fra dette?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59690',
                            tag: 'INNTEKTSKILDE_FRILANSER',
                            sporsmalstekst: 'Frilanser',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: 'CHECKED',
                            svar: [

                            ],
                            undersporsmal: [
                                {
                                    id: '59691',
                                    tag: 'INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT',
                                    sporsmalstekst: 'Er du sykmeldt fra dette?',
                                    undertekst: null,
                                    svartype: 'JA_NEI',
                                    min: null,
                                    max: null,
                                    pavirkerAndreSporsmal: false,
                                    kriterieForVisningAvUndersporsmal: null,
                                    svar: [

                                    ],
                                    undersporsmal: [

                                    ],
                                },
                            ],
                        },
                        {
                            id: '59692',
                            tag: 'INNTEKTSKILDE_ANNET',
                            sporsmalstekst: 'Annet',
                            undertekst: null,
                            svartype: 'CHECKBOX',
                            min: null,
                            max: null,
                            pavirkerAndreSporsmal: false,
                            kriterieForVisningAvUndersporsmal: null,
                            svar: [

                            ],
                            undersporsmal: [

                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '59693',
            tag: 'UTDANNING',
            sporsmalstekst: 'Har du vært under utdanning i løpet av perioden 3. - 11. februar 2019?',
            undertekst: null,
            svartype: 'JA_NEI',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: 'JA',
            svar: [

            ],
            undersporsmal: [
                {
                    id: '59694',
                    tag: 'UTDANNING_START',
                    sporsmalstekst: 'Når startet du på utdanningen?',
                    undertekst: null,
                    svartype: 'DATO',
                    min: null,
                    max: '2019-02-11',
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [

                    ],
                },
                {
                    id: '59695',
                    tag: 'FULLTIDSSTUDIUM',
                    sporsmalstekst: 'Er utdanningen et fulltidsstudium?',
                    undertekst: null,
                    svartype: 'JA_NEI',
                    min: null,
                    max: null,
                    pavirkerAndreSporsmal: false,
                    kriterieForVisningAvUndersporsmal: null,
                    svar: [

                    ],
                    undersporsmal: [

                    ],
                },
            ],
        },
        {
            id: '59696',
            tag: 'VAER_KLAR_OVER_AT',
            sporsmalstekst: 'Vær klar over at:',
            undertekst: '<ul><li>rett til sykepenger forutsetter at du er borte fra arbeid på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li><li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li><li>sykepenger utbetales i maksimum 52 uker, også for gradert (delvis) sykmelding</li><li>fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul>',
            svartype: 'IKKE_RELEVANT',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [

            ],
            undersporsmal: [

            ],
        },
        {
            id: '59697',
            tag: 'BEKREFT_OPPLYSNINGER',
            sporsmalstekst: 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            undertekst: null,
            svartype: 'CHECKBOX_PANEL',
            min: null,
            max: null,
            pavirkerAndreSporsmal: false,
            kriterieForVisningAvUndersporsmal: null,
            svar: [

            ],
            undersporsmal: [

            ],
        },
    ],
};

const mockNySoknadArbeidstaker = (soknad = {}) => {
    return parseSoknad({
        ...nySoknadArbeidstaker,
        ...soknad,
    });
};

export const mockNySoknadArbeidstakerMedFeriesporsmalSomHovedsporsmal = () => {
    return parseSoknad({
        id: '43aaf8e1-cc98-4786-8348-58cb2c63bb08',
        aktorId: '1924473393808',
        sykmeldingId: '32ef8e34-b84e-4d3f-a1af-cd7797869d51',
        soknadstype: 'ARBEIDSTAKERE',
        status: 'NY',
        fom: '2019-05-05',
        tom: '2019-05-13',
        opprettetDato: '2019-05-14',
        innsendtDato: null,
        sendtTilNAVDato: null,
        sendtTilArbeidsgiverDato: null,
        avbruttDato: null,
        startSykeforlop: '2019-05-02',
        sykmeldingUtskrevet: '2019-05-05',
        arbeidsgiver: {
            navn: 'ÅSEN BOFELLESSKAP',
            orgnummer: '995816598',
        },
        korrigerer: null,
        korrigertAv: null,
        arbeidssituasjon: 'ARBEIDSTAKER',
        soknadPerioder: [
            {
                fom: '2019-05-05',
                tom: '2019-05-13',
                grad: 100,
            },
        ],
        sporsmal: [
            {
                id: '210708',
                tag: 'ANSVARSERKLARING',
                sporsmalstekst: 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
                undertekst: null,
                svartype: 'CHECKBOX_PANEL',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [
                    {
                        verdi: 'CHECKED',
                    },
                ],
                undersporsmal: [],
            },
            {
                id: '210709',
                tag: 'EGENMELDINGER',
                sporsmalstekst: 'Vi har registrert at du ble sykmeldt torsdag 2. mai 2019. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 16. april - 1. mai 2019?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [
                    {
                        verdi: 'NEI',
                    },
                ],
                undersporsmal: [
                    {
                        id: '210710',
                        tag: 'EGENMELDINGER_NAR',
                        sporsmalstekst: 'Hvilke dager før 2. mai 2019 var du borte fra jobb?',
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: '2018-11-02',
                        max: '2019-05-01',
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '210711',
                tag: 'TILBAKE_I_ARBEID',
                sporsmalstekst: 'Var du tilbake i fullt arbeid hos ÅSEN BOFELLESSKAP før 14. mai 2019?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: true,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [
                    {
                        verdi: 'NEI',
                    },
                ],
                undersporsmal: [
                    {
                        id: '210712',
                        tag: 'TILBAKE_NAR',
                        sporsmalstekst: 'Når begynte du å jobbe igjen?',
                        undertekst: null,
                        svartype: 'DATO',
                        min: '2019-05-05',
                        max: '2019-05-13',
                        pavirkerAndreSporsmal: true,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '210713',
                tag: 'JOBBET_DU_100_PROSENT_0',
                sporsmalstekst: 'I perioden 5. - 13. mai 2019 var du 100 % sykmeldt fra ÅSEN BOFELLESSKAP. Jobbet du noe i denne perioden?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [
                    {
                        verdi: 'NEI',
                    },
                ],
                undersporsmal: [
                    {
                        id: '210714',
                        tag: 'HVOR_MANGE_TIMER_PER_UKE_0',
                        sporsmalstekst: 'Hvor mange timer jobbet du per uke før du ble sykmeldt?',
                        undertekst: 'timer per uke',
                        svartype: 'TALL',
                        min: '1',
                        max: '150',
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '210715',
                        tag: 'HVOR_MYE_HAR_DU_JOBBET_0',
                        sporsmalstekst: 'Hvor mye jobbet du totalt 5. - 13. mai 2019 hos ÅSEN BOFELLESSKAP?',
                        undertekst: null,
                        svartype: 'RADIO_GRUPPE_TIMER_PROSENT',
                        min: null,
                        max: null,
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [
                            {
                                id: '210716',
                                tag: 'HVOR_MYE_PROSENT_0',
                                sporsmalstekst: 'prosent',
                                undertekst: null,
                                svartype: 'RADIO',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [
                                    {
                                        verdi: 'CHECKED',
                                    },
                                ],
                                undersporsmal: [
                                    {
                                        id: '210717',
                                        tag: 'HVOR_MYE_PROSENT_VERDI_0',
                                        sporsmalstekst: null,
                                        undertekst: 'prosent',
                                        svartype: 'TALL',
                                        min: '1',
                                        max: '99',
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '210718',
                                tag: 'HVOR_MYE_TIMER_0',
                                sporsmalstekst: 'timer',
                                undertekst: null,
                                svartype: 'RADIO',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: '210719',
                                        tag: 'HVOR_MYE_TIMER_VERDI_0',
                                        sporsmalstekst: null,
                                        undertekst: 'timer totalt',
                                        svartype: 'TALL',
                                        min: '1',
                                        max: '193',
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: '210720',
                tag: 'FERIE',
                sporsmalstekst: 'Har du tatt ut ferie i perioden 5. - 13. mai 2019?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [
                    {
                        verdi: 'NEI',
                    },
                ],
                undersporsmal: [
                    {
                        id: '210721',
                        tag: 'FERIE_NAR',
                        sporsmalstekst: null,
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: '2019-05-05',
                        max: '2019-05-13',
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '210722',
                tag: 'PERMISJON',
                sporsmalstekst: 'Har du hatt permisjon i perioden 5. - 13. mai 2019?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '210723',
                        tag: 'PERMISJON_NAR',
                        sporsmalstekst: null,
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: '2019-05-05',
                        max: '2019-05-13',
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '210724',
                tag: 'UTLAND',
                sporsmalstekst: 'Har oppholdt deg i utlandet i perioden 5. - 13. mai 2019?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '210725',
                        tag: 'UTLAND_NAR',
                        sporsmalstekst: null,
                        undertekst: null,
                        svartype: 'PERIODER',
                        min: '2019-05-05',
                        max: '2019-05-13',
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '210726',
                tag: 'ANDRE_INNTEKTSKILDER',
                sporsmalstekst: 'Har du andre inntektskilder enn ÅSEN BOFELLESSKAP?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '210727',
                        tag: 'HVILKE_ANDRE_INNTEKTSKILDER',
                        sporsmalstekst: 'Hvilke andre inntektskilder har du?',
                        undertekst: 'Du trenger ikke oppgi penger fra NAV',
                        svartype: 'CHECKBOX_GRUPPE',
                        min: null,
                        max: null,
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [
                            {
                                id: '210728',
                                tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                                sporsmalstekst: 'andre arbeidsforhold',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: '210729',
                                        tag: 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
                                        sporsmalstekst: 'Er du sykmeldt fra dette?',
                                        undertekst: null,
                                        svartype: 'JA_NEI',
                                        min: null,
                                        max: null,
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '210730',
                                tag: 'INNTEKTSKILDE_SELVSTENDIG',
                                sporsmalstekst: 'selvstendig næringsdrivende',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: '210731',
                                        tag: 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT',
                                        sporsmalstekst: 'Er du sykmeldt fra dette?',
                                        undertekst: null,
                                        svartype: 'JA_NEI',
                                        min: null,
                                        max: null,
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '210732',
                                tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                                sporsmalstekst: 'dagmamma',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: '210733',
                                        tag: 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT',
                                        sporsmalstekst: 'Er du sykmeldt fra dette?',
                                        undertekst: null,
                                        svartype: 'JA_NEI',
                                        min: null,
                                        max: null,
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '210734',
                                tag: 'INNTEKTSKILDE_JORDBRUKER',
                                sporsmalstekst: 'jordbruk / fiske / reindrift',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: '210735',
                                        tag: 'INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT',
                                        sporsmalstekst: 'Er du sykmeldt fra dette?',
                                        undertekst: null,
                                        svartype: 'JA_NEI',
                                        min: null,
                                        max: null,
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '210736',
                                tag: 'INNTEKTSKILDE_FRILANSER',
                                sporsmalstekst: 'frilanser',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: 'CHECKED',
                                svar: [],
                                undersporsmal: [
                                    {
                                        id: '210737',
                                        tag: 'INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT',
                                        sporsmalstekst: 'Er du sykmeldt fra dette?',
                                        undertekst: null,
                                        svartype: 'JA_NEI',
                                        min: null,
                                        max: null,
                                        pavirkerAndreSporsmal: false,
                                        kriterieForVisningAvUndersporsmal: null,
                                        svar: [],
                                        undersporsmal: [],
                                    },
                                ],
                            },
                            {
                                id: '210738',
                                tag: 'INNTEKTSKILDE_ANNET',
                                sporsmalstekst: 'annet',
                                undertekst: null,
                                svartype: 'CHECKBOX',
                                min: null,
                                max: null,
                                pavirkerAndreSporsmal: false,
                                kriterieForVisningAvUndersporsmal: null,
                                svar: [],
                                undersporsmal: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: '210739',
                tag: 'UTDANNING',
                sporsmalstekst: 'Har du vært under utdanning i løpet av perioden 5. - 13. mai 2019?',
                undertekst: null,
                svartype: 'JA_NEI',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: 'JA',
                svar: [],
                undersporsmal: [
                    {
                        id: '210740',
                        tag: 'UTDANNING_START',
                        sporsmalstekst: 'Når startet du på utdanningen?',
                        undertekst: null,
                        svartype: 'DATO',
                        min: null,
                        max: '2019-05-13',
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                    {
                        id: '210741',
                        tag: 'FULLTIDSSTUDIUM',
                        sporsmalstekst: 'Er utdanningen et fulltidsstudium?',
                        undertekst: null,
                        svartype: 'JA_NEI',
                        min: null,
                        max: null,
                        pavirkerAndreSporsmal: false,
                        kriterieForVisningAvUndersporsmal: null,
                        svar: [],
                        undersporsmal: [],
                    },
                ],
            },
            {
                id: '210742',
                tag: 'VAER_KLAR_OVER_AT',
                sporsmalstekst: 'Viktig å være klar over:',
                undertekst: '<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href="https://www.nav.no/sykepenger" target="_blank">nav.no/sykepenger</a>.</p>',
                svartype: 'IKKE_RELEVANT',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
            {
                id: '210743',
                tag: 'BEKREFT_OPPLYSNINGER',
                sporsmalstekst: 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
                undertekst: null,
                svartype: 'CHECKBOX_PANEL',
                min: null,
                max: null,
                pavirkerAndreSporsmal: false,
                kriterieForVisningAvUndersporsmal: null,
                svar: [],
                undersporsmal: [],
            },
        ],
    });
};

/* eslint-enable max-len */

export default mockNySoknadArbeidstaker;
