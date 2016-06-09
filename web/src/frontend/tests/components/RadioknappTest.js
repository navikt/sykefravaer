import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Radioknapp from "../../js/components/Radioknapp.js";

describe("Radioknapp", () => {

    it("Skal rendre en NAV-radioknapp", () => {
        let component = shallow(<Radioknapp name="frukt" value="appelsin" id="appelsin" valgtVerdi="appelsin" label="Appelsin" />);
        expect(component.find(".nav-radioknapp")).to.have.length(1);
        expect(component.find("label")).to.have.length(1);
    });

    it("Skal være valgt dersom erValgt === true", () => {
        let component = shallow(<Radioknapp name="frukt" value="appelsin" id="appelsin" erValgt={true} label="Appelsin" />);
        expect(component.find("input")).to.be.checked();
    })

}); 