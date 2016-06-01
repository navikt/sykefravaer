import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DineSykmeldinger from "../../js/components/DineSykmeldinger.js";
import SykmeldingTeasere from '../../js/components/SykmeldingTeasere.js';

const sykmeldinger = [];

describe("Dine sykmeldinger", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<DineSykmeldinger sykmeldinger={sykmeldinger} ledetekster={ledetekster} />);
    });

    it("Skal vise overskrift for 'Dine sykmeldinger'", () => {
        expect(component.find("h1").text()).to.equal("Dine sykmeldinger");
    });

    it("Skal vise introtekst", () => {
        expect(component.find(".js-intro").length).to.equal(1)
    });

    it("Skal rendre SykmeldingTeasere", () => {
        expect(component.find(SykmeldingTeasere)).to.have.length(1);
    });

}); 