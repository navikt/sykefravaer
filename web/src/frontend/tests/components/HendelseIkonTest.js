import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import HendelseIkon from "../../js/components/HendelseIkon.js";

describe.only("HendelseIkon", () => {

    it("Skal vise to bilder; ett vanlig og ett for høykontrast", () => {
        let component = shallow(<HendelseIkon />);
        expect(component.find("img")).to.have.length(2);
    });

});