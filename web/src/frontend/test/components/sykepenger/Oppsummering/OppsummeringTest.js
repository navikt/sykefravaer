import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';

import { Oppsummering, validate } from '../../../../js/components/sykepengesoknad/Oppsummering/Oppsummering';
import { getSoknad } from '../../../mockSoknader';

describe("Oppsummering", () => {

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
    })

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



})