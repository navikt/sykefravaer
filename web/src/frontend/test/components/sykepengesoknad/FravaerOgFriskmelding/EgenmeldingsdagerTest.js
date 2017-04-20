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
import ledetekster from '../../../mockLedetekster';
import { setLedetekster } from 'digisyfo-npm';

describe("Egenmeldingsdager", () => {

    let getSykepengesoknad;

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it("Skal inneholde en JaEllerNei med riktig name", () => {
        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad()} />);
        expect(compo.find(JaEllerNei)).to.have.length(1);
        expect(compo.find(JaEllerNei).prop("name")).to.equal("bruktEgenmeldingsdagerFoerLegemeldtFravaer")
    });

    it("Skal inneholde en JaEllerNei som inneholder en periodevelger med name = egenmeldingsperioder", () => {
        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad({
            identdato: new Date("2017-02-01"),
        })} />);

        expect(compo.find(Periodevelger)).to.have.length(1);
        expect(compo.find(Periodevelger).prop("name")).to.equal("egenmeldingsperioder");
    });

    it("Skal sette tidligsteFom til dagen før identdato minus seks måneder og senesteTom til dagen før identdato på periodevelgeren", () => {
        const senesteTom = new Date("2017-01-31");
        const tidligsteFom = new Date(senesteTom);
        tidligsteFom.setMonth(tidligsteFom.getMonth() - 6);

        const compo = shallow(<Egenmeldingsdager sykepengesoknad={getSoknad({
            identdato: new Date("2017-02-01"),
        })} />);

        expect(compo.find(Periodevelger).prop("senesteTom")).to.deep.equal(senesteTom);
        expect(compo.find(Periodevelger).prop("tidligsteFom")).to.deep.equal(tidligsteFom);
    })

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
        })} />);
        expect(compo.find(JaEllerNei).prop("spoersmal")).to.equal("Brukte du egenmeldingsdager før det legemeldte fraværet startet den 15.07.2016?")
    });

});