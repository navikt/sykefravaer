const soknad1 = {
    uuid: 'uuid123',
    status: 'NY',
    soknadstype: "SELVSTENDIGE_OG_FRILANSERE",
    fom: "2018-03-12",
    tom: "2018-03-17",
    opprettetDato: "2018-02-30",
    sporsmal: [{
        tekst: 'Var du tilbake i fullt arbeid som selvstendig næringsdrivende før sykmeldingsperioden utløp 31.01.2017?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: 'Når var du tilbake i arbeid?',
                svar: { svartype: 'DATO', svarverdi: [], min: '2017-01-01', max: '2017-01-31', kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }, {
        tekst: 'I perioden 01.01.2017 - 31.01.2017 var du 100% sykmeldt som selvstendig næringsdrivende. Jobbet du noe i denne perioden?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: 'Hvor mange timer jobbet du normalt per uke som selvstendig næringsdrivende?',
                svar: { svartype: 'TALL', svarverdi: [], min: '0', max: '100', kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }, {
                tekst: 'Hvor mye jobbet du totalt i denne perioden som selvstendig næringsdrivende?',
                svar: { svartype: 'PROSENT_TIMER', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }, {
        tekst: 'Har du andre inntektskilder eller arbeidsforhold?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{ tekst: 'Hvilke andre inntektskilder har du?', svar: null }, {
                tekst: 'Du trenger ikke oppgi andre ytelser fra NAV',
                svar: null,
            }, {
                tekst: 'Arbeidsforhold',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }, {
                tekst: 'Jordbruker / Fisker / Reindriftsutøver',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }, {
                tekst: 'Frilanser',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }, {
                tekst: 'Annet',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }],
        },
    }, {
        tekst: 'Har du oppholdt deg i utlandet i perioden 01.01.2017 - 31-01-2017?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: null,
                svar: { svartype: 'PERIODER', svarverdi: [], min: '2017-01-01', max: '2017-01-31', kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }, {
                tekst: 'Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?',
                svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }, {
        tekst: 'Har du vært under utdanning i løpet av perioden 01.01.2017 - 31.01.2017?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: 'Når startet du på utdanningen?',
                svar: { svartype: 'DATO', svarverdi: [], min: '2017-01-01', max: '2017-01-31', kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }, {
                tekst: 'Er utdanningen et fulltidsstudium?',
                svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }],
};

const parsetSoknad1 = {
    uuid: 'uuid123',
    id: 'uuid123',
    status: 'NY',
    fom: new Date("2018-03-12"),
    tom: new Date("2018-03-17"),
    opprettetDato: new Date("2018-02-30"),
    soknadstype: "SELVSTENDIGE_OG_FRILANSERE",
    sporsmal: [{
        tekst: 'Var du tilbake i fullt arbeid som selvstendig næringsdrivende før sykmeldingsperioden utløp 31.01.2017?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: 'Når var du tilbake i arbeid?',
                svar: { svartype: 'DATO', svarverdi: [], min: new Date('2017-01-01'), max: new Date('2017-01-31'), kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }, {
        tekst: 'I perioden 01.01.2017 - 31.01.2017 var du 100% sykmeldt som selvstendig næringsdrivende. Jobbet du noe i denne perioden?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: 'Hvor mange timer jobbet du normalt per uke som selvstendig næringsdrivende?',
                svar: { svartype: 'TALL', svarverdi: [], min: 0, max: 100, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }, {
                tekst: 'Hvor mye jobbet du totalt i denne perioden som selvstendig næringsdrivende?',
                svar: { svartype: 'PROSENT_TIMER', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }, {
        tekst: 'Har du andre inntektskilder eller arbeidsforhold?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{ tekst: 'Hvilke andre inntektskilder har du?', svar: null }, {
                tekst: 'Du trenger ikke oppgi andre ytelser fra NAV',
                svar: null,
            }, {
                tekst: 'Arbeidsforhold',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }, {
                tekst: 'Jordbruker / Fisker / Reindriftsutøver',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }, {
                tekst: 'Frilanser',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }, {
                tekst: 'Annet',
                svar: {
                    svartype: 'CHECKBOX',
                    svarverdi: [],
                    min: null,
                    max: null,
                    kriterieForVisningAvUndersporsmal: 'CHECKED',
                    undersporsmal: [{
                        tekst: 'Er du sykmeldt fra dette?',
                        svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
                    }],
                },
            }],
        },
    }, {
        tekst: 'Har du oppholdt deg i utlandet i perioden 01.01.2017 - 31-01-2017?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: null,
                svar: { svartype: 'PERIODER', svarverdi: [], min: new Date('2017-01-01'), max: new Date('2017-01-31'), kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }, {
                tekst: 'Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?',
                svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }, {
        tekst: 'Har du vært under utdanning i løpet av perioden 01.01.2017 - 31.01.2017?',
        svar: {
            svartype: 'JA_NEI',
            svarverdi: [],
            min: null,
            max: null,
            kriterieForVisningAvUndersporsmal: 'JA',
            undersporsmal: [{
                tekst: 'Når startet du på utdanningen?',
                svar: { svartype: 'DATO', svarverdi: [], min: new Date('2017-01-01'), max: new Date('2017-01-31'), kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }, {
                tekst: 'Er utdanningen et fulltidsstudium?',
                svar: { svartype: 'JA_NEI', svarverdi: [], min: null, max: null, kriterieForVisningAvUndersporsmal: null, undersporsmal: [] },
            }],
        },
    }],
};

export const soknadrespons = [soknad1];

export const getSoknad = (soknad) => {
    return {
        ...parsetSoknad1,
        soknad,
    };
}

export default [parsetSoknad1];
