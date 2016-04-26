import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Brodsmuler from "../../js/components/Brodsmuler.js";

describe("Brodsmuler", () => { 

    it("Skal vise Ditt NAV dersom ingen brødsmuler sendes inn", function () {
        const brodsmuler =  []
        const component = shallow(<Brodsmuler brodsmuler={brodsmuler} />)
        expect(component).to.contain("Ditt NAV");
    });

    it("Skal vise Ditt NAV og én brødsmule dersom én brødsmuler sendes inn", function () {
        const brodsmuler =  [{
            tittel: "Sykmelding", 
            erKlikkbar: true
        }]
        const component = shallow(<Brodsmuler brodsmuler={brodsmuler} />)
        expect(component).to.contain("Ditt NAV");
        expect(component.find(".js-smule").length).to.equal(2);
    });

    it("Skal ta hensyn til erKlikkbar-flagget", function () {
        const brodsmuler =  [{
            tittel: "Dine sykmeldinger", 
            erKlikkbar: true,
            sti: "/dine-sykmeldinger"
        }, {
            tittel: "Din sykmelding",
            erKlikkbar: false
        }]
        const component = mount(<Brodsmuler brodsmuler={brodsmuler} />)
        expect(component.find("a").length).to.equal(2);
    });

}); 