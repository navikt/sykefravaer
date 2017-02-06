import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;
import sinon from 'sinon';

import Oppsummering from '../../../../js/components/sykepengesoknad/Oppsummering/Oppsummering';
import { getSoknad } from '../../../mockSoknader';
import mapSkjemasoknadToBackendsoknad from '../../../../js/components/sykepengesoknad/mapSkjemasoknadToBackendsoknad';

xdescribe("Oppsummering", () => {

    it("TEST", () => {
      const data = {
        "id": "f40e50bc-09ba-4480-9b8f-3849efcdb5d2",
        "status": "NY",
        "innsendtDato": null,
        "opprettetDato": new Date("2017-02-03T00:00:00.000Z"),
        "arbeidsgiver": {
          "navn": "LØNNS- OG REGNSKAPSSENTERET",
          "orgnummer": "***REMOVED***",
          "naermesteLeder": null
        },
        "identdato": new Date("2017-02-15T00:00:00.000Z"),
        "ansvarBekreftet": true,
        "bekreftetKorrektInformasjon": false,
        "arbeidsgiverUtbetalerLoenn": true,
        "egenmeldingsperioder": [],
        "gjenopptattArbeidFulltUtDato": null,
        "ferie": [],
        "permisjon": [],
        "utenlandsopphold": {
          "perioder": []
        },
        "aktiviteter": [{
          "periode": {
            "fom": new Date("2016-07-15T00:00:00.000Z"),
            "tom": new Date("2016-07-20T00:00:00.000Z")
          },
          "grad": 100,
          "avvik": {
            "enhet": "prosent",
            "arbeidsgrad": "80",
            "arbeidstimerNormalUke": "55"
          },
          "jobbetMerEnnPlanlagt": true
        }],
        "andreInntektskilder": {},
        "utdanning": {
          "underUtdanningISykmeldingsperioden": false
        },
        "bruktEgenmeldingsdagerFoerLegemeldtFravaer": false,
        "harGjenopptattArbeidFulltUt": false,
        "harHattFeriePermisjonEllerUtenlandsopphold": false,
        "harAndreInntektskilder": false
      }
      const res = mapSkjemasoknadToBackendsoknad(data);
      const component = mount(<Oppsummering sykepengesoknad={res} ledetekster={{}} />); 
    })

})