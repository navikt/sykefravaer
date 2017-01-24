import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
const expect = chai.expect;

import Egenmeldingsdager from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/Egenmeldingsdager';
import Periodevelger from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/Periodevelger';
import JaEllerNei from '../../../../js/components/sykepengesoknad/JaEllerNei';

describe("Egenmeldingsdager", () => {

    it("Skal inneholde en JaEllerNei med riktig name", () => {
        const compo = shallow(<Egenmeldingsdager />);
        expect(compo.find(JaEllerNei)).to.have.length(1);
        expect(compo.find(JaEllerNei).prop("name")).to.equal("bruktEgenmeldingsdagerFoerLegemeldtFravaer")
    });

    it("Skal inneholde en JaEllerNei med riktig children", () => {
        const compo = shallow(<Egenmeldingsdager />);
        expect(compo.find(Periodevelger)).to.have.length(1);
        expect(compo.find(Periodevelger).prop("name")).to.equal("egenmeldingsperioder");
    })

});