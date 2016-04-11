import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import SykmeldingTeaser from "../../js/components/SykmeldingTeaser.js";

describe("SykmeldingTeaser", () => {
    it("Renders the dates", function () {
        const sykmelding = {
            fom: "2016-02-02T00:00:00Z",
            tom: "2016-02-16T00:00:00Z",
            grad: "100",
            id: 123
        };
        const teaser = shallow(<SykmeldingTeaser sykmelding={sykmelding}/>);
        expect(teaser.find(".js-title").text()).to.contain("fra 02.02.2016 til 16.02.2016");
        expect(teaser.find(".js-title").text()).to.contain("Sykmelding");
    });

    it("Render correct meta information", function () {
        const teaser = shallow(<SykmeldingTeaser sykmelding={{
			fom: "2016-02-02T00:00:00Z",
			tom: "2016-02-16T00:00:00Z",
			grad: "100",
			arbeidsgiver: "Bekk Consulting AS",
		}}/>);

        expect(teaser.find("p").text()).to.contain("Bekk Consulting AS")
    });

    it("Contains a link (an <a> element", function () {
        const teaser = shallow(<SykmeldingTeaser sykmelding={{
			fom: "2016-02-02T00:00:00Z",
			tom: "2016-02-16T00:00:00Z",
			grad: "100",
			arbeidsgiver: "Bekk Consulting AS"
		}}/>);
        expect(teaser).to.have.tagName("a")
    });
});