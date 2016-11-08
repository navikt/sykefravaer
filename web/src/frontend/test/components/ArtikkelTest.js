import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Artikkel from "../../js/components/Artikkel";

describe("Artikkel", () => {

    let tittel = "Min fine artikkel";
    let innhold = "<p>Dette er noe innhold</p>";

    it("Skal vise tittel", () => {
        let component = shallow(<Artikkel tittel={tittel} innhold={innhold}/>);
        expect(component.text()).to.contain("Min fine artikkel");
    });

    it("Skal vise innhold som HTML", () => {
        let component = shallow(<Artikkel tittel={tittel} innhold={innhold}/>);
        expect(component.html()).to.contain("<p>Dette er noe innhold</p>");
    });

}); 