import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Checkbox from "../../js/components/skjema/Checkbox.js";

describe("Checkbox", () => {

    it("Skal rendre en NAV-checkbox", () => {
        let component = shallow(<Checkbox name="appelsin" value="appelsin" id="appelsin" label="Appelsin" />);
        expect(component.find(".nav-checkbox")).to.have.length(1);
        expect(component.find("label")).to.have.length(1);
    });

    it("Skal være valgt dersom erValgt === true", () => {
        let component = shallow(<Checkbox name="frukt" value="appelsin" id="appelsin" erValgt label="Appelsin" />);
        expect(component.find("input")).to.be.checked();
    });

    it("Skal ikke være valgt dersom erValgt === false", () => {
        let component = shallow(<Checkbox name="frukt" value="appelsin" id="appelsin" label="Appelsin" />);
        expect(component.find("input")).not.to.be.checked();
    });

    it("Skal kalle changeHandler ved change", () => {
        let spy = sinon.spy();
        let component = shallow(<Checkbox name="frukt" value="appelsin" id="appelsin" label="Appelsin" changeHandler={spy} />);
        component.find("input").simulate("change");
        expect(spy.calledOnce).to.equal(true);
    });

    it("Skal rendre children dersom checkbox er valgt", () => {
        let component = shallow(<Checkbox name="frukt" value="appelsin" id="appelsin" erValgt label="Appelsin">
            <p>Helt enig, appelsin er digg.</p>
        </Checkbox>);
        expect(component.text()).to.contain("Helt enig, appelsin er digg");
    }); 

    it("Skal ikke rendre children dersom checkbox ikke er valgt", () => {
        let component = shallow(<Checkbox name="frukt" value="appelsin" id="appelsin" label="Appelsin">
            <p>Helt enig, appelsin er digg.</p>
        </Checkbox>);
        expect(component.text()).not.to.contain("Helt enig, appelsin er digg");
    }); 

}); 