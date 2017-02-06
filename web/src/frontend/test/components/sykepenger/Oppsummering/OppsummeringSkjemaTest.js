import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';
import { Field } from 'redux-form';

import { validate, OppsummeringSide, SendingFeilet } from '../../../../js/components/sykepengesoknad/Oppsummering/OppsummeringSkjema';
import { getSoknad } from '../../../mockSoknader';
import mapSkjemasoknadToBackendsoknad from '../../../../js/components/sykepengesoknad/mapSkjemasoknadToBackendsoknad';
import Soknad from '../../../../js/components/sykepengesoknad/Soknad';
import { Link } from 'react-router';

import CheckboxSelvstendig from '../../../../js/components/skjema/CheckboxSelvstendig';

describe("OppsummeringSkjema", () => {

    let sendTilFoerDuBegynner;
    let gyldigeVerdier;
    let sykepengesoknad;

    beforeEach(() => {
        sendTilFoerDuBegynner = sinon.spy();
        sykepengesoknad = getSoknad({
          "id": "813ada8c-b7e6-496c-b33c-c7547ef10caf",
          "status": "LAGRET",
          "innsendtDato": null,
          "opprettetDato": "2017-02-01",
          "arbeidsgiver": {
            "navn": "BYGGMESTER BLOM AS",
            "orgnummer": "***REMOVED***",
            "naermesteLeder": null
          },
          "identdato": "2017-02-15",
          "ansvarBekreftet": true,
          "bekreftetKorrektInformasjon": true,
          "arbeidsgiverUtbetalerLoenn": false,
          "egenmeldingsperioder": [{
            "fom": "2017-02-01",
            "tom": "2017-02-01"
          }],
          "gjenopptattArbeidFulltUtDato": null,
          "ferie": [],
          "permisjon": [],
          "utenlandsopphold": null,
          "aktiviteter": [{
            "periode": {
              "fom": "2016-07-15",
              "tom": "2016-07-20"
            },
            "grad": 100,
            "avvik": null
          }, {
            "periode": {
              "fom": "2016-07-15",
              "tom": "2016-07-20"
            },
            "grad": 60,
            "avvik": null
          }, {
            "periode": {
              "fom": "2016-07-15",
              "tom": "2016-07-20"
            },
            "grad": 60,
            "avvik": null
          }],
          "andreInntektskilder": [],
          "utdanning": null
        });
        gyldigeVerdier = {
          "id": "813ada8c-b7e6-496c-b33c-c7547ef10caf",
          "status": "LAGRET",
          "innsendtDato": null,
          "opprettetDato": "2017-02-01T00:00:00.000Z",
          "arbeidsgiver": {
            "navn": "BYGGMESTER BLOM AS",
            "orgnummer": "***REMOVED***",
            "naermesteLeder": null
          },
          "identdato": "2017-02-15T00:00:00.000Z",
          "ansvarBekreftet": true,
          "bekreftetKorrektInformasjon": true,
          "arbeidsgiverUtbetalerLoenn": false,
          "egenmeldingsperioder": [{
            "fom": "2017-02-01T00:00:00.000Z",
            "tom": "2017-02-01T00:00:00.000Z"
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
            "avvik": {},
            "jobbetMerEnnPlanlagt": false
          }, {
            "periode": {
              "fom": "2016-07-15T00:00:00.000Z",
              "tom": "2016-07-20T00:00:00.000Z"
            },
            "grad": 60,
            "avvik": {},
            "jobbetMerEnnPlanlagt": false
          },
            {
              "periode": {
                "fom": "2016-07-15T00:00:00.000Z",
                "tom": "2016-07-20T00:00:00.000Z"
              },
              "grad": 60,
              "avvik": {},
              "jobbetMerEnnPlanlagt": false
            }
          ],
          "andreInntektskilder": {},
          "utdanning": {
            "underUtdanningISykmeldingsperioden": false
          },
          "bruktEgenmeldingsdagerFoerLegemeldtFravaer": false,
          "harGjenopptattArbeidFulltUt": false,
          "harHattFeriePermisjonEllerUtenlandsopphold": false,
          "harAndreInntektskilder": false
        };
    });

    describe("Validate", () => {
      it("Skal kalle på sendTilFoerDuBegynner hvis noe på steg 1 er ugyldig", () => {
          const ugyldigeVerdier = Object.assign({}, gyldigeVerdier, {
              ansvarBekreftet: false,
          })
          const res = validate(ugyldigeVerdier, {
              sendTilFoerDuBegynner,
              sykepengesoknad,
          });
          expect(sendTilFoerDuBegynner.calledWith(sykepengesoknad)).to.be.true;
      });

      it("Skal kalle på sendTilFoerDuBegynner hvis noe på steg 2 er ugyldig", () => {
          delete gyldigeVerdier.harGjenopptattArbeidFulltUt;
          const res = validate(gyldigeVerdier, {
              sendTilFoerDuBegynner,
              sykepengesoknad,
          });
          expect(sendTilFoerDuBegynner.calledWith(sykepengesoknad)).to.be.true;
      });

      it("Skal kalle på sendTilFoerDuBegynner hvis noe på steg 3 er ugyldig", () => {
          delete gyldigeVerdier.harAndreInntektskilder;
          const res = validate(gyldigeVerdier, {
              sendTilFoerDuBegynner,
              sykepengesoknad,
          });
          expect(sendTilFoerDuBegynner.calledWith(sykepengesoknad)).to.be.true;
      });

      it("Skal ikke kalle på sendTilFoerDuBegynner alt er gyldig", () => {
          const res = validate(gyldigeVerdier, {
              sendTilFoerDuBegynner,
              sykepengesoknad,
          });
          expect(sendTilFoerDuBegynner.called).to.be.false;
      });
    });

    describe("OppsummeringSide", () => {
        
        let component; 
        let skjemasoknad;
        let sykepengesoknad;
        let ledetekster;
        let handleSubmit;

        beforeEach(() => {
          skjemasoknad = getSoknad({
            utdanning: {}
          });
          sykepengesoknad = getSoknad({
            id: "olsen"
          });
          ledetekster = { tekst: "test" };
          handleSubmit = sinon.spy();

          component = shallow(<OppsummeringSide
            handleSubmit={handleSubmit}
            skjemasoknad={skjemasoknad}
            sykepengesoknad={sykepengesoknad}
            ledetekster={ledetekster} />);
        });

        it("Skal inneholde et Field med riktig name", () => {
          expect(component.find(Field)).to.have.length(1);
          expect(component.find(Field).prop("component")).to.deep.equal(CheckboxSelvstendig);
          expect(component.find(Field).prop("name")).to.equal("bekreftetKorrektInformasjon");
        });

        it("Skal inneholde en Soknad med riktige props", () => {
          const mappaSoknad = mapSkjemasoknadToBackendsoknad(skjemasoknad);
          expect(component.find(Soknad)).to.have.length(1);
          expect(component.find(Soknad).prop("ledetekster")).to.deep.equal(ledetekster);
          expect(component.find(Soknad).prop("sykepengesoknad")).to.deep.equal(mappaSoknad)
        });

        it("Skal inneholde en Link til forrige side", () => {
          expect(component.find(Link).prop("to")).to.equal("/sykefravaer/soknader/olsen/aktiviteter-i-sykmeldingsperioden")
        });

        it("SKal inneholde en SendingFeilet hvis sendingFeilet", () => {
          const component2 = shallow(<OppsummeringSide handleSubmit={handleSubmit} skjemasoknad={skjemasoknad} sykepengesoknad={sykepengesoknad} sendingFeilet={true} ledetekster={ledetekster} />);
          expect(component2.find(SendingFeilet)).to.have.length(1); 
        });

        it("SKal ikke vise en SendingFeilet hvis sending ikke feilet", () => {
          expect(component.find(SendingFeilet)).to.have.length(0);
        })

    });

})