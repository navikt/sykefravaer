import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chaiJquery from 'chai-jquery';
import sinon from 'sinon';

chai.use(chaiEnzyme());

const expect = chai.expect;

import Hjelpetekst from "../../js/components/Hjelpetekst.js";

describe("Hjelpetekst", () => {

    let tittel = "Min fine artikkel";
    let innhold = "Dette er noe innhold";

    it("Skal vise tittel", () => {
        let component = shallow(<Hjelpetekst tittel={tittel} tekst={innhold} erApen={true} />);
        expect(component.find(".js-tittel").text()).to.equal("Min fine artikkel");
    });

    it("Skal vise innhold som HTML", () => {
        let component = shallow(<Hjelpetekst tittel={tittel} tekst={innhold}  erApen={true}/>);
        expect(component.find(".js-tekst")).to.contain("Dette er noe innhold");
    });

    it("Skal være åpen dersom erApen === true", () => {
        let component = shallow(<Hjelpetekst tittel={tittel} tekst={innhold} erApen={true} />);
        expect(component.find(".js-tooltip.er-synlig")).to.have.length(1);
    });

    it("Skal åpne seg når man klikker på ?", () => {
        sinon.stub(Hjelpetekst.prototype, "componentDidUpdate");
        let component = shallow(<Hjelpetekst tittel={tittel} tekst={innhold} erApen={false} />);
        component.find(".js-apne").simulate("click");
        expect(component.state("erApen")).to.be.true;
    });

    it("Skal lukke seg når man klikker på X", () => {
        let component = shallow(<Hjelpetekst tittel={tittel} tekst={innhold} erApen={true} />);
        component.find(".js-lukk").simulate("click");
        expect(component.state("erApen")).to.be.false;
    });

}); 