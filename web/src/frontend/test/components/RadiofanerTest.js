import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Radiofaner from "../../js/components/Radiofaner.js";

describe("Radiofaner", () => {

    let alternativer;

    beforeEach(() => {
        alternativer = [{
            tittel: 'Jeg har arbeidsgiver',
            verdi: 'MED_ARBEIDSGIVER',
        }, {
            tittel: 'Jeg har ikke arbeidsgiver',
            verdi: 'UTEN_ARBEIDSGIVER',
        }]
    });

    it("Skal rendre faner", () => {
        let component = shallow(<Radiofaner alternativer={alternativer}/>);
        expect(component.find("li")).to.have.length(2);
    });

    it("Skal rendre radioknapper", () => {
        let component = shallow(<Radiofaner alternativer={alternativer}/>);
        expect(component.find("input")).to.have.length(2);
    });

    it("Skal sette valgtAlternativ til valgt", () => {
        let component = mount(<Radiofaner alternativer={alternativer} valgtAlternativ="MED_ARBEIDSGIVER"/>);
        expect(component.find(".js-MED_ARBEIDSGIVER")).to.be.checked();
        let component2 = mount(<Radiofaner alternativer={alternativer} valgtAlternativ="UTEN_ARBEIDSGIVER"/>);
        expect(component2.find(".js-UTEN_ARBEIDSGIVER")).to.be.checked();
    });

    it("Skal kalle på changeHandler når man velger et alternativ", () => {
        const spy = sinon.spy();
        let component = mount(<Radiofaner alternativer={alternativer} valgtAlternativ="MED_ARBEIDSGIVER"
                                     changeHandler={spy}/>);
        component.find(".js-UTEN_ARBEIDSGIVER").simulate("change");
        expect(spy.calledOnce).to.equal(true);
        expect(spy.getCall(0).args[0]).to.equal("UTEN_ARBEIDSGIVER");
    });

}); 