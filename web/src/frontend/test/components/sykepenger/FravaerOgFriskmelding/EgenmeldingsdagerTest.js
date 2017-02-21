import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import Egenmeldingsdager from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/Egenmeldingsdager';
import Periodevelger from '../../../../js/components/skjema/Periodevelger';
import JaEllerNei from '../../../../js/components/sykepengesoknad/JaEllerNei';
import { getSoknad } from '../../../mockSoknader';
import ledetekster from '../../../ledetekster_mock';

describe("Egenmeldingsdager", () => {

    let getSykepengesoknad;

    it("Skal inneholde en JaEllerNei med riktig name", () => {
        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad()} ledetekster={ledetekster} />);
        expect(compo.find(JaEllerNei)).to.have.length(1);
        expect(compo.find(JaEllerNei).prop("name")).to.equal("bruktEgenmeldingsdagerFoerLegemeldtFravaer")
    });

    it("Skal inneholde en JaEllerNei med riktig children", () => {
        const senesteTom = new Date("2017-02-01");
        const tidligsteFom = new Date(senesteTom);
        tidligsteFom.setMonth(tidligsteFom.getMonth() - 6);

        const aktiviteter = [{
            "periode": {
                "fom": tidligsteFom,
                "tom": senesteTom,
            },
            "grad": 100,
            "avvik": null
        }];

        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad({
            identdato: new Date("2017-02-01"),
            aktiviteter: aktiviteter,
        })} ledetekster={ledetekster} />);
        expect(compo.find(Periodevelger)).to.have.length(1);
        expect(compo.find(Periodevelger).prop("name")).to.equal("egenmeldingsperioder");
        expect(compo.find(Periodevelger).prop("senesteTom")).to.deep.equal(senesteTom);
        expect(compo.find(Periodevelger).prop("tidligsteFom")).to.deep.equal(tidligsteFom);
    });

    it("Skal vise riktig spørsmål", () => {
        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad({
            aktiviteter: [{
                periode: {
                    fom: "2017-01-01",
                    tom: "2017-01-15"
                },
                grad: 100,
                avvik: null
            },
                {
                    periode: {
                        fom: "2017-01-16",
                        tom: "2017-01-20"
                    },
                    grad: 50,
                    avvik: null
                }],
        })} ledetekster={ledetekster} />);
        expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Brukte du egenmeldingsdager før det legemeldte fraværet startet den 15.07.2016?")
    });

});