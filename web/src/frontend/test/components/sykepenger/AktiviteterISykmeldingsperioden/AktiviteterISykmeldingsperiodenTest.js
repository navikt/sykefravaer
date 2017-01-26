import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { validate } from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AktiviteterISykmeldingsperioden';
import { getSoknad } from '../../../mockSoknader';

describe("AktiviteterISykmeldingsperioden", () => {

    describe("Validate", () => {

        let values; 
        let sykmelding; 

        beforeEach(() => {
            values = {
                "ansvarBekreftet":true,
                "bruktEgenmeldingsdagerFoerLegemeldtFravaer":false,
                "harGjenopptattArbeidFulltUt":false,
                "harHattFeriePermisjonEllerUtenlandsopphold":false
            };
            sykepengesoknad = getSoknad({
                "aktiviteter": [{
                    "periode": {
                        "fom": "2017-01-01",
                        "tom": "2017-01-15"
                    },
                    "grad": 100,
                    "avvik": null
                }, {
                    "periode": {
                        "fom": "2017-16-01",
                        "tom": "2017-16-25"
                  },
                  "grad": 50,
                  "avvik": null
                }]
            });
            sendTilFoerDuBegynner = sinon.spy();
        });

        it("Skal returnere undefined når alt er OK", () => {
            const values = {
                "aktiviteter":[{"jobbetMerEnnPlanlagt":false},{"jobbetMerEnnPlanlagt":false}],
                "harAndreInntektskilder":false,
                "utdanning": {
                    "underUtdanning": false
                }
            }
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res).to.deep.equal({})
        });

        it("Skal kalle på sendTilFoerDuBegynner dersom alt fra side 1 + 2 ikke er fylt ut", () => {
            values = {};
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(sendTilFoerDuBegynner.calledWith(sykepengesoknad)).to.be.true;
        });

        it("Skal ikke kalle på sendTilFoerDuBegynner dersom alt fra side 1 + 2 ikke er fylt ut", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(sendTilFoerDuBegynner.called).to.be.false;
        });

        describe("Aktivitet", () => {

            it("Skal funke når aktiviteter ikke er oppgitt", () => {
                const values = {};
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(typeof res).to.equal("object")
            });

            it("Skal validere alle aktiviteter i søknaden", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.have.length(2); 
                expect(res.aktiviteter[0].jobbetMerEnnPlanlagt).to.equal("Vennligst oppgi om du har jobbet mer enn planlagt");
                expect(res.aktiviteter[1].jobbetMerEnnPlanlagt).to.equal("Vennligst oppgi om du har jobbet mer enn planlagt");
            });

            it("Skal validere alle aktiviteter i sykmeldingen når man ikke har jobbet mer enn planlagt", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: false
                }, {
                    jobbetMerEnnPlanlagt: false
                }]
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.be.undefined;
            });

            it("Skal validere avvik når man har jobbet mer enn planlagt", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                }, {
                    jobbetMerEnnPlanlagt: true,
                }]
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal([{
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                }, {
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                }])
            });

            it("Skal validere avvik når man har jobbet mer enn planlagt og arbeidsgrad er en tom streng", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: ""
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                }]
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal([{
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                }, {
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                }])
            });

            it("Skal validere arbeidstimerNormalUke når man har jobbet mer enn planlagt", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        enhet: "timer",
                        timer: "55"
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                }]
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal([{
                    avvik: {
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                }, {
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                }])
            });

            it("Skal validere arbeidsgrad når man har jobbet mer enn planlagt", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        enhet: "timer",
                        arbeidstimerNormalUke: "55",
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                }]
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter[0]).to.deep.equal({
                    avvik: {
                        timer: "Vennligst oppgi antall",
                    }
                });
                expect(res.aktiviteter[1]).to.deep.equal({
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                })
            });

            it("Skal validere arbeidsgrad når man har jobbet mer enn planlagt og timer er en tom streng", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        timer: "",
                        enhet: "timer",
                        arbeidstimerNormalUke: "55",
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                }]
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter[0]).to.deep.equal({
                    avvik: {
                        timer: "Vennligst oppgi antall",
                    }
                });
                expect(res.aktiviteter[1]).to.deep.equal({
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                })
            });

            it("Skal ikke validere arbeidsgrad når man har jobbet mer enn planlagt og oppgitt arbeidsgrad", () => {
                values.aktiviteter = [{
                    jobbetMerEnnPlanlagt: true,
                    avvik: {
                        arbeidsgrad: "50",
                        enhet: "prosent",
                        arbeidstimerNormalUke: "55"
                    }
                }, {
                    jobbetMerEnnPlanlagt: true,
                }]
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.aktiviteter).to.deep.equal([{}, {
                    avvik: {
                        arbeidsgrad: "Vennligst oppgi antall",
                        arbeidstimerNormalUke: "Vennligst oppgi normalt antall"
                    }
                }])
            });

        });

        describe("Inntektskilde", () => {

            it("Skal validere hvorvidt brukeren har andre inntektskilder", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.harAndreInntektskilder).to.equal("Du må svare på om du har andre inntektskilder");
            });

            describe("Dersom brukeren ikke har andre inntektskilder", () => {

                beforeEach(() => {
                    values.harAndreInntektskilder = false;
                })

                it("Skal ikke validere hvorvidt brukeren har andre inntektskilder", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.harAndreInntektskilder).to.be.undefined;
                });

                it("Skal ikke validere hvilke inntektskilder", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.andreInntektskilder).to.be.undefined;
                });

            });

            describe("Dersom brukeren har andre inntektskilder", () => {
                let res;
                let values = {
                    harAndreInntektskilder: true
                };

                it("Brukeren må velge hvilken inntektskilde", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
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
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
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
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
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
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
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
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
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
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.andreInntektskilder).to.deep.equal({})
                });

            });

        });


        describe("underUtdanning", () => {
            it("Skal validere underUtdanning", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.utdanning.underUtdanning).to.equal("Vennligst svar på om du har vært under utdanning");
            })

            describe("Hvis brukeren ikke har vært under utdanning", () => {
                beforeEach(() => {
                    values.underUtdanning = false;
                });

                it("Skal ikke validere underUtdanning", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.underUtdanning).to.be.undefined;
                });

            });


            describe("Hvis brukeren har vært under utdanning", () => {
                beforeEach(() => {
                    values.utdanning = {
                        underUtdanning: true,
                    };
                });

                it("Skal ikke validere underUtdanning", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.underUtdanning).to.be.undefined;
                });

                describe("utdanningStartdato", () => {
                    it("Det skal validere dersom feltet ikke er utfylt", () => {
                        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                        expect(res.utdanning.utdanningStartdato).to.equal("Vennligst oppgi når du startet på utdanningen");
                    });

                    it("Skal ikke validere dersom felter er utfylt", () => {
                        values.utdanning.utdanningStartdato = "12.09.2017"
                        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                        expect(res.utdanning.utdanningStartdato).to.be.undefined;
                    });
                }); 

                describe("erUtdanningFulltidsstudium", () => {
                    
                    it("Skal validere dersom feltet ikke er utfylt", () => {
                        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                        expect(res.utdanning.erUtdanningFulltidsstudium).to.equal("Vennligst svar på om utdanningen er et fulltidsstudium");
                    });

                    it("Skal ikke validere dersom feltet er utfylt med ja", () => {
                        values.utdanning.erUtdanningFulltidsstudium = true;
                        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                        expect(res.utdanning.erUtdanningFulltidsstudium).to.be.undefined;
                    });

                    it("Skal ikke validere dersom feltet er utfylt med nei", () => {
                        values.utdanning.erUtdanningFulltidsstudium = false;
                        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                        expect(res.utdanning.erUtdanningFulltidsstudium).to.be.undefined;
                    });

                });

            });

            describe("Hvis brukeren ikke har vært under utdanning", () => {
                beforeEach(() => {
                    values.underUtdanning = false;
                })

                it("Skal ikke validere at utdanningStartdato er påkrevd", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.utdanningStartdato).to.be.undefined;
                });

                it("Skal ikke validere at erUtdanningFulltidsstudium er påkrevd", () => {
                    const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                    expect(res.erUtdanningFulltidsstudium).to.be.undefined;
                });
            })
        })


    });

});
