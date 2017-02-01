import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import { Oppsummering, mapSkjemasoknadToBackendsoknad } from '../../../../js/components/sykepengesoknad/Oppsummering/Oppsummering';
import { getSoknad } from '../../../mockSoknader';

describe.only("Oppsummering", () => {

    describe("mapSkjemasoknadToBackendsoknad", () => {

        beforeEach(() => {
            sykepengesoknad = getSoknad();
            sykepengesoknad.aktiviteter[0] = Object.assign({}, sykepengesoknad.aktiviteter[0], {
                "jobbetMerEnnPlanlagt": true,
                "avvik": {
                  "enhet": "prosent",
                  "arbeidsgrad": "80",
                  "arbeidstimerNormalUke": "37,5"
                }
            })
            sykepengesoknad.permisjon = [{
                "fom": "12.01.2017",
                "tom": "18.01.2017"
            }];
            sykepengesoknad.ferie = [{
                "fom": "12.02.2017",
                "tom": "18.02.2017"
            }];
            sykepengesoknad.utenlandsopphold = {
                perioder: [{
                    "fom": "12.03.2017",
                    "tom": "18.03.2017"
                }]
            };
            sykepengesoknad.andreInntektskilder = {
                "ANDRE_ARBEIDSFORHOLD": {
                  "avkrysset": true,
                  "sykmeldt": true
                },
                "SELVSTENDIG_NAERINGSDRIVENDE": {
                  "avkrysset": false
                },
                "SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA": {
                  "avkrysset": true,
                  "sykmeldt": false,
                },
                "JORDBRUKER_FISKER_REINDRIFTSUTOEVER": {
                  "avkrysset": false
                },
                "FRILANSER": {
                  "avkrysset": false
                },
                "ANNET": {
                  "avkrysset": true
                }
            };
            sykepengesoknad.utdanning = {}

            sykepengesoknad.gjenopptattArbeidFulltUtDato = "20.01.2017";
            sykepengesoknad.egenmeldingsperioder = [{
                "fom": "12.01.2017",
                "tom": "15.01.2017"
            }];
            sykepengesoknad = Object.assign({}, sykepengesoknad, {
                "bruktEgenmeldingsdagerFoerLegemeldtFravaer": true,
                "harGjenopptattArbeidFulltUt": true,
                "harHattFeriePermisjonEllerUtenlandsopphold": true,
                "harHattFerie": true,
                "harHattPermisjon": true,
                "harHattUtenlandsopphold": true,
                "utenlandsoppholdSoktOmSykepenger": true,
                "harAndreInntektskilder": true
            });
        });

        describe("egenmeldingsperioder", () => {
            it("Skal konvertere egenmeldingsperioder hvis bruktEgenmeldingsdagerFoerLegemeldtFravaer = true", () => {
                sykepengesoknad.bruktEgenmeldingsdagerFoerLegemeldtFravaer = true;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.egenmeldingsperioder).to.deep.equal([{
                    fom: new Date("2017-01-12"),
                    tom: new Date("2017-01-15"),
                }])
            });
            it("Skal sette egenmeldingsperioder til null hvis bruktEgenmeldingsdagerFoerLegemeldtFravaer = false", () => {
                sykepengesoknad.bruktEgenmeldingsdagerFoerLegemeldtFravaer = false;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.egenmeldingsperioder).to.deep.equal([]);
            });
        });

        describe("gjenopptattArbeidFulltUtDato", () => {
            it("Skal konvertere gjenopptattArbeidFulltUtDato hvis harGjenopptattArbeidFulltUt = true", () => {
                sykepengesoknad.harGjenopptattArbeidFulltUt = true;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.gjenopptattArbeidFulltUtDato.getTime()).to.deep.equal(new Date("2017-01-20").getTime())
            });

            it("Skal sette gjenopptattArbeidFulltUtDato til null hvis harGjenopptattArbeidFulltUt = false", () => {
                sykepengesoknad.harGjenopptattArbeidFulltUt = false;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.gjenopptattArbeidFulltUtDato).to.deep.equal(null); 
            });
        });

        describe("Ferie, permisjon eller utenlandsopphold", () => {

            it("Skal sette ferie, permisjon og utenlandsopphold til tom dersom harHattFeriePermisjonEllerUtenlandsopphold er false", () => {
                sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = false;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.ferie).to.deep.equal([]);
                expect(soknad.utenlandsopphold).to.be.null;
                expect(soknad.permisjon).to.deep.equal([]);
            });

            describe("Ferie", () => {

                it("Skal parse datofelter i ferie", () => {
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = true; 
                    sykepengesoknad.harHattFerie = true;
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.ferie[0].fom.getTime()).to.deep.equal(new Date("2017-02-12").getTime());
                    expect(soknad.ferie[0].tom.getTime()).to.deep.equal(new Date("2017-02-18").getTime());
                });

                it("Skal ikke parse datofelter i ferie dersom harHattFerie = false", () => {
                    sykepengesoknad.harHattFerie = false; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = true; 
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.ferie).to.deep.equal([]);
                });

                it("Skal ikke parse datofelter i ferie dersom harHattFeriePermisjonEllerUtenlandsopphold = false", () => {
                    sykepengesoknad.harHattFerie = true; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = false; 
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.ferie).to.deep.equal([]);
                });

                it("Skal ikke parse datofelter i ferie dersom harHattFerie = false && harHattFeriePermisjonEllerUtenlandsopphold = false", () => {
                    sykepengesoknad.harHattFerie = false; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = false;
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad); 
                    expect(soknad.ferie).to.deep.equal([]);
                });

            });

            describe("Permisjon", () => {

                it("Skal parse datofelter i permisjon", () => {
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = true;
                    sykepengesoknad.harHattPermisjon = true;
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.permisjon[0].fom.getTime()).to.deep.equal(new Date("2017-01-12").getTime());
                    expect(soknad.permisjon[0].tom.getTime()).to.deep.equal(new Date("2017-01-18").getTime());
                });  

                it("Skal ikke parse datofelter i permisjon dersom harHattPermisjon = false", () => {
                    sykepengesoknad.harHattPermisjon = false; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = true; 
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.permisjon).to.deep.equal([]);
                });

                it("Skal ikke parse datofelter i permisjon dersom harHattFeriePermisjonEllerUtenlandsopphold = false", () => {
                    sykepengesoknad.harHattPermisjon = true; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = false; 
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.permisjon).to.deep.equal([]);
                });

                it("Skal ikke parse datofelter i permisjon dersom harHattPermisjon = false && harHattFeriePermisjonEllerUtenlandsopphold = false", () => {
                    sykepengesoknad.harHattPermisjon = false; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = false;
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad); 
                    expect(soknad.permisjon).to.deep.equal([]);
                });

            });

            describe("Utenlandsopphold", () => {

                it("Skal parse datofelter i utenlandsopphold", () => {
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = true;
                    sykepengesoknad.harHattUtenlandsopphold = true;
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.utenlandsopphold.perioder[0].fom.getTime()).to.deep.equal(new Date("2017-03-12").getTime());
                    expect(soknad.utenlandsopphold.perioder[0].tom.getTime()).to.deep.equal(new Date("2017-03-18").getTime());
                });

                it("Skal parse soektOmSykepengerIPerioden", () => {
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = true;
                    sykepengesoknad.harHattUtenlandsopphold = true;
                    sykepengesoknad.utenlandsopphold.soektOmSykepengerIPerioden = true;
                    let soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.utenlandsopphold.soektOmSykepengerIPerioden).to.be.true;

                    sykepengesoknad.utenlandsopphold.soektOmSykepengerIPerioden = false;
                    soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.utenlandsopphold.soektOmSykepengerIPerioden).to.be.false;
                });

                it("Skal ikke parse datofelter i utenlandsopphold dersom harHattUtenlandsopphold = false", () => {
                    sykepengesoknad.harHattUtenlandsopphold = false; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = true; 
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.utenlandsopphold).to.be.null;
                });

                it("Skal ikke parse datofelter i utenlandsopphold dersom harHattFeriePermisjonEllerUtenlandsopphold = false", () => {
                    sykepengesoknad.harHattUtenlandsopphold = true; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = false; 
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                    expect(soknad.utenlandsopphold).to.be.null;
                });

                it("Skal ikke parse datofelter i utenlandsopphold dersom harHattUtenlandsopphold = false && harHattFeriePermisjonEllerUtenlandsopphold = false", () => {
                    sykepengesoknad.harHattUtenlandsopphold = false; 
                    sykepengesoknad.harHattFeriePermisjonEllerUtenlandsopphold = false;
                    const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad); 
                    expect(soknad.utenlandsopphold).to.be.null;
                });
            });

        });
    
        describe("andreInntektskilder", () => {

            it("Skal konvertere andreInntektskilder hvis det finnes inntektskilder", () => {
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.andreInntektskilder).to.deep.equal([
                    {
                        annenInntektskildeType: 'ANDRE_ARBEIDSFORHOLD',
                        sykmeldt: true,
                    }, {
                        annenInntektskildeType: 'SELVSTENDIG_NAERINGSDRIVENDE_DAGMAMMA',
                        sykmeldt: false,
                    }, {
                        annenInntektskildeType: 'ANNET',
                        sykmeldt: false,
                    }
                ]);
            });

            it("Skal konvertere andreInntektskilder hvis andreInntektskilder === {}", () => {
                sykepengesoknad.andreInntektskilder = {};
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.andreInntektskilder).to.deep.equal([]);
            });

            it("Skal ikke konvertere andreInntektskilder hvis andreInntektskilder === []", () => {
                sykepengesoknad.andreInntektskilder = [];
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.andreInntektskilder).to.deep.equal([]);
            });

        })

        describe("Aktiviteter", () => {

            it("Skal sette avvik til null hvis jobbetMerEnnPlanlagt === false", () => {
                sykepengesoknad.aktiviteter[0].jobbetMerEnnPlanlagt = false;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.aktiviteter[0].avvik).to.be.null;
            });

            it("Skal ikke sette avvik til null hvis jobbetMerEnnPlanlagt === true", () => {
                sykepengesoknad.aktiviteter[0].jobbetMerEnnPlanlagt = true;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.aktiviteter[0].avvik).to.deep.equal({
                  "arbeidsgrad": "80",
                  "arbeidstimerNormalUke": "37,5"
                });
            });

            it("Skal fjerne jobbetMerEnnPlanlagt", () => {
                sykepengesoknad.aktiviteter[0].jobbetMerEnnPlanlagt = true;
                sykepengesoknad.aktiviteter[1].jobbetMerEnnPlanlagt = false;
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.aktiviteter[0].hasOwnProperty("jobbetMerEnnPlanlagt")).to.be.false;
                expect(soknad.aktiviteter[1].hasOwnProperty("jobbetMerEnnPlanlagt")).to.be.false;
            });

        });

        describe("utdanning", () => {

            beforeEach(() => {
                sykepengesoknad.utdanning = {
                    "underUtdanningISykmeldingsperioden": true,
                    "utdanningStartdato": "12.01.2017",
                    "erUtdanningFulltidsstudium": false
                };
            })

            it("Skal ikke fjerne utdanningsdata hvis underUtdanningISykmeldingsperioden er checked", () => {
                const soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.utdanning.underUtdanningISykmeldingsperioden).to.be.undefined;
                expect(soknad.utdanning.utdanningStartdato.getTime()).to.equal(new Date("2017-01-12").getTime())
                expect(soknad.utdanning.erUtdanningFulltidsstudium).to.be.false;
            });

            it("Skal fjerne utdanningsdata hvis underUtdanningISykmeldingsperioden er false", () => {
                sykepengesoknad.utdanning.underUtdanningISykmeldingsperioden = false;
                const soknad =mapSkjemasoknadToBackendsoknad(sykepengesoknad);
                expect(soknad.utdanning).to.be.null;
            })

        });

        describe("Felter som bare finnes i front-end og skal fjernes", () => {

            let soknad;

            beforeEach(() => {
                soknad = mapSkjemasoknadToBackendsoknad(sykepengesoknad);
            });

            it("Skal fjerne bruktEgenmeldingsdagerFoerLegemeldtFravaer", () => {
                expect(soknad.hasOwnProperty("bruktEgenmeldingsdagerFoerLegemeldtFravaer")).to.be.false;
            });

            it("Skal fjerne harGjenopptattArbeidFulltUt", () => {
                expect(soknad.hasOwnProperty("harGjenopptattArbeidFulltUt")).to.be.false;
            });

            it("Skal fjerne harHattFeriePermisjonEllerUtenlandsopphold", () => {
                expect(soknad.hasOwnProperty("harHattFeriePermisjonEllerUtenlandsopphold")).to.be.false;
            });

            it("Skal fjerne harHattFerie", () => {
                expect(soknad.hasOwnProperty("harHattFerie")).to.be.false;
            });

            it("Skal fjerne harHattPermisjon", () => {
                expect(soknad.hasOwnProperty("harHattPermisjon")).to.be.false;
            });

            it("Skal fjerne harHattUtenlandsopphold", () => {
                expect(soknad.hasOwnProperty("harHattUtenlandsopphold")).to.be.false;
            });                    

            it("Skal fjerne utenlandsoppholdSoktOmSykepenger", () => {
                expect(soknad.hasOwnProperty("utenlandsoppholdSoktOmSykepenger")).to.be.false;
            }); 

            it("Skal fjerne harAndreInntektskilder", () => {
                expect(soknad.hasOwnProperty("harAndreInntektskilder")).to.be.false;
            });                                                       


        });

    });

})