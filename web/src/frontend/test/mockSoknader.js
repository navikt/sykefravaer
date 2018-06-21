const soknad1 = {
    "fom": "2018-05-20",
    "id": "e062a444-5171-4147-84a3-19c8b4ba3c39",
    "opprettetDato": "2018-05-29",
    "soknadstype": "SELVSTENDIGE_OG_FRILANSERE",
    "sporsmal": [
        {
            "id": "1",
            "kriterieForVisningAvUndersporsmal": null,
            "max": null,
            "min": null,
            "sporsmalstekst": "Jeg vet at dersom jeg gir uriktige opplysninger, eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar. Jeg er også klar over at jeg må melde fra til NAV dersom jeg sitter i varetekt, soner straff eller er under forvaring.",
            "svar": [],
            "svartype": "CHECKBOX",
            "tag": "ANSVARSERKLARING",
            "undersporsmal": [],
            "undertekst": null
        },
        {
            "id": "2",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Var du tilbake i fullt arbeid som FRILANSER før sykmeldingsperioden utløp 28.05.2018?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "TILBAKE_I_ARBEID",
            "undersporsmal": [
                {
                    "id": "3",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": "2018-05-28",
                    "min": "2018-05-20",
                    "sporsmalstekst": "Når var du tilbake i arbeid?",
                    "svar": [],
                    "svartype": "DATO",
                    "tag": "TILBAKE_NAR",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "30",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "I perioden 25.06.2018 - 28.06.2018 skulle du ifølge sykmeldingen jobbe 40% som FRILANSER. Jobbet du mer enn dette?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "JOBBET_DU_100_PROSENT_1",
            "undersporsmal": [
                {
                    "id": "31",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": "150",
                    "min": "1",
                    "sporsmalstekst": "Hvor mange timer jobber du normalt per uke som FRILANSER?",
                    "svar": [],
                    "svartype": "TIMER",
                    "tag": "HVOR_MANGE_TIMER_1",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "32",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": "99",
                    "min": "40",
                    "sporsmalstekst": "Hvor mye jobbet du totalt i denne perioden som FRILANSER?",
                    "svar": [],
                    "svartype": "PROSENT",
                    "tag": "HVOR_MYE_JOBBET_DU_1",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "4",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "I perioden 20.05.2018 - 28.05.2018 var du 100% sykmeldt som FRILANSER. Jobbet du noe i denne perioden?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "JOBBET_DU_100_PROSENT_0",
            "undersporsmal": [
                {
                    "id": "5",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": "150",
                    "min": "1",
                    "sporsmalstekst": "Hvor mange timer jobber du normalt per uke som FRILANSER?",
                    "svar": [],
                    "svartype": "TIMER",
                    "tag": "HVOR_MANGE_TIMER_0",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "6",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": "99",
                    "min": "1",
                    "sporsmalstekst": "Hvor mye jobbet du totalt i denne perioden som FRILANSER?",
                    "svar": [],
                    "svartype": "PROSENT",
                    "tag": "HVOR_MYE_JOBBET_DU_0",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "7",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Har du andre inntektskilder eller arbeidsforhold?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "ANDRE_INNTEKTSKILDER",
            "undersporsmal": [
                {
                    "id": "8",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": null,
                    "min": null,
                    "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                    "svar": [],
                    "svartype": "CHECKBOX_GRUPPE",
                    "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                    "undersporsmal": [
                        {
                            "id": "9",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Arbeidsforhold",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_ARBEIDSFORHOLD",
                            "undersporsmal": [
                                {
                                    "id": "10",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        },
                        {
                            "id": "11",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Jordbruker / Fisker / Reindriftsutøver",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_JORDBRUKER",
                            "undersporsmal": [
                                {
                                    "id": "12",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        },
                        {
                            "id": "13",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Frilanser",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_FRILANSER_SELVSTENDIG",
                            "undersporsmal": [
                                {
                                    "id": "14",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_FRILANSER_SELVSTENDIG_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        },
                        {
                            "id": "15",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Annet",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_ANNET",
                            "undersporsmal": [
                                {
                                    "id": "16",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        }
                    ],
                    "undertekst": "Du trenger ikke oppgi andre ytelser fra NAV"
                }
            ],
            "undertekst": null
        },
        {
            "id": "17",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Har du oppholdt deg i utlandet i perioden 20.05.2018 - 28.05.2018?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "UTLAND",
            "undersporsmal": [
                {
                    "id": "18",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": "2018-05-28",
                    "min": "2018-05-20",
                    "sporsmalstekst": null,
                    "svar": [],
                    "svartype": "PERIODER",
                    "tag": "PERIODER",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "19",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": null,
                    "min": null,
                    "sporsmalstekst": "Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?",
                    "svar": [],
                    "svartype": "JA_NEI",
                    "tag": "UTLANDSOPPHOLD_SOKT_SYKEPENGER",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "20",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 20.05.2018 - 28.05.2018?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "UTDANNING",
            "undersporsmal": [
                {
                    "id": "21",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": "2018-05-28",
                    "min": "2018-05-20",
                    "sporsmalstekst": "Når startet du på utdanningen?",
                    "svar": [],
                    "svartype": "DATO",
                    "tag": "UTDANNING_START",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "22",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": null,
                    "min": null,
                    "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
                    "svar": [],
                    "svartype": "JA_NEI",
                    "tag": "FULLTIDSSTUDIUM",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "23",
            "kriterieForVisningAvUndersporsmal": null,
            "max": null,
            "min": null,
            "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
            "svar": [],
            "svartype": "CHECKBOX",
            "tag": "BEKREFT_OPPLYSNINGER",
            "undersporsmal": [],
            "undertekst": null
        }
    ],
    "status": "NY",
    "sykmeldingId": "14e78e84-50a5-45bb-9919-191c54f99691",
    "tom": "2018-05-28"
};

const parsetSoknad1 = {
    "fom": new Date("2018-05-20"),
    "id": "e062a444-5171-4147-84a3-19c8b4ba3c39",
    "opprettetDato": new Date("2018-05-29"),
    "soknadstype": "SELVSTENDIGE_OG_FRILANSERE",
    "sporsmal": [
        {
            "id": "1",
            "kriterieForVisningAvUndersporsmal": null,
            "max": null,
            "min": null,
            "sporsmalstekst": "Jeg vet at dersom jeg gir uriktige opplysninger, eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar. Jeg er også klar over at jeg må melde fra til NAV dersom jeg sitter i varetekt, soner straff eller er under forvaring.",
            "svar": [],
            "svartype": "CHECKBOX",
            "tag": "ANSVARSERKLARING",
            "undersporsmal": [],
            "undertekst": null
        },
        {
            "id": "2",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Var du tilbake i fullt arbeid som FRILANSER før sykmeldingsperioden utløp 28.05.2018?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "TILBAKE_I_ARBEID",
            "undersporsmal": [
                {
                    "id": "3",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": new Date("2018-05-28"),
                    "min": new Date("2018-05-20"),
                    "sporsmalstekst": "Når var du tilbake i arbeid?",
                    "svar": [],
                    "svartype": "DATO",
                    "tag": "TILBAKE_NAR",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "30",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "I perioden 25.06.2018 - 28.06.2018 skulle du ifølge sykmeldingen jobbe 40% som FRILANSER. Jobbet du mer enn dette?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "JOBBET_DU_100_PROSENT_1",
            "undersporsmal": [
                {
                    "id": "31",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": 150,
                    "min": 1,
                    "sporsmalstekst": "Hvor mange timer jobber du normalt per uke som FRILANSER?",
                    "svar": [],
                    "svartype": "TIMER",
                    "tag": "HVOR_MANGE_TIMER_1",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "32",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": 99,
                    "min": 40,
                    "sporsmalstekst": "Hvor mye jobbet du totalt i denne perioden som FRILANSER?",
                    "svar": [],
                    "svartype": "PROSENT",
                    "tag": "HVOR_MYE_JOBBET_DU_1",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "4",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "I perioden 20.05.2018 - 28.05.2018 var du 100% sykmeldt som FRILANSER. Jobbet du noe i denne perioden?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "JOBBET_DU_100_PROSENT_0",
            "undersporsmal": [
                {
                    "id": "5",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": 150,
                    "min": 1,
                    "sporsmalstekst": "Hvor mange timer jobber du normalt per uke som FRILANSER?",
                    "svar": [],
                    "svartype": "TIMER",
                    "tag": "HVOR_MANGE_TIMER_0",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "6",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": 99,
                    "min": 1,
                    "sporsmalstekst": "Hvor mye jobbet du totalt i denne perioden som FRILANSER?",
                    "svar": [],
                    "svartype": "PROSENT",
                    "tag": "HVOR_MYE_JOBBET_DU_0",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "7",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Har du andre inntektskilder eller arbeidsforhold?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "ANDRE_INNTEKTSKILDER",
            "undersporsmal": [
                {
                    "id": "8",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": null,
                    "min": null,
                    "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                    "svar": [],
                    "svartype": "CHECKBOX_GRUPPE",
                    "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                    "undersporsmal": [
                        {
                            "id": "9",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Arbeidsforhold",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_ARBEIDSFORHOLD",
                            "undersporsmal": [
                                {
                                    "id": "10",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        },
                        {
                            "id": "11",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Jordbruker / Fisker / Reindriftsutøver",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_JORDBRUKER",
                            "undersporsmal": [
                                {
                                    "id": "12",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        },
                        {
                            "id": "13",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Frilanser",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_FRILANSER_SELVSTENDIG",
                            "undersporsmal": [
                                {
                                    "id": "14",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_FRILANSER_SELVSTENDIG_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        },
                        {
                            "id": "15",
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "max": null,
                            "min": null,
                            "sporsmalstekst": "Annet",
                            "svar": [],
                            "svartype": "CHECKBOX",
                            "tag": "INNTEKTSKILDE_ANNET",
                            "undersporsmal": [
                                {
                                    "id": "16",
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "max": null,
                                    "min": null,
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "svar": [],
                                    "svartype": "JA_NEI",
                                    "tag": "INNTEKTSKILDE_ANNET_ER_DU_SYKMELDT",
                                    "undersporsmal": [],
                                    "undertekst": null
                                }
                            ],
                            "undertekst": null
                        }
                    ],
                    "undertekst": "Du trenger ikke oppgi andre ytelser fra NAV"
                }
            ],
            "undertekst": null
        },
        {
            "id": "17",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Har du oppholdt deg i utlandet i perioden 20.05.2018 - 28.05.2018?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "UTLAND",
            "undersporsmal": [
                {
                    "id": "18",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": new Date("2018-05-28"),
                    "min": new Date("2018-05-20"),
                    "sporsmalstekst": null,
                    "svar": [],
                    "svartype": "PERIODER",
                    "tag": "PERIODER",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "19",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": null,
                    "min": null,
                    "sporsmalstekst": "Har du søkt om å beholde sykepenger under dette oppholdet utenfor Norge?",
                    "svar": [],
                    "svartype": "JA_NEI",
                    "tag": "UTLANDSOPPHOLD_SOKT_SYKEPENGER",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "20",
            "kriterieForVisningAvUndersporsmal": "JA",
            "max": null,
            "min": null,
            "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 20.05.2018 - 28.05.2018?",
            "svar": [],
            "svartype": "JA_NEI",
            "tag": "UTDANNING",
            "undersporsmal": [
                {
                    "id": "21",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": new Date("2018-05-28"),
                    "min": new Date("2018-05-20"),
                    "sporsmalstekst": "Når startet du på utdanningen?",
                    "svar": [],
                    "svartype": "DATO",
                    "tag": "UTDANNING_START",
                    "undersporsmal": [],
                    "undertekst": null
                },
                {
                    "id": "22",
                    "kriterieForVisningAvUndersporsmal": null,
                    "max": null,
                    "min": null,
                    "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
                    "svar": [],
                    "svartype": "JA_NEI",
                    "tag": "FULLTIDSSTUDIUM",
                    "undersporsmal": [],
                    "undertekst": null
                }
            ],
            "undertekst": null
        },
        {
            "id": "23",
            "kriterieForVisningAvUndersporsmal": null,
            "max": null,
            "min": null,
            "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
            "svar": [],
            "svartype": "CHECKBOX",
            "tag": "BEKREFT_OPPLYSNINGER",
            "undersporsmal": [],
            "undertekst": null
        }
    ],
    "status": "NY",
    "sykmeldingId": "14e78e84-50a5-45bb-9919-191c54f99691",
    "tom": new Date("2018-05-28")
};

export const soknadrespons = [soknad1];

export const getSoknad = (soknad = {}) => {
    return {
        ...parsetSoknad1,
        ...soknad,
    };
};

export default [parsetSoknad1];
