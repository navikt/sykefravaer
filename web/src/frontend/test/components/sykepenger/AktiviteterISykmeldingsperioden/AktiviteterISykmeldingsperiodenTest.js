import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { validate } from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';

describe("AktiviteterISykmeldingsperioden", () => {

    describe("Validate", () => {

        let values; 
        let sykmelding; 

        beforeEach(() => {
            values = {};
            sykmelding = {
                id: "3456789",
                pasient: {
                    fnr: "***REMOVED***",
                    fornavn: "Per",
                    etternavn: "Person",
                },
                arbeidsgiver: "SOLSTRÅLEN BARNEHAGE",
                orgnummer: "123456789",
                status: 'NY',
                identdato: { year: 2015, monthValue: 12, dayOfMonth: 31 },
                diagnose: {
                    hoveddiagnose: {
                        diagnose: "Influensa",
                        diagnosesystem: "ICPC",
                        diagnosekode: "LP2"
                    },
                },
                mulighetForArbeid: {
                    perioder: [{
                        grad: 50,
                        fom: { year: 2017, monthValue: 1, dayOfMonth: 1 },
                        tom: { year: 2017, monthValue: 1, dayOfMonth: 15 },
                        }, {
                        grad: 100,
                        fom: { year: 2017, monthValue: 1, dayOfMonth: 16 },
                        tom: { year: 2017, monthValue: 1, dayOfMonth: 31 },
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
                    utstedelsesdato: { year: 2016, monthValue: 5, dayOfMonth: 2 }
                },
            }
        });

        it("Skal returnere undefined når alt er OK", () => {
            const values = {"perioder":[{"jobbetMerEnnPlanlagt":false},{"jobbetMerEnnPlanlagt":false}],"harAndreInntektskilder":false,"underUtdanning":false}
            const res = validate(values, { sykmelding });
            expect(res).to.deep.equal({})
        });

        describe("Periode", () => {

            it("Skal validere alle perioder i sykmeldingen", () => {
                const res = validate(values, { sykmelding });
                expect(res.perioder).to.have.length(2); 
                expect(res.perioder[0].jobbetMerEnnPlanlagt).to.equal("Du må svare på om du har jobbet mer enn planlagt");
                expect(res.perioder[1].jobbetMerEnnPlanlagt).to.equal("Du må svare på om du har jobbet mer enn planlagt");
            });

            it("Skal validere alle perioder i sykmeldingen når man ikke har jobbet mer enn planlagt", () => {
                values.perioder = [{
                    jobbetMerEnnPlanlagt: false
                }, {
                    jobbetMerEnnPlanlagt: false
                }]
                const res = validate(values, { sykmelding });
                expect(res.perioder).to.be.undefined;
            });

            it("Skal validere alle perioder i sykmeldingen når man har svart på den ene perioden", () => {
                values.perioder = [{
                    jobbetMerEnnPlanlagt: true
                }]
                const res = validate(values, { sykmelding });
                expect(res.perioder).to.have.length(2); 
                expect(res.perioder[0].jobbetMerEnnPlanlagt).to.be.undefined;
                expect(res.perioder[1].jobbetMerEnnPlanlagt).to.equal("Du må svare på om du har jobbet mer enn planlagt");
            });

            it("Skal validere gjennomsnitt per uke når det ikke er oppgitt" , () => {
                const res = validate(values, { sykmelding });
                expect(res.perioder).to.deep.equal([{
                    jobbetMerEnnPlanlagt: "Du må svare på om du har jobbet mer enn planlagt",
                    gjennomsnittPerUke: {
                        enhet: "Vennligst oppgi enhet",
                        antall: "Vennligst oppgi antall",
                    }
                }, {
                    jobbetMerEnnPlanlagt: "Du må svare på om du har jobbet mer enn planlagt",
                    gjennomsnittPerUke: {
                        enhet: "Vennligst oppgi enhet",
                        antall: "Vennligst oppgi antall",
                        normaltAntall: "Vennligst oppgi normalt antall"
                    }
                }])
            }); 

            it("Skal validere gjennomsnittPerUke når det er oppgitt på den ene perioden", () => {
                values.perioder = [{"jobbetMerEnnPlanlagt":true,"gjennomsnittPerUke":{"enhet":"timer"}}];
                const res = validate(values, { sykmelding });
                expect(res.perioder).to.have.length(2);
                expect(res.perioder[0]).to.deep.equal({
                    gjennomsnittPerUke: {
                        antall: "Vennligst oppgi antall"
                    }
                })
            });

            it("Skal validere normalt timetall for perioder som ikke er gradert", () => {
                values.perioder = [{"jobbetMerEnnPlanlagt":true,"gjennomsnittPerUke":{"enhet":"timer"}}];
                const res = validate(values, { sykmelding });
                expect(res.perioder).to.deep.equal([{
                    gjennomsnittPerUke: {
                        antall: "Vennligst oppgi antall"
                    }
                }, {
                    jobbetMerEnnPlanlagt: "Du må svare på om du har jobbet mer enn planlagt",
                    gjennomsnittPerUke: {
                        enhet: "Vennligst oppgi enhet",
                        antall: "Vennligst oppgi antall",
                        normaltAntall: "Vennligst oppgi normalt antall"
                    }
                }])
            })

        });

        describe("Inntektskilde", () => {

            it("Skal validere hvorvidt brukeren har andre inntektskilder", () => {
                const res = validate(values, { sykmelding });
                expect(res.harAndreInntektskilder).to.equal("Du må svare på om du har andre inntektskilder");
            });

            describe("Dersom brukeren ikke har andre inntektskilder", () => {

                beforeEach(() => {
                    values.harAndreInntektskilder = false;
                })

                it("Skal ikke validere hvorvidt brukeren har andre inntektskilder", () => {
                    const res = validate(values, { sykmelding });
                    expect(res.harAndreInntektskilder).to.be.undefined;
                });

                it("Skal ikke validere hvilke inntektskilder", () => {
                    const res = validate(values, { sykmelding });
                    expect(res.andreInntektskilder).to.be.undefined;
                });

            });

            describe("Dersom brukeren har andre inntektskilder", () => {
                let res;
                let values = {
                    harAndreInntektskilder: true
                };

                it("Brukeren må velge hvilken inntektskilde", () => {
                    const res = validate(values, { sykmelding });
                    expect(res.andreInntektskilder).to.deep.equal({
                        _error: "Vennligst oppgi hvilke andre inntektskilder du har"
                    })
                });
                
                it("Brukeren må velge hvilken inntektskilde", () => {
                    values.andreInntektskilder = [{
                        andreArbeidsforhold: {
                            avkrysset: false
                        }
                    }]
                    const res = validate(values, { sykmelding });
                    expect(res.andreInntektskilder).to.deep.equal({
                        _error: "Vennligst oppgi hvilke andre inntektskilder du har"
                    })
                });

                it("Brukeren må velge hvilken inntektskilde", () => {
                    values.andreInntektskilder = [{
                        andreArbeidsforhold: {
                            avkrysset: false
                        }
                    }, {
                        frilanser: {
                            avkrysset: false,
                        }
                    }]
                    const res = validate(values, { sykmelding });
                    expect(res.andreInntektskilder).to.deep.equal({
                        _error: "Vennligst oppgi hvilke andre inntektskilder du har"
                    })
                });

                it("Brukeren må svare på om han/hun er sykmeldt for hver avkrysset inntektskilde (1)", () => {
                    values.andreInntektskilder = {
                        "andreArbeidsforhold": {
                            avkrysset: true,
                            }
                        }, {
                           "frilanser": {
                                avkrysset: false,
                            }
                        }
                    const res = validate(values, { sykmelding });
                    expect(res.andreInntektskilder).to.deep.equal({
                        andreArbeidsforhold: {
                            "sykmeldt": "Vennligst svar på om du er sykmeldt"
                        }
                    })
                });

                it("Brukeren må svare på om han/hun er sykmeldt for hver avkrysset inntektskilde (2)", () => {
                    values.andreInntektskilder = {
                        "andreArbeidsforhold": {
                            avkrysset: true,
                            sykmeldt: false    
                        },
                        "frilanser": {
                            avkrysset: false, 
                        }
                    }
                    const res = validate(values, { sykmelding });
                    expect(res.andreInntektskilder).to.deep.equal({})
                });

                it("Brukeren må svare på om han/hun er sykmeldt for hver avkrysset inntektskilde (3)", () => {
                    values.andreInntektskilder = {
                        "andreArbeidsforhold": {
                            avkrysset: true,
                            sykmeldt: true    
                        }, 
                        "frilanser": {
                            avkrysset: false, 
                        }
                    };
                    const res = validate(values, { sykmelding });
                    expect(res.andreInntektskilder).to.deep.equal({})
                });

            });

        });


        describe("underUtdanning", () => {
            it("Skal validere underUtdanning", () => {
                const res = validate(values, { sykmelding });
                expect(res.underUtdanning).to.equal("Vennligst svar på om du har vært under utdanning");
            })

            describe("Hvis brukeren ikke har vært under utdanning", () => {
                beforeEach(() => {
                    values.underUtdanning = false;
                });

                it("Skal ikke validere underUtdanning", () => {
                    const res = validate(values, { sykmelding });
                    expect(res.underUtdanning).to.be.undefined;
                });

            });


            describe("Hvis brukeren har vært under utdanning", () => {
                beforeEach(() => {
                    values.underUtdanning = true;
                });

                it("Skal ikke validere underUtdanning", () => {
                    const res = validate(values, { sykmelding });
                    expect(res.underUtdanning).to.be.undefined;
                });

                describe("utdanningStartdato", () => {
                    it("Det skal validere dersom feltet ikke er utfylt", () => {
                        const res = validate(values, { sykmelding });
                        expect(res.utdanningStartdato).to.equal("Vennligst oppgi når du startet på utdanningen");
                    });

                    it("Skal ikke validere dersom felter er utfylt", () => {
                        values.utdanningStartdato = "12.09.2017"
                        const res = validate(values, { sykmelding });
                        expect(res.utdanningStartdato).to.be.undefined;
                    });
                }); 

                describe("erUtdanningFulltidsstudium", () => {
                    it("Skal validere dersom feltet ikke er utfylt", () => {
                        const res = validate(values, { sykmelding });
                        expect(res.erUtdanningFulltidsstudium).to.equal("Vennligst svar på om utdanningen er et fulltidsstudium");
                    });

                    it("Skal ikke validere dersom feltet er utfylt med ja", () => {
                        values.erUtdanningFulltidsstudium = true;
                        const res = validate(values, { sykmelding });
                        expect(res.erUtdanningFulltidsstudium).to.be.undefined;
                    });

                    it("Skal ikke validere dersom feltet er utfylt med nei", () => {
                        values.erUtdanningFulltidsstudium = false;
                        const res = validate(values, { sykmelding });
                        expect(res.erUtdanningFulltidsstudium).to.be.undefined;
                    })
                });


            });

            describe("Hvis brukeren ikke har vært under utdanning", () => {
                beforeEach(() => {
                    values.underUtdanning = false;
                })

                it("Skal ikke validere at utdanningStartdato er påkrevd", () => {
                    const res = validate(values, { sykmelding });
                    expect(res.utdanningStartdato).to.be.undefined;
                });

                it("Skal ikke validere at erUtdanningFulltidsstudium er påkrevd", () => {
                    const res = validate(values, { sykmelding });
                    expect(res.erUtdanningFulltidsstudium).to.be.undefined;
                });
            })
        })


    });

});
