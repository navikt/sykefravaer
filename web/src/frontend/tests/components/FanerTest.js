import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Faner from "../../js/components/Faner.js";

describe("Faner", () => {

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
        let component = shallow(<Faner alternativer={alternativer}/>);
        expect(component.find("li")).to.have.length(2);
    });

    it("Skal rendre lenker", () => {
        let component = shallow(<Faner alternativer={alternativer}/>);
        expect(component.find("a")).to.have.length(2);
    });

    it("Skal sette valgtAlternativ til er-valgt", () => {
        let component = mount(<Faner alternativer={alternativer} valgtAlternativ="MED_ARBEIDSGIVER"/>);
        expect(component.find(".js-er-valgt").text()).to.equal("Jeg har arbeidsgiver")
        let component2 = mount(<Faner alternativer={alternativer} valgtAlternativ="UTEN_ARBEIDSGIVER"/>);
        expect(component2.find(".js-er-valgt").text()).to.equal("Jeg har ikke arbeidsgiver")
    });

    it("Skal kalle på clickhandler når man velger et alternativ", () => {
        const spy = sinon.spy();
        let component = mount(<Faner alternativer={alternativer} valgtAlternativ="MED_ARBEIDSGIVER"
                                     clickHandler={spy}/>);
        component.find(".js-UTEN_ARBEIDSGIVER").simulate("click");
        expect(spy.calledOnce).to.equal(true);
        expect(spy.getCall(0).args[1]).to.equal("UTEN_ARBEIDSGIVER");
    });

}); 