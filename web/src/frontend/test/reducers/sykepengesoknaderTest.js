import deepFreeze from "deep-freeze";
import {expect} from "chai";
import * as actiontyper from "../../js/actions/actiontyper";
import sykepengesoknader, {
    finnSoknad,
    parseDatofelter,
    sorterAktiviteterEldsteFoerst,
    settErOppdelt,
} from "../../js/reducers/sykepengesoknader";
import * as actions from "../../js/actions/sykepengesoknader_actions";
import * as berikelses_actions from "../../js/actions/sykepengesoknader_actions";
import sinon from "sinon";

describe('sykepengesoknader', () => {

    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    })

    afterEach(() => {
        clock.restore();
    })

    describe('henter', () => {

        let initialState = deepFreeze({
            data: [],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it('håndterer SYKEPENGESOKNADER_HENTET', () => {
            const action = {
                type: actiontyper.SYKEPENGESOKNADER_HENTET,
                sykepengesoknader: [getSoknad()],
            };
            const nextState = sykepengesoknader(initialState, action);

            expect(nextState).to.deep.equal({
                data: [getParsetSoknad()],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                hentet: true,
            });
        });

        it("håndterer HENTER_SYKEPENGESOKNADER", () => {
            const action = actions.henterSykepengesoknader();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henter: true,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                hentet: false,
            });
        });

        it("håndterer HENT_SYKEPENGESOKNADER_FEILET", () => {
            const soknad = {
                id: '1',
            };

            initialState = deepFreeze({
                data: [soknad],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });

            const action = actions.hentSykepengesoknaderFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                henter: false,
                hentingFeilet: true,
                sender: false,
                sendingFeilet: false,
                hentet: false,
            });
        });
    });

    describe("innsending", () => {

        const soknad = {
            id: '1',
        };

        let initialState = deepFreeze({
            data: [soknad],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it("håndterer SENDER_SYKEPENGESOKNAD", () => {
            const action = {
                type: actiontyper.SENDER_SYKEPENGESOKNAD
            };
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                sender: true,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SEND_SYKEPENGESOKNAD_FEILET", () => {
            const action = actions.sendSykepengesoknadFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [soknad],
                sender: false,
                sendingFeilet: true,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SYKEPENGESOKNAD_SENDT", () => {
            let initialState = deepFreeze({
                data: [{id: '1'}, {id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = actions.sykepengesoknadSendt("1", getSoknad());
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [getParsetSoknad(), {
                    id: '2'
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SYKEPENGESOKNAD_SENDT når den sendte søknaden korrigerer en annen", () => {
            let initialState = deepFreeze({
                data: [getParsetSoknad(), {id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const soknad = getSoknad();
            soknad.id = "1";
            soknad.korrigerer = "2";
            const action = actions.sykepengesoknadSendt("1", soknad);
            const nextState = sykepengesoknader(initialState, action);

            const parsetSoknad = getParsetSoknad();
            parsetSoknad.korrigerer = "2";
            expect(nextState).to.deep.equal({
                data: [parsetSoknad, {
                    id: '2',
                    status: "KORRIGERT"
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SYKEPENGESOKNAD_SENDT_TIL_NAV", () => {
            let initialState = deepFreeze({
                data: [{id: '1'}, {id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = actions.sykepengesoknadSendtTilNAV("1", getSoknad());
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [getParsetSoknad(), {
                    id: '2'
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SYKEPENGESOKNAD_SENDT_TIL_ARBEIDSGIVER", () => {
            let initialState = deepFreeze({
                data: [{id: '1'}, {id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = actions.sykepengesoknadSendtTilArbeidsgiver("1", getSoknad());
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [getParsetSoknad(), {
                    id: '2'
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer SEND_SYKEPENGESOKNAD_HAR_IKKE_FEILET", () => {
            let initialState = deepFreeze({
                data: [{id: '1'}, {id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: true,
            });
            const action = actions.sendSykepengesoknadHarIkkeFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    id: "1",
                }, {
                    id: '2'
                }],
                sender: false,
                sendingFeilet: false,
                henter: false,
                hentingFeilet: false,
            });
        });

    });

    describe("Endring", () => {

        it("Håndterer START_ENDRING_SYKEPENGESOKNAD_FORESPURT", () => {
            let initialState = deepFreeze({
                data: [{id: '1'}, {id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = actions.startEndringForespurt("2");
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState.starterEndring).to.be.true;
            expect(nextState.startEndringFeilet).to.be.false;
        });

        it("Håndterer ENDRING_SYKEPENGESOKNAD_STARTET hvis søknaden ikke finnes i listen fra før", () => {
            let initialState = deepFreeze({
                data: [{id: '88'}, {id: '99'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = actions.endringStartet(getSoknad());
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState.starterEndring).to.be.false;
            expect(nextState.startEndringFeilet).to.be.false;
            expect(nextState.data.length).to.equal(3);
            expect(nextState.data[2]).to.deep.equal(getParsetSoknad());
        });

        it("Håndterer ENDRING_SYKEPENGESOKNAD_STARTET hvis søknaden finnes i listen fra før", () => {
            let initialState = deepFreeze({
                data: [{id: '88'}, {id: '99'}, getParsetSoknad()],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
            });
            const action = actions.endringStartet(getSoknad());
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState.starterEndring).to.be.false;
            expect(nextState.startEndringFeilet).to.be.false;
            expect(nextState.data.length).to.equal(3);
        });

        it("Håndterer startEndringFeilet", () => {
            let initialState = deepFreeze({
                data: [{id: '1'}, {id: '2'}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                starterEndring: true,
            });
            const action = actions.startEndringFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState.starterEndring).to.be.false;
            expect(nextState.startEndringFeilet).to.be.true;
        })

    });

    describe("Avbryt søknad", () => {

        let state = deepFreeze({
            data: [{id: "1", status: "NY", id: "2", status: "SENDT"}],
            henter: false,
            hentingFeilet: false,
            sender: false,
            sendingFeilet: false,
        });

        it("Håndterer avbryterSoknad()", () => {
            const action = actions.avbryterSoknad();
            state = sykepengesoknader(state, action);
            expect(state).to.deep.equal({
                data: [{id: "1", status: "NY", id: "2", status: "SENDT"}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                avbryter: true,
            });
        });

        it("Håndterer avbrytSoknadFeilet()", () => {
            state = deepFreeze(state);
            const action = actions.avbrytSoknadFeilet();
            state = sykepengesoknader(state, action);
            expect(state).to.deep.equal({
                data: [{id: "1", status: "NY", id: "2", status: "SENDT"}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: true,
            });
        });

        it("Håndterer soknadAvbrutt()", () => {
            state = deepFreeze(state);
            const action = actions.soknadAvbrutt("1");
            state = sykepengesoknader(state, action);
            expect(state).to.deep.equal({
                data: [{id: "1", status: "AVBRUTT", id: "2", status: "SENDT"}],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false,
                avbryter: false,
                avbrytFeilet: false,
            });
        })
    })

    describe("parsing", () => {
        it("parser datofelter i aktivitet og beholder resten av feltene", () => {
            const _soknad = parseDatofelter(getSoknad());
            expect(_soknad.aktiviteter[0].periode.fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.aktiviteter[0].periode.tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
            expect(_soknad.aktiviteter[0].grad).to.be.equal(100);
        });

        it("parser datofelter i egenmeldingsperioder", () => {
            const soknad = Object.assign({}, getSoknad(), {
                egenmeldingsperioder: [
                    {
                        fom: "2016-07-15",
                        tom: "2017-01-19",
                    }, {
                        fom: "2016-07-15",
                        tom: "2017-01-19",
                    },
                ]
            });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.egenmeldingsperioder[0].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.egenmeldingsperioder[0].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i ferie", () => {
            const soknad = Object.assign({}, getSoknad(), {
                ferie: [
                    {
                        fom: "2016-07-15",
                        tom: "2017-01-19",
                    }, {
                        fom: "2016-07-15",
                        tom: "2017-01-19",
                    },
                ]
            });

            const _soknad = parseDatofelter(soknad);
            expect(_soknad.ferie[1].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.ferie[1].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i permisjon", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    permisjon: [
                        {
                            fom: "2016-07-15",
                            tom: "2017-01-19",
                        }, {
                            fom: "2016-07-15",
                            tom: "2017-01-19",
                        },
                    ]
                });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.permisjon[1].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.permisjon[1].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i utenlandsopphold", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    utenlandsopphold: {
                        soektOmSykepengerIPerioden: false,
                        perioder: [
                            {
                                fom: "2016-07-15",
                                tom: "2017-01-19",
                            }, {
                                fom: "2016-07-15",
                                tom: "2017-01-19",
                            },
                        ]
                    }
                });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.utenlandsopphold.soektOmSykepengerIPerioden).to.be.equal(false);
            expect(_soknad.utenlandsopphold.perioder[1].fom.getTime()).to.be.equal(new Date("2016-07-15").getTime());
            expect(_soknad.utenlandsopphold.perioder[1].tom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser datofelter i utdanning", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    utdanning: {
                        utdanningStartdato: "2017-01-01",
                        erUtdanningFulltidsstudium: true,
                    }
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.utdanning.utdanningStartdato.getTime()).to.be.equal(new Date("2017-01-01").getTime());
            expect(_soknad.utdanning.erUtdanningFulltidsstudium).to.be.equal(true);
        });

        it("parser gjenopptattArbeidFulltUtDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    gjenopptattArbeidFulltUtDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.gjenopptattArbeidFulltUtDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser identdato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    identdato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.identdato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser sendtTilArbeidsgiverDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sendtTilArbeidsgiverDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sendtTilArbeidsgiverDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser sendtTilNAVDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sendtTilNAVDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sendtTilNAVDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser opprettetDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    opprettetDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.opprettetDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser sykmeldingSkrevetDato", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    sykmeldingSkrevetDato: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sykmeldingSkrevetDato.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("Funker hvis sendtTilNAVDato og/eller sendtTilArbeidsgiverDato ikke finnes på søknaden", () => {
            const soknad = getSoknad();
            delete(soknad.sendtTilNAVDato);
            delete(soknad.sendtTilArbeidsgiverDato);
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.sendtTilNAVDato).to.be.undefined;
            expect(_soknad.sendtTilArbeidsgiverDato).to.be.undefined;
        });

        it("parser forrigeSykeforloepTom", () => {
            const soknad = Object.assign({}, getSoknad(),
                {
                    forrigeSykeforloepTom: "2017-01-19"
                }
            );
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.forrigeSykeforloepTom.getTime()).to.be.equal(new Date("2017-01-19").getTime());
        });

        it("parser fom", () => {
            const soknad = Object.assign({}, getSoknad(), {
                fom: "2017-01-19"
            });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.fom).to.deep.equal(new Date("2017-01-19"));
        });

        it("parser tom", () => {
            const soknad = Object.assign({}, getSoknad(), {
                tom: "2017-01-19"
            });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.tom).to.deep.equal(new Date("2017-01-19"));
        });

        it("Henter fom fra tidligsteFom dersom det ikke finnes fom", () => {
            const soknad = Object.assign({}, getSoknad(), {
                fom: null
            });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.fom).to.deep.equal(new Date("2016-07-15"));
        });


        it("Henter tom fra senesteTom dersom det ikke finnes tom", () => {
            const soknad = Object.assign({}, getSoknad(), {
                tom: null
            });
            const _soknad = parseDatofelter(soknad);
            expect(_soknad.tom).to.deep.equal(new Date("2017-01-19"));
        });


    });

    describe("settErOppdelt", () => {
        it("Setter _erOppdelt til false hvis vi ikke vet om søknaden er oppdelt", () => {
            const soknad = Object.assign({}, getSoknad(), {
                fom: null,
                tom: null,
            })
            const _soknad = settErOppdelt(soknad);
            expect(_soknad._erOppdelt).to.be.false;
        });

        it("Setter _erOppdelt til false hvis søknaden ikke er oppdelt", () => {
            const soknad = Object.assign({}, getSoknad(), {
                fom: new Date("2017-01-15"),
                tom: new Date("2017-01-30"),
                aktiviteter: [
                    {
                        avvik: null,
                        grad: 100,
                        periode: {
                            fom: new Date("2017-01-15"),
                            tom: new Date("2017-01-20"),
                        }
                    },
                    {
                        avvik: null,
                        grad: 100,
                        periode: {
                            fom: new Date("2017-01-21"),
                            tom: new Date("2017-01-30"),
                        }
                    },
                ],
            })
            const _soknad = settErOppdelt(soknad);
            expect(_soknad._erOppdelt).to.be.false;
        });

        it("Setter _erOppdelt til true hvis søknaden er oppdelt", () => {
            const soknad = Object.assign({}, getSoknad(), {
                fom: new Date("2017-01-15"),
                tom: new Date("2017-01-25"),
                aktiviteter: [
                    {
                        avvik: null,
                        grad: 100,
                        periode: {
                            fom: new Date("2017-01-15"),
                            tom: new Date("2017-01-20"),
                        }
                    },
                    {
                        avvik: null,
                        grad: 100,
                        periode: {
                            fom: new Date("2017-01-21"),
                            tom: new Date("2017-01-30"),
                        }
                    },
                ],
            });
            const _soknad = settErOppdelt(soknad);
            expect(_soknad._erOppdelt).to.be.true;
        });

        it("Setter _erOppdelt hvis vi har skikkelig mange perioder", () => {
            const soknad = parseDatofelter({
              "id": "35134708-930e-43dc-a850-38ed33adc1d9",
              "status": "NY",
              "opprettetDato": "2017-08-04",
              "arbeidsgiver": {
                "navn": "ARBEIDS- OG VELFERDSDIREKTORATET, AVD SANNERGATA",
                "orgnummer": "***REMOVED***",
                "naermesteLeder": null
              },
              "identdato": "2017-07-26",
              "ansvarBekreftet": false,
              "bekreftetKorrektInformasjon": false,
              "arbeidsgiverForskutterer": null,
              "egenmeldingsperioder": [],
              "gjenopptattArbeidFulltUtDato": null,
              "ferie": [],
              "permisjon": [],
              "utenlandsopphold": null,
              "aktiviteter": [
                {
                  "periode": {
                    "fom": "2017-06-20",
                    "tom": "2017-06-28"
                  },
                  "grad": 100,
                  "avvik": null
                },
                {
                  "periode": {
                    "fom": "2017-06-29",
                    "tom": "2017-07-07"
                  },
                  "grad": 100,
                  "avvik": null
                },
                {
                  "periode": {
                    "fom": "2017-07-08",
                    "tom": "2017-07-16"
                  },
                  "grad": 100,
                  "avvik": null
                },
                {
                  "periode": {
                    "fom": "2017-07-17",
                    "tom": "2017-07-25"
                  },
                  "grad": 100,
                  "avvik": null
                },
                {
                  "periode": {
                    "fom": "2017-07-26",
                    "tom": "2017-08-03"
                  },
                  "grad": 100,
                  "avvik": null
                }
              ],
              "andreInntektskilder": [],
              "utdanning": null,
              "sykmeldingSkrevetDato": "2017-07-26",
              "sendtTilArbeidsgiverDato": null,
              "sendtTilNAVDato": null,
              "forrigeSykeforloepTom": null,
              "korrigerer": null,
              "fom": "2017-07-13",
              "tom": "2017-08-03"
            });
            const _soknad = settErOppdelt(soknad);
            expect(_soknad._erOppdelt).to.be.true;
        })
    })

    describe("sorterAktiviteterEldsteFoerst", () => {

        it("Sorterer aktiviteter", () => {
            const soknad = {
                aktiviteter: [{
                    avvik: null,
                    grad: 100,
                    periode: {
                        fom: new Date("2016-07-25"),
                        tom: new Date("2016-07-28"),
                    }
                }, {
                    avvik: null,
                    grad: 100,
                    periode: {
                        fom: new Date("2016-07-10"),
                        tom: new Date("2016-07-20"),
                    }
                }, {
                    avvik: null,
                    grad: 100,
                    periode: {
                        fom: new Date("2016-07-10"),
                        tom: new Date("2016-07-21"),
                    }
                }]
            };
            expect(sorterAktiviteterEldsteFoerst(soknad).aktiviteter).to.deep.equal([{
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-10"),
                    tom: new Date("2016-07-20"),
                }
            }, {
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-10"),
                    tom: new Date("2016-07-21"),
                }
            }, {
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-25"),
                    tom: new Date("2016-07-28"),
                }
            }])
        });

    })

    describe("berikelse", () => {

        let initialState = deepFreeze({
            data: [],
            henterBerikelse: false,
            henterBerikelseFeilet: false,
        });

        it("håndterer henter berikelse", () => {
            const action = berikelses_actions.henterBerikelse();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henterBerikelse: true,
                henterBerikelseFeilet: false,
            });
        });

        it("håndterer berikelse hentet når berikelse inneholder forrigeSykeforloepTom", () => {
            let state = deepFreeze({
                data: [{
                    id: '1',

                }]
            });

            const action = berikelses_actions.berikelseHentet({forrigeSykeforloepTom: '2017-07-31'}, '1');
            const nextState = sykepengesoknader(state, action);
            expect(nextState).to.deep.equal({
                data: [{id: '1', forrigeSykeforloepTom: new Date('2017-07-31')}],
                henterBerikelse: false,
                henterBerikelseFeilet: false,
            });
        });

        it("håndterer berikelse hentet når berikelse inneholder forrigeSykeforloepTom === null", () => {
            let state = deepFreeze({
                data: [{
                    id: '1',

                }]
            });

            const action = berikelses_actions.berikelseHentet({forrigeSykeforloepTom: null}, '1');
            const nextState = sykepengesoknader(state, action);
            expect(nextState).to.deep.equal({
                data: [{id: '1', forrigeSykeforloepTom: null}],
                henterBerikelse: false,
                henterBerikelseFeilet: false,
            });
        });

        it("håndterer hent berikelse feilet", () => {
            const action = berikelses_actions.hentBerikelseFeilet();
            const nextState = sykepengesoknader(initialState, action);
            expect(nextState).to.deep.equal({
                data: [],
                henterBerikelse: false,
                henterBerikelseFeilet: true,
            });
        });
    });

    describe("finnSoknad", () => {
        const state = {
            sykepengesoknader: {
                data: [{ id: '1', en: 'en' }, { id: '2', innhold: 'innhold i soknad 2' }, { id: '3', tre: 'tre' }]
            }
        };

        it("finner soknad", () => {
            const s = finnSoknad(state, '2');
            expect(s.innhold).to.be.equal('innhold i soknad 2')
        });

        it("returnerer tomt om søknaden ikke finnes", () => {
            const s = finnSoknad(state, '4');
            expect(s).to.deep.equal({})
        });
    });
});

const getSoknad = (s = {}) => {
    return soknad = {
        aktiviteter: [
            {
                avvik: null,
                grad: 100,
                periode: {
                    fom: "2016-07-15",
                    tom: "2017-01-19",
                }
            },
        ],
        fom: "2016-07-15",
        tom: "2017-01-19",
        egenmeldingsperioder: [],
        ferie: [],
        gjenopptattArbeidFulltUtDato: null,
        identdato: null,
        permisjon: [],
        utdanning: null,
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        opprettetDato: "2017-01-01",
        sendtTilArbeidsgiverDato: null,
        sendtTilNAVDato: null,
        sykmeldingSkrevetDato: "2017-02-15",
        forrigeSykeforloepTom: "2017-01-18",
        id: "1"
    };
};

const getParsetSoknad = () => {
    return {
        aktiviteter: [
            {
                avvik: null,
                grad: 100,
                periode: {
                    fom: new Date("2016-07-15"),
                    tom: new Date("2017-01-19"),
                }
            },
        ],
        fom: new Date("2016-07-15"),
        tom: new Date("2017-01-19"),
        egenmeldingsperioder: [],
        ferie: [],
        gjenopptattArbeidFulltUtDato: null,
        identdato: null,
        permisjon: [],
        utdanning: null,
        utenlandsopphold: {
            perioder: [],
            soektOmSykepengerIPerioden: null,
        },
        opprettetDato: new Date("2017-01-01"),
        sendtTilArbeidsgiverDato: null,
        sendtTilNAVDato: null,
        sykmeldingSkrevetDato: new Date("2017-02-15"),
        forrigeSykeforloepTom: new Date("2017-01-18"),
        id: "1",
        _erOppdelt: false,
    };
};


