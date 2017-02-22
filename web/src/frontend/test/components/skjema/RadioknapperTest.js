import chai from "chai";
import React from "react";
import {mount, shallow} from "enzyme";
import chaiEnzyme from "chai-enzyme";
import Radioknapper from "../../../js/components/skjema/Radioknapper";
import {Hjelpetekst} from "digisyfo-npm";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Radioknapper", () => {

    it("Viser hjelpetekst om satt", () => {
        const hjelpetekst = <Hjelpetekst id={'1'} tekst={'tekst'} tittel={'tittel'}/>;
        const comp = shallow(<Radioknapper hjelpetekst={hjelpetekst} children={[]} ledetekster={{}} meta={{}} spoersmal='spoersmaal' />)
        expect(comp.find(Hjelpetekst)).to.have.length(1);
    });

    it("Viser ikke hjelpetekst om satt", () => {
        const hjelpetekst = <Hjelpetekst id={'1'} tekst={'tekst'} tittel={'tittel'}/>;
        const comp = shallow(<Radioknapper hjelpetekst={hjelpetekst} children={[]} ledetekster={{}} meta={{}} spoersmal='spoersmaal' />)
        expect(comp.find(Hjelpetekst)).to.have.length(1);
    });
});

