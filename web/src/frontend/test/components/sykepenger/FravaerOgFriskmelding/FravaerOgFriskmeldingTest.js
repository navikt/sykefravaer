import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import FravaerOgFriskmelding, { validate } from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import { getSoknad } from '../../../mockSoknader';

describe("FravaerOgFriskmelding", () => {

    describe("validate", () => {

        let values;
        let sykepengesoknad;
        let clock;

        beforeEach(() => {
            values = {};
            clock = sinon.useFakeTimers(1484210369692); // Setter dagens dato til 12. januar 2017
            sykepengesoknad = getSoknad();
        });

        afterEach(() => {
            clock.restore();
        });

        describe("harGjenopptattArbeidFulltUt", () => {

       		it("Skal validere", () => {
       			const res = validate(values, { sykepengesoknad });
       			expect(res.harGjenopptattArbeidFulltUt).to.equal("Vennligst oppgi om du har gjenopptatt arbeidet fullt ut")
       		});

       		describe("Dersom svaret er nei", () => {

       			beforeEach(() => {
       				values.harGjenopptattArbeidFulltUt = false;
       			});

       			it("Skal ikke validere", () => {
       				const res = validate(values, { sykepengesoknad });
       				expect(res.harGjenopptattArbeidFulltUt).to.be.undefined;
       			})
       		});

       		describe("Dersom svaret er ja", () => {

       			beforeEach(() => {
       				values.harGjenopptattArbeidFulltUt = true;
       			});

       			it("Skal ikke validere harGjenopptattArbeidFulltUt", () => {
       				const res = validate(values, { sykepengesoknad });
       				expect(res.harGjenopptattArbeidFulltUt).to.be.undefined;
       			});

       			it("Skal validere at gjenopptattArbeidFulltUtDato er påkrevd", () => {
       				const res = validate(values, { sykepengesoknad });
       				expect(res.gjenopptattArbeidFulltUtDato).to.equal("Vennligst oppgi når du gjenopptok arbeidet fullt ut")
       			});

       			it("Skal validere at gjenopptattArbeidFulltUtDato er på riktig format", () => {
       				values.gjenopptattArbeidFulltUtDato = "10.01.2017"
       				const res = validate(values, { sykepengesoknad });
              expect(res.gjenopptattArbeidFulltUtDato).to.be.undefined;
       			});

       			it("Skal validere at datoen er bakover i tid", () => {
       				values.gjenopptattArbeidFulltUtDato = "12.12.2020";
       				const res = validate(values, { sykepengesoknad });
       				expect(res.gjenopptattArbeidFulltUtDato).to.equal("Datoen må være bakover i tid");
       			});


            it("Skal validere at datoen er bakover i tid", () => {
                values.gjenopptattArbeidFulltUtDato = "12.12.2020";
                const res = validate(values, { sykepengesoknad });
                expect(res.gjenopptattArbeidFulltUtDato).to.equal("Datoen må være bakover i tid");
            });

            it("Skal validere at datoen ikke er før første sykepengesoknad dag", () => {
                values.gjenopptattArbeidFulltUtDato = "25.12.2016";
                const res = validate(values, { sykepengesoknad });
                expect(res.gjenopptattArbeidFulltUtDato).to.equal("Datoen må være etter at du ble sykmeldt");
            })


       		});

        });

        describe("Egenmeldingsdager", () => {
            it("Skal validere bruktEgenmeldingsdagerFoerLegemeldtFravaer", () => {
                const res = validate(values, { sykepengesoknad });
                expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.equal("Du må svare om du brukte egenmeldingsdager før det legemeldte fraværet startet");
            });

            it("Skal ikke validere bruktEgenmeldingsdagerFoerLegemeldtFravaer når man har svart ja på spørsmålet", () => {
                values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = true;
                const res = validate(values, { sykepengesoknad });
                expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.be.undefined;
            });

            it("Skal ikke validere bruktEgenmeldingsdagerFoerLegemeldtFravaer når man har svart nei på spørsmålet", () => {
                values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = false;
                const res = validate(values, { sykepengesoknad });
                expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.be.undefined;
            });

            it("Testcase som feiler i UI", () => {
              values = {"bruktEgenmeldingsdagerFoerLegemeldtFravaer":true,"egenmeldingsperioder":[{},{}]};
              const res = validate(values, { sykepengesoknad });
              expect(res.egenmeldingsperioder).to.deep.equal({
                _error: "Vennligst oppgi minst én periode"
              })
            })

            describe("Når values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = true", () => {
                beforeEach(() => {
                    values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = true;
                });

                it("Skal validere egenmeldingsperioder", () => {
                    const res = validate(values, { sykepengesoknad });
                    expect(res.egenmeldingsperioder).to.deep.equal({
                        _error: "Vennligst oppgi minst én periode"
                    })
                });

                it("Skal validere egenmeldingsperioder", () => {
                    values.egenmeldingsperioder = [{}];
                    const res = validate(values, { sykepengesoknad });
                    expect(res.egenmeldingsperioder).to.deep.equal({
                        _error: "Vennligst oppgi minst én periode"
                    })
                });

                it("Skal validere egenmeldingsperioder dersom man har begynt å fylle ut en egenmeldingsperiode", () => {
                    values.egenmeldingsperioder = [{
                        fom: "12.12.2020"
                    }];
                    const res = validate(values, { sykepengesoknad });
                    expect(res.egenmeldingsperioder).to.deep.equal([{
                        tom: "Vennligst fyll ut dato"
                    }])
                });

                it("Skal validere egenmeldingsperioder dersom man har begynt å fylle ut en egenmeldingsperiode", () => {
                    values.egenmeldingsperioder = [{
                        tom: "12.12.2020"
                    }];
                    const res = validate(values, { sykepengesoknad });
                    expect(res.egenmeldingsperioder).to.deep.equal([{
                        fom: "Vennligst fyll ut dato"
                    }])
                });

            })
        });

        describe("feriePermisjonEllerUtenlandsopphold", () => {
          it("Skal validere", () => {
            const res = validate(values, { sykepengesoknad });
            expect(res.harHattFeriePermisjonEllerUtenlandsopphold).to.equal("Vennligst svar på om du har hatt ferie, permisjon eller utenlandsopphold")
          });

          describe("Dersom svaret er nei", () => {

            beforeEach(() => {
              values.harHattFeriePermisjonEllerUtenlandsopphold = false;
            });

            it("Skal ikke validere", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.harHattFeriePermisjonEllerUtenlandsopphold).to.be.undefined;
            })

          });

          describe("Dersom svaret er ja", () => {
            
            beforeEach(() => {
              values.harHattFeriePermisjonEllerUtenlandsopphold = true;
            });

            it("Skal ikke validere", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.harHattFeriePermisjonEllerUtenlandsopphold).to.be.undefined;
            })

            it("Skal validere at harHattFerie, permisjon eller utenlandsopphold er avkrysset", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.feriePermisjonEllerUtenlandsopphold).to.deep.equal({
                _error: "Vennligst kryss av ett av alternativene"
              })
            });

          });

          describe("Dersom svaret er ja og man ikke har krysset av for ferie", () => {
            beforeEach(() => {
              values.harHattFeriePermisjonEllerUtenlandsopphold = true;
              values.ferie = {
                avkrysset: false,
              }
            });

            it("Skal validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.feriePermisjonEllerUtenlandsopphold).to.deep.equal({
                _error: "Vennligst kryss av ett av alternativene"
              })
            });

          });

          describe("Dersom svaret er ja og man har krysset av for ferie", () => {
            beforeEach(() => {
              values.harHattFeriePermisjonEllerUtenlandsopphold = true;
              values.ferie = {
                avkrysset: true,
              }
            });

            it("Skal ikke validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
            });

            it("Skal validere at man har lagt til perioder", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.ferie.perioder).to.deep.equal({
                _error: "Vennligst oppgi minst én periode"
              })
            });

          });

          describe("Dersom svaret er ja og man har krysset av for permisjon", () => {
            beforeEach(() => {
              values.harHattFeriePermisjonEllerUtenlandsopphold = true;
              values.permisjon = {
                avkrysset: true,
              }
            });

            it("Skal ikke validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
            });

            it("Skal validere at man har lagt til perioder", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.permisjon.perioder).to.deep.equal({
                _error: "Vennligst oppgi minst én periode"
              })
            });

          });

          describe("Dersom svaret er ja og man har krysset av for utenlandsopphold", () => {
            beforeEach(() => {
              values.harHattFeriePermisjonEllerUtenlandsopphold = true;
              values.utenlandsopphold = {
                avkrysset: true,
              }
            });

            it("Skal ikke validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
            });

            it("Skal validere at man har lagt til perioder", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.utenlandsopphold.perioder).to.deep.equal({
                _error: "Vennligst oppgi minst én periode"
              })
            });

            it("Skal validere at man har svart på utenlandsoppholdSoktOmSykepenger", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.utenlandsoppholdSoktOmSykepenger).to.equal("Vennligst oppgi om du har søkt på sykepenger under oppholdet utenfor Norge")
            });

            it("Skal validere at man har svart på utenlandsoppholdSoktOmSykepenger når dette spørsmålet er besvart med ja", () => {
              values.utenlandsoppholdSoktOmSykepenger = true;
              const res = validate(values, { sykepengesoknad });
              expect(res.utenlandsoppholdSoktOmSykepenger).to.be.undefined;
            });


            it("Skal validere at man har svart på utenlandsoppholdSoktOmSykepenger når dette spørsmålet er besvart med nei", () => {
              values.utenlandsoppholdSoktOmSykepenger = false;
              const res = validate(values, { sykepengesoknad });
              expect(res.utenlandsoppholdSoktOmSykepenger).to.be.undefined;
            });

          });


          describe("Dersom svaret er ja og man har krysset av for utenlandsopphold og ferie", () => {
            beforeEach(() => {
              values.harHattFeriePermisjonEllerUtenlandsopphold = true;
              values.utenlandsopphold = {
                avkrysset: true,
              }
              values.ferie = {
                avkrysset: true
              }
            });

            it("Skal ikke validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
            });

            it("Skal validere at man har lagt til perioder", () => {
              const res = validate(values, { sykepengesoknad });
              expect(res.ferie.perioder).to.deep.equal({
                _error: "Vennligst oppgi minst én periode"
              });
              expect(res.utenlandsopphold.perioder).to.deep.equal({
                _error: "Vennligst oppgi minst én periode"
              });
            });

          });

        });

    });

});
