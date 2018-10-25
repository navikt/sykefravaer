import { parseSoknad } from '../../js/reducers/soknader';
/* eslint-disable max-len */
export const nySoknadArbeidstaker =   {
    "id": "5d84aeec-7fa9-4d15-8d87-6d7a511abfcc",
    "aktorId": "aktorId-745463060",
    "sykmeldingId": "289148ba-4c3c-4b3f-b7a3-385b7e7c927d",
    "soknadstype": "ARBEIDSTAKERE",
    "status": "NY",
    "fom": "2018-10-06",
    "tom": "2018-10-15",
    "opprettetDato": "2018-10-25",
    "innsendtDato": null,
    "avbruttDato": null,
    "korrigerer": null,
    "korrigertAv": null,
    "sporsmal": [
        {
            "id": "55",
            "tag": "ANSVARSERKLARING",
            "sporsmalstekst": "Jeg vet at dersom jeg gir uriktige opplysninger, eller holder tilbake opplysninger som har betydning for min rett til sykepenger, kan pengene holdes tilbake eller kreves tilbake, og/eller det kan medføre straffeansvar. Jeg er også klar over at jeg må melde fra til NAV dersom jeg i sykmeldingsperioden satt i varetekt, sonet straff eller var under forvaring.",
            "undertekst": null,
            "svartype": "CHECKBOX_PANEL",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": null,
            "svar": [
                {
                    "verdi": "CHECKED"
                }
            ],
            "undersporsmal": []
        },
        {
            "id": "56",
            "tag": "EGENMELDINGER",
            "sporsmalstekst": "Vi har registrert at du ble sykmeldt mandag 1. oktober 2018. Brukte du egenmeldinger og/eller var du sykmeldt i perioden 15. - 30. september 2018?",
            "undertekst": null,
            "svartype": "JA_NEI",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": "JA",
            "svar": [
                {
                    "verdi": "JA"
                }
            ],
            "undersporsmal": [
                {
                    "id": "57",
                    "tag": "EGENMELDINGER_NAR",
                    "sporsmalstekst": "Hvilke dager før 1. oktober 2018 var du borte fra jobb?",
                    "undertekst": null,
                    "svartype": "PERIODER",
                    "svaralternativer": null,
                    "min": "2018-04-01",
                    "max": "2018-09-30",
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [
                        {
                            "verdi": "{\"fom\":\"2018-09-28\",\"tom\":\"2018-09-30\"}"
                        }
                    ],
                    "undersporsmal": []
                }
            ]
        },
        {
            "id": "58",
            "tag": "TILBAKE_I_ARBEID",
            "sporsmalstekst": "Var du tilbake i fullt arbeid hos ARBEIDSGIVER A/S før 16. oktober 2018?",
            "undertekst": null,
            "svartype": "JA_NEI",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": "JA",
            "svar": [
                {
                    "verdi": "JA"
                }
            ],
            "undersporsmal": [
                {
                    "id": "59",
                    "tag": "TILBAKE_NAR",
                    "sporsmalstekst": "Fra hvilken dato ble arbeidet gjenopptatt?",
                    "undertekst": null,
                    "svartype": "DATO",
                    "svaralternativer": null,
                    "min": "2018-10-06",
                    "max": "2018-10-15",
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [
                        {
                            "verdi": "2018-10-13"
                        }
                    ],
                    "undersporsmal": []
                }
            ]
        },
        {
            "id": "60",
            "tag": "JOBBET_DU_100_PROSENT_0",
            "sporsmalstekst": "I perioden 6. - 10. oktober 2018 var du 100 % sykmeldt fra ARBEIDSGIVER A/S. Jobbet du noe i denne perioden?",
            "undertekst": null,
            "svartype": "JA_NEI",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": "JA",
            "svar": [
                {
                    "verdi": "JA"
                }
            ],
            "undersporsmal": [
                {
                    "id": "61",
                    "tag": "HVOR_MANGE_TIMER_PER_UKE_0",
                    "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                    "undertekst": "timer per uke",
                    "svartype": "TALL",
                    "svaralternativer": null,
                    "min": "1",
                    "max": "150",
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [
                        {
                            "verdi": "37,5"
                        }
                    ],
                    "undersporsmal": []
                },
                {
                    "id": "62",
                    "tag": "HVOR_MYE_HAR_DU_JOBBET_0",
                    "sporsmalstekst": "Hvor mye jobbet du totaltttt 6. - 10. oktober 2018 hos ARBEIDSGIVER A/S?",
                    "undertekst": null,
                    "svartype": "RADIO_GRUPPE",
                    "svaralternativer": [
                        {
                            "verdi": "PROSENT",
                            "svartekst": "prosent"
                        },
                        {
                            "verdi": "TIMER",
                            "svartekst": "timer"
                        }
                    ],
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "TIMER",
                    "svar": [
                        {
                            "verdi": "TIMER"
                        }
                    ],
                    "undersporsmal": [
                        {
                            "id": "63",
                            "tag": "HVOR_MYE_PROSENT_VERDI_0",
                            "sporsmalstekst": null,
                            "undertekst": "prosent",
                            "svartype": "TALL",
                            "svaralternativer": null,
                            "min": "1",
                            "max": "99",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [
                                {
                                    "verdi": "79"
                                }
                            ],
                            "undersporsmal": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "64",
            "tag": "JOBBET_DU_GRADERT_1",
            "sporsmalstekst": "I perioden 11. - 15. oktober 2018 skulle du jobbe 60 % av ditt normale arbeid hos ARBEIDSGIVER A/S. Jobbet du mer enn dette?",
            "undertekst": null,
            "svartype": "JA_NEI",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": "JA",
            "svar": [],
            "undersporsmal": [
                {
                    "id": "65",
                    "tag": "HVOR_MANGE_TIMER_PER_UKE_1",
                    "sporsmalstekst": "Hvor mange timer jobbet du per uke før du ble sykmeldt?",
                    "undertekst": "timer per uke",
                    "svartype": "TALL",
                    "svaralternativer": null,
                    "min": "1",
                    "max": "150",
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "66",
                    "tag": "HVOR_MYE_HAR_DU_JOBBET_1",
                    "sporsmalstekst": "Hvor mye jobbet du totaltttt 11. - 15. oktober 2018 hos ARBEIDSGIVER A/S?",
                    "undertekst": null,
                    "svartype": "RADIO_GRUPPE",
                    "svaralternativer": [
                        {
                            "verdi": "PROSENT",
                            "svartekst": "prosent"
                        },
                        {
                            "verdi": "TIMER",
                            "svartekst": "timer"
                        }
                    ],
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": "PROSENT",
                    "svar": [
                        {
                            "verdi": "PROSENT"
                        }
                    ],
                    "undersporsmal": [
                        {
                            "id": "67",
                            "tag": "HVOR_MYE_PROSENT_VERDI_1",
                            "sporsmalstekst": null,
                            "undertekst": "prosent",
                            "svartype": "TALL",
                            "svaralternativer": null,
                            "min": "61",
                            "max": "99",
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "68",
            "tag": "FERIE_PERMISJON_UTLAND",
            "sporsmalstekst": "Har du hatt ferie, permisjon eller oppholdt deg utenfor Norge i perioden 6. - 15. oktober 2018?",
            "undertekst": null,
            "svartype": "JA_NEI",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": "JA",
            "svar": [
                {
                    "verdi": "JA"
                }
            ],
            "undersporsmal": [
                {
                    "id": "69",
                    "tag": "FERIE_PERMISJON_UTLAND_HVA",
                    "sporsmalstekst": "Kryss av alt som gjelder deg:",
                    "undertekst": null,
                    "svartype": "CHECKBOX_GRUPPE",
                    "svaralternativer": null,
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "70",
                            "tag": "FERIE",
                            "sporsmalstekst": "Jeg tok ut ferie",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [
                                {
                                    "verdi": "CHECKED"
                                }
                            ],
                            "undersporsmal": [
                                {
                                    "id": "71",
                                    "tag": "FERIE_NAR",
                                    "sporsmalstekst": null,
                                    "undertekst": null,
                                    "svartype": "PERIODER",
                                    "svaralternativer": null,
                                    "min": "2018-10-06",
                                    "max": "2018-10-15",
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [
                                        {
                                            "verdi": "{\"fom\":\"2018-10-08\",\"tom\":\"2018-10-10\"}"
                                        }
                                    ],
                                    "undersporsmal": []
                                }
                            ]
                        },
                        {
                            "id": "72",
                            "tag": "PERMISJON",
                            "sporsmalstekst": "Jeg hadde permisjon",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "73",
                                    "tag": "PERMISJON_NAR",
                                    "sporsmalstekst": null,
                                    "undertekst": null,
                                    "svartype": "PERIODER",
                                    "svaralternativer": null,
                                    "min": "2018-10-06",
                                    "max": "2018-10-15",
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [],
                                    "undersporsmal": []
                                }
                            ]
                        },
                        {
                            "id": "74",
                            "tag": "UTLAND",
                            "sporsmalstekst": "Jeg var utenfor Norge",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [
                                {
                                    "verdi": "CHECKED"
                                }
                            ],
                            "undersporsmal": [
                                {
                                    "id": "75",
                                    "tag": "UTLAND_NAR",
                                    "sporsmalstekst": null,
                                    "undertekst": null,
                                    "svartype": "PERIODER",
                                    "svaralternativer": null,
                                    "min": "2018-10-06",
                                    "max": "2018-10-15",
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [
                                        {
                                            "verdi": "{\"fom\":\"2018-10-07\",\"tom\":\"2018-10-08\"}"
                                        },
                                        {
                                            "verdi": "{\"fom\":\"2018-10-10\",\"tom\":\"2018-10-12\"}"
                                        }
                                    ],
                                    "undersporsmal": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "76",
            "tag": "ANDRE_INNTEKTSKILDER",
            "sporsmalstekst": "Har du andre inntektskilder, eller jobber du for andre enn ARBEIDSGIVER A/S?",
            "undertekst": null,
            "svartype": "JA_NEI",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": "JA",
            "svar": [
                {
                    "verdi": "JA"
                }
            ],
            "undersporsmal": [
                {
                    "id": "77",
                    "tag": "HVILKE_ANDRE_INNTEKTSKILDER",
                    "sporsmalstekst": "Hvilke andre inntektskilder har du?",
                    "undertekst": "Du trenger ikke oppgi andre ytelser fra NAV",
                    "svartype": "CHECKBOX_GRUPPE",
                    "svaralternativer": null,
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": [
                        {
                            "id": "78",
                            "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD",
                            "sporsmalstekst": "Andre arbeidsforhold",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [
                                {
                                    "verdi": "CHECKED"
                                }
                            ],
                            "undersporsmal": [
                                {
                                    "id": "79",
                                    "tag": "INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT",
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "undertekst": null,
                                    "svartype": "JA_NEI",
                                    "svaralternativer": null,
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [
                                        {
                                            "verdi": "JA"
                                        }
                                    ],
                                    "undersporsmal": []
                                }
                            ]
                        },
                        {
                            "id": "80",
                            "tag": "INNTEKTSKILDE_SELVSTENDIG",
                            "sporsmalstekst": "Selvstendig næringsdrivende",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [
                                {
                                    "verdi": "CHECKED"
                                }
                            ],
                            "undersporsmal": [
                                {
                                    "id": "81",
                                    "tag": "INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT",
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "undertekst": null,
                                    "svartype": "JA_NEI",
                                    "svaralternativer": null,
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [
                                        {
                                            "verdi": "JA"
                                        }
                                    ],
                                    "undersporsmal": []
                                }
                            ]
                        },
                        {
                            "id": "82",
                            "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA",
                            "sporsmalstekst": "Selvstendig næringsdrivende dagmamma",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [
                                {
                                    "verdi": "CHECKED"
                                }
                            ],
                            "undersporsmal": [
                                {
                                    "id": "83",
                                    "tag": "INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT",
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "undertekst": null,
                                    "svartype": "JA_NEI",
                                    "svaralternativer": null,
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [
                                        {
                                            "verdi": "NEI"
                                        }
                                    ],
                                    "undersporsmal": []
                                }
                            ]
                        },
                        {
                            "id": "84",
                            "tag": "INNTEKTSKILDE_JORDBRUKER",
                            "sporsmalstekst": "Jordbruker / Fisker / Reindriftsutøver",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "85",
                                    "tag": "INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT",
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "undertekst": null,
                                    "svartype": "JA_NEI",
                                    "svaralternativer": null,
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [],
                                    "undersporsmal": []
                                }
                            ]
                        },
                        {
                            "id": "86",
                            "tag": "INNTEKTSKILDE_FRILANSER",
                            "sporsmalstekst": "Frilanser",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": "CHECKED",
                            "svar": [],
                            "undersporsmal": [
                                {
                                    "id": "87",
                                    "tag": "INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT",
                                    "sporsmalstekst": "Er du sykmeldt fra dette?",
                                    "undertekst": null,
                                    "svartype": "JA_NEI",
                                    "svaralternativer": null,
                                    "min": null,
                                    "max": null,
                                    "pavirkerAndreSporsmal": false,
                                    "kriterieForVisningAvUndersporsmal": null,
                                    "svar": [],
                                    "undersporsmal": []
                                }
                            ]
                        },
                        {
                            "id": "88",
                            "tag": "INNTEKTSKILDE_ANNET",
                            "sporsmalstekst": "Annet",
                            "undertekst": null,
                            "svartype": "CHECKBOX",
                            "svaralternativer": null,
                            "min": null,
                            "max": null,
                            "pavirkerAndreSporsmal": false,
                            "kriterieForVisningAvUndersporsmal": null,
                            "svar": [],
                            "undersporsmal": []
                        }
                    ]
                }
            ]
        },
        {
            "id": "89",
            "tag": "UTDANNING",
            "sporsmalstekst": "Har du vært under utdanning i løpet av perioden 6. - 15. oktober 2018?",
            "undertekst": null,
            "svartype": "JA_NEI",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": "JA",
            "svar": [
                {
                    "verdi": "JA"
                }
            ],
            "undersporsmal": [
                {
                    "id": "90",
                    "tag": "UTDANNING_START",
                    "sporsmalstekst": "Når startet du på utdanningen?",
                    "undertekst": null,
                    "svartype": "DATO",
                    "svaralternativer": null,
                    "min": null,
                    "max": "2018-10-15",
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [
                        {
                            "verdi": "2018-10-09"
                        }
                    ],
                    "undersporsmal": []
                },
                {
                    "id": "91",
                    "tag": "FULLTIDSSTUDIUM",
                    "sporsmalstekst": "Er utdanningen et fulltidsstudium?",
                    "undertekst": null,
                    "svartype": "JA_NEI",
                    "svaralternativer": null,
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [
                        {
                            "verdi": "NEI"
                        }
                    ],
                    "undersporsmal": []
                }
            ]
        },
        {
            "id": "92",
            "tag": "VAER_KLAR_OVER_AT",
            "sporsmalstekst": "Vær klar over at:",
            "undertekst": "<ul><li>rett til sykepenger forutsetter at du er borte fra arbeid på grunn av egen sykdom. Sosiale eller økonomiske problemer gir ikke rett til sykepenger</li><li>du kan miste retten til sykepenger hvis du uten rimelig grunn nekter å opplyse om egen funksjonsevne eller nekter å ta imot tilbud om behandling og/eller tilrettelegging</li><li>sykepenger utbetales i maksimum 52 uker, også for gradert (delvis) sykmelding</li><li>fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul>",
            "svartype": "IKKE_RELEVANT",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": null,
            "svar": [],
            "undersporsmal": []
        },
        {
            "id": "93",
            "tag": "BEKREFT_OPPLYSNINGER",
            "sporsmalstekst": "Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.",
            "undertekst": null,
            "svartype": "CHECKBOX_PANEL",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": null,
            "svar": [
                {
                    "verdi": "CHECKED"
                }
            ],
            "undersporsmal": []
        },
        {
            "id": "94",
            "tag": "BETALER_ARBEIDSGIVER",
            "sporsmalstekst": "Betaler arbeidsgiveren lønnen din når du er syk?",
            "undertekst": null,
            "svartype": "RADIO_GRUPPE",
            "svaralternativer": null,
            "min": null,
            "max": null,
            "pavirkerAndreSporsmal": false,
            "kriterieForVisningAvUndersporsmal": null,
            "svar": [],
            "undersporsmal": [
                {
                    "id": "95",
                    "tag": "BETALER_ARBEIDSGIVER_JA",
                    "sporsmalstekst": "Ja",
                    "undertekst": "Arbeidsgiveren din mottar kopi av søknaden du sender til NAV.",
                    "svartype": "RADIO",
                    "svaralternativer": null,
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "96",
                    "tag": "BETALER_ARBEIDSGIVER_NEI",
                    "sporsmalstekst": "Nei",
                    "undertekst": "Søknaden sendes til NAV. Arbeidsgiveren din får ikke kopi.",
                    "svartype": "RADIO",
                    "svaralternativer": null,
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [],
                    "undersporsmal": []
                },
                {
                    "id": "97",
                    "tag": "BETALER_ARBEIDSGIVER_VET_IKKE",
                    "sporsmalstekst": "Vet ikke",
                    "undertekst": "Siden du ikke vet svaret på dette spørsmålet, vil arbeidsgiveren din motta en kopi av søknaden du sender til NAV.",
                    "svartype": "RADIO",
                    "svaralternativer": null,
                    "min": null,
                    "max": null,
                    "pavirkerAndreSporsmal": false,
                    "kriterieForVisningAvUndersporsmal": null,
                    "svar": [
                        {
                            "verdi": "CHECKED"
                        }
                    ],
                    "undersporsmal": []
                }
            ]
        }
    ]
};

/* eslint-enable max-len */

export const getNySoknadArbeidstaker = (soknad = {}) => {
    return parseSoknad({
        ...nySoknadArbeidstaker,
        ...soknad,
    });
};

const mockSoknadArbeidstaker = (soknad = {}) => {
    return parseSoknad({
        ...nySoknadArbeidstaker,
        ...soknad,
    });
};

export default mockSoknadArbeidstaker;
