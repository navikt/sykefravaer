import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import validate from '../../../../js/components/sykepengesoknad/validering/validerFravaerOgFriskmelding';
import { getSoknad } from '../../../mockSoknader';

describe("validerFravaerOgFriskmelding", () => {

    let values;
    let sykepengesoknad;
    let clock;
    let sendTilFoerDuBegynner;

    beforeEach(() => {
        values = {
          ansvarBekreftet: true,
        };
        clock = sinon.useFakeTimers(1484210369692); // Setter dagens dato til 12. januar 2017
        sykepengesoknad = getSoknad({
          id: "min-soknad-id"
        });
        sendTilFoerDuBegynner = sinon.spy();
    });

    afterEach(() => {
        clock.restore();
    });

    it("Skal sende til før du begynner dersom ansvarBekreftet === undefined", () => {
      const res = validate({}, { sykepengesoknad, sendTilFoerDuBegynner });
      expect(sendTilFoerDuBegynner.calledWith(sykepengesoknad)).to.be.true;
    });

    it("Skal ikke sende til før du begynner dersom ansvarBekreftet === true", () => {
      const res = validate({
        ansvarBekreftet: true
      }, { sykepengesoknad, sendTilFoerDuBegynner });
      expect(sendTilFoerDuBegynner.calledWith(sykepengesoknad)).to.be.false;
    });

    describe("harGjenopptattArbeidFulltUt", () => {

        it("Skal klage hvis man ikke har svart på spørsmålet", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.harGjenopptattArbeidFulltUt).to.equal("Vennligst oppgi om du var tilbake i arbeid før sykmeldingsperioden utløp")
        });

        describe("Dersom svaret er nei", () => {

            beforeEach(() => {
                values.harGjenopptattArbeidFulltUt = false;
            });

            it("Skal ikke klage", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.harGjenopptattArbeidFulltUt).to.be.undefined;
            })
        });

        describe("Dersom svaret er ja", () => {

            beforeEach(() => {
                values.harGjenopptattArbeidFulltUt = true;
            });

            it("Skal ikke klage på at harGjenopptattArbeidFulltUt ikke er fylt ut", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.harGjenopptattArbeidFulltUt).to.be.undefined;
            });

            it("Skal påse at gjenopptattArbeidFulltUtDato er påkrevd", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.gjenopptattArbeidFulltUtDato).to.equal("Vennligst oppgi når du gjenopptok arbeidet")
            });

            it("Skal påse at gjenopptattArbeidFulltUtDato er på riktig format", () => {
                values.gjenopptattArbeidFulltUtDato = "10.01.2017"
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.gjenopptattArbeidFulltUtDato).to.be.undefined;
            });

            it("Skal påse at datoen er bakover i tid", () => {
                values.gjenopptattArbeidFulltUtDato = "12.12.2020";
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.gjenopptattArbeidFulltUtDato).to.equal("Datoen må være bakover i tid");
            });

            it("Skal påse at datoen ikke er før første sykepengesoknad dag", () => {
                values.gjenopptattArbeidFulltUtDato = "25.12.2016";
                sykepengesoknad.identdato = new Date("2017-01-01");
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.gjenopptattArbeidFulltUtDato).to.equal("Datoen kan ikke være før du ble sykmeldt 01.01.2017");
            });

            it("Skal ikke klage hvis datoen er samme dag som første sykepengesoknad dag", () => {
                values.gjenopptattArbeidFulltUtDato = "01.01.2017";
                sykepengesoknad.identdato = new Date("2017-01-01");
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.gjenopptattArbeidFulltUtDato).to.be.undefined;
            });

        });

    });

    describe("Egenmeldingsdager", () => {
        it("Skal validere bruktEgenmeldingsdagerFoerLegemeldtFravaer", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.equal("Du må svare om du brukte egenmeldingsdager før det legemeldte fraværet startet");
        });

        it("Skal ikke validere bruktEgenmeldingsdagerFoerLegemeldtFravaer når man har svart ja på spørsmålet", () => {
            values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = true;
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.be.undefined;
        });

        it("Skal ikke validere bruktEgenmeldingsdagerFoerLegemeldtFravaer når man har svart nei på spørsmålet", () => {
            values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = false;
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.bruktEgenmeldingsdagerFoerLegemeldtFravaer).to.be.undefined;
        });

        it("Testcase som feiler i UI", () => {
          values = {"bruktEgenmeldingsdagerFoerLegemeldtFravaer":true,"egenmeldingsperioder":[{},{}]};
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.egenmeldingsperioder).to.deep.equal({
            _error: "Vennligst oppgi minst én periode"
          })
        })

        describe("Når values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = true", () => {
            beforeEach(() => {
                values.bruktEgenmeldingsdagerFoerLegemeldtFravaer = true;
            });

            it("Skal validere egenmeldingsperioder", () => {
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.egenmeldingsperioder).to.deep.equal({
                    _error: "Vennligst oppgi minst én periode"
                })
            });

            it("Skal validere egenmeldingsperioder", () => {
                values.egenmeldingsperioder = [{}];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.egenmeldingsperioder).to.deep.equal({
                    _error: "Vennligst oppgi minst én periode"
                })
            });

            it("Skal validere egenmeldingsperioder dersom man har begynt å fylle ut en egenmeldingsperiode", () => {
                values.egenmeldingsperioder = [{
                    fom: "12.12.2020"
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.egenmeldingsperioder).to.deep.equal([{
                    tom: "Vennligst fyll ut dato"
                }])
            });

            it("Skal validere egenmeldingsperioder dersom man har begynt å fylle ut en egenmeldingsperiode", () => {
                values.egenmeldingsperioder = [{
                    tom: "12.12.2020"
                }];
                const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
                expect(res.egenmeldingsperioder).to.deep.equal([{
                    fom: "Vennligst fyll ut dato"
                }])
            });

        })
    });

    describe("feriePermisjonEllerUtenlandsopphold", () => {
      it("Skal validere", () => {
        const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
        expect(res.harHattFeriePermisjonEllerUtenlandsopphold).to.equal("Vennligst svar på om du har hatt ferie, permisjon eller utenlandsopphold")
      });

      describe("Dersom svaret er nei", () => {

        beforeEach(() => {
          values.harHattFeriePermisjonEllerUtenlandsopphold = false;
        });

        it("Skal ikke validere", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.harHattFeriePermisjonEllerUtenlandsopphold).to.be.undefined;
        })

      });

      describe("Dersom svaret er ja", () => {
        
        beforeEach(() => {
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
        });

        it("Skal ikke validere", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.harHattFeriePermisjonEllerUtenlandsopphold).to.be.undefined;
        })

        it("Skal validere at harHattFerie, permisjon eller utenlandsopphold er avkrysset", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.feriePermisjonEllerUtenlandsopphold).to.deep.equal({
            _error: "Vennligst kryss av ett av alternativene"
          })
        });

      });

      describe("Dersom svaret er ja og man ikke har krysset av for ferie", () => {
        beforeEach(() => {
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          
        });

        it("Skal validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.feriePermisjonEllerUtenlandsopphold).to.deep.equal({
            _error: "Vennligst kryss av ett av alternativene"
          })
        });

      });

      describe("Dersom svaret er ja og man har krysset av for ferie", () => {
        beforeEach(() => {
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          values.harHattFerie = true;
        });

        it("Skal ikke validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
        });

        it("Skal validere at man har lagt til perioder", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.ferie).to.deep.equal({
            _error: "Vennligst oppgi minst én periode"
          })
        });

      });

      describe("Dersom svaret er ja og man har krysset av for ferie og fylt ut gjenopptattArbeidFulltUtDato", () => {
        beforeEach(() => {
          sykepengesoknad = getSoknad({})
          values.harGjenopptattArbeidFulltUt = true;
          values.gjenopptattArbeidFulltUtDato = "09.01.2017"
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          values.harHattFerie = true;
          values.ferie = [{
            fom: "10.01.2017",
            tom: "15.01.2017"
          }]
        });

        it("Skal klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.ferie).to.deep.equal([{
            fom: "Datoen må være innenfor perioden 01.01.2017-08.01.2017",
            tom: "Datoen må være innenfor perioden 01.01.2017-08.01.2017"
          }])
        });

        it("Skal ikke klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato hvis values.harGjenopptattArbeidFulltUt = false", () => {
          values.harGjenopptattArbeidFulltUt = false;
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.ferie).to.be.undefined;
        });

      });

      describe("Dersom svaret er ja og man har krysset av for ferie og søknaden har forrigeSykeforloepTom satt og del er 1", () => {
        beforeEach(() => {
          sykepengesoknad = getSoknad({
            forrigeSykeforloepTom: new Date("2016-05-12"),
            del: 1,
          })
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          values.harGjenopptattArbeidFulltUt = true;
          values.gjenopptattArbeidFulltUtDato = "17.01.2017"
          values.harHattFerie = true;
          values.ferie = [{
            fom: "10.01.2015",
            tom: "15.01.2017"
          }]
        });

        it("Skal klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.ferie).to.deep.equal([{
            fom: "Datoen må være innenfor perioden 12.05.2016-16.01.2017"
          }])
        });

      });

      describe("Dersom svaret er ja og man har krysset av for ferie og søknaden har forrigeSykeforloepTom satt og del er 2", () => {
        beforeEach(() => {
          sykepengesoknad = getSoknad({
            forrigeSykeforloepTom: new Date("2016-05-12"),
            del: 2,
          })
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          values.harGjenopptattArbeidFulltUt = true;
          values.gjenopptattArbeidFulltUtDato = "17.01.2017"
          values.harHattFerie = true;
          values.ferie = [{
            fom: "10.01.2015",
            tom: "15.01.2017"
          }]
        });

        it("Skal klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.ferie).to.deep.equal([{
            fom: "Datoen må være innenfor perioden 01.01.2017-16.01.2017"
          }])
        });

      });

      describe("Dersom svaret er ja og man har krysset av for permisjon", () => {
        beforeEach(() => {
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          values.harHattPermisjon = true;
        });

        it("Skal ikke validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
        });

        it("Skal validere at man har lagt til perioder", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.permisjon).to.deep.equal({
            _error: "Vennligst oppgi minst én periode"
          })
        });

        describe("Dersom man har fylt ut gjenopptattArbeidFulltUtDato", () => {
          beforeEach(() => {
            values.harGjenopptattArbeidFulltUt = true;
            values.gjenopptattArbeidFulltUtDato = "12.07.2020"
            values.harHattFeriePermisjonEllerUtenlandsopphold = true;
            values.permisjon = [{
              fom: "10.07.2020",
              tom: "15.07.2020"
            }]
          });

          it("Skal klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.permisjon).to.deep.equal([{
              tom: "Datoen må være innenfor perioden 01.01.2017-11.07.2020"
            }])
          });

          it("Skal ikke klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato hvis values.harGjenopptattArbeidFulltUt = false", () => {
            values.harGjenopptattArbeidFulltUt = false;
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.permisjon).to.be.undefined;
          });

        });

      });

      describe("Dersom svaret er ja og man har krysset av for utenlandsopphold", () => {
        beforeEach(() => {
          values.utenlandsopphold = {
            perioder: [],
            soektOmSykepengerIPerioden: null,
          };
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          values.harHattUtenlandsopphold = true;
        });

        it("Må ikke ferie, permisjon eller utenlandsopphold være avkrysset", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
        });

        it("Skal validere at man har lagt til perioder", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.utenlandsopphold.perioder).to.deep.equal({
            _error: "Vennligst oppgi minst én periode"
          })
        });

        it("Skal validere at man har svart på soektOmSykepengerIPerioden", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.utenlandsopphold.soektOmSykepengerIPerioden).to.equal("Vennligst oppgi om du har søkt på sykepenger under oppholdet utenfor Norge")
        });

        it("Skal validere at man har svart på soektOmSykepengerIPerioden når dette spørsmålet er besvart med ja", () => {
          values.utenlandsopphold = {
            soektOmSykepengerIPerioden: true,
          };
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.utenlandsopphold.soektOmSykepengerIPerioden).to.be.undefined;
        });

        it("Skal feile validering dersom en ikke har svart på om en har soekt om sykepenger under utenlandsoppholdet", () => {
            values.utenlandsopphold = {
                perioder: [],
            };
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.utenlandsopphold.soektOmSykepengerIPerioden).to.equal("Vennligst oppgi om du har søkt på sykepenger under oppholdet utenfor Norge");
        });


        it("Skal validere at man har svart på soektOmSykepengerIPerioden når dette spørsmålet er besvart med nei", () => {
          values.utenlandsopphold = {
            soektOmSykepengerIPerioden: false,
          };
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.utenlandsopphold.soektOmSykepengerIPerioden).to.be.undefined;
        });

        describe("Hvis man har fylt ut deler av en periode", () => {
          beforeEach(() => {
            values.utenlandsopphold = {
              perioder: [{
                fom: "12.02.2017"
              }],
              soektOmSykepengerIPerioden: null,
            }
            values.harHattFeriePermisjonEllerUtenlandsopphold = true;
            values.harHattUtenlandsopphold = true;
          });

          it("Skal funke", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.utenlandsopphold.perioder).to.deep.equal([{
              tom: "Vennligst fyll ut dato"
            }])
            expect(res.utenlandsopphold.soektOmSykepengerIPerioden).to.equal("Vennligst oppgi om du har søkt på sykepenger under oppholdet utenfor Norge");
          })
        });

        describe("Dersom man har fylt ut gjenopptattArbeidFulltUtDato", () => {
          beforeEach(() => {
            values.harGjenopptattArbeidFulltUt = true;
            values.gjenopptattArbeidFulltUtDato = "12.07.2020"
            values.harHattFeriePermisjonEllerUtenlandsopphold = true;
            values.utenlandsopphold.perioder = [{
              fom: "10.07.2020",
              tom: "15.07.2020"
            }]
          });

          it("Skal klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato", () => {
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.utenlandsopphold.perioder).to.deep.equal([{
              tom: "Datoen må være innenfor perioden 01.01.2017-11.07.2020"
            }])
          });

          it("Skal ikke klage på at fom-dato er etter values.gjenopptattArbeidFulltUtDato hvis values.harGjenopptattArbeidFulltUt = false", () => {
            values.harGjenopptattArbeidFulltUt = false;
            const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
            expect(res.utenlandsopphold.perioder).to.be.undefined;
          });

        });

      });


      describe("Dersom svaret er ja og man har krysset av for utenlandsopphold og ferie", () => {
        beforeEach(() => {
          values.harHattFeriePermisjonEllerUtenlandsopphold = true;
          values.harHattUtenlandsopphold = true;
          values.harHattFerie = true;
          values.utenlandsopphold = {
            perioder: [],
            soektOmSykepengerIPerioden: null,
          }
        });

        it("Skal ikke validere at ferie, permisjon eller utenlandsopphold er avkrysset", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.feriePermisjonEllerUtenlandsopphold).to.be.undefined;
        });

        it("Skal validere at man har lagt til perioder", () => {
          const res = validate(values, { sykepengesoknad, sendTilFoerDuBegynner });
          expect(res.ferie).to.deep.equal({
            _error: "Vennligst oppgi minst én periode"
          });
          expect(res.utenlandsopphold.perioder).to.deep.equal({
            _error: "Vennligst oppgi minst én periode"
          });
        });

      });

      it("Skal ikke klage hvis egenmeldingsperioder er fylt ut riktig", () => {

          const values = {
            "id": "b2450694-bc57-40cd-a834-34c817ace7e3",
            "status": "NY",
            "opprettetDato": "2017-02-02T00:00:00.000Z",
            "arbeidsgiver": {
              "navn": "BYGGMESTER BLOM AS",
              "orgnummer": "***REMOVED***",
              "naermesteLeder": null
            },
            "identdato": "2017-02-15T00:00:00.000Z",
            "ansvarBekreftet": true,
            "bekreftetKorrektInformasjon": false,
            "arbeidsgiverUtbetalerLoenn": true,
            "egenmeldingsperioder": [{
              "fom": "12.01.2020",
              "tom": "15.01.2020"
            }],
            "gjenopptattArbeidFulltUtDato": null,
            "ferie": [],
            "permisjon": [],
            "utenlandsopphold": {
              "perioder": []
            },
            "aktiviteter": [{
              "periode": {
                "fom": "2016-07-15T00:00:00.000Z",
                "tom": "2016-07-20T00:00:00.000Z"
              },
              "grad": 100,
              "avvik": {}
            }],
            "andreInntektskilder": {},
            "utdanning": {},
            "bruktEgenmeldingsdagerFoerLegemeldtFravaer": true,
            "harGjenopptattArbeidFulltUt": false,
            "harHattFeriePermisjonEllerUtenlandsopphold": false
          };

          const sykepengesoknad = {
            "id": "b2450694-bc57-40cd-a834-34c817ace7e3",
            "status": "NY",
            "opprettetDato": "2017-02-02T00:00:00.000Z",
            "arbeidsgiver": {
              "navn": "BYGGMESTER BLOM AS",
              "orgnummer": "***REMOVED***",
              "naermesteLeder": null
            },
            "identdato": "2017-02-15T00:00:00.000Z",
            "ansvarBekreftet": false,
            "bekreftetKorrektInformasjon": false,
            "arbeidsgiverUtbetalerLoenn": true,
            "egenmeldingsperioder": [],
            "gjenopptattArbeidFulltUtDato": null,
            "ferie": [],
            "permisjon": [],
            "utenlandsopphold": null,
            "aktiviteter": [{
              "periode": {
                "fom": "2016-07-15T00:00:00.000Z",
                "tom": "2016-07-20T00:00:00.000Z"
              },
              "grad": 100,
              "avvik": null
            }],
            "andreInntektskilder": [],
            "utdanning": null
          }

          const res = validate(values, {
              sykepengesoknad,
              sendTilFoerDuBegynner
          });

          expect(res).to.deep.equal({});

      });

    });

});

