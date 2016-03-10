var expect = require("chai").expect;
import SykmeldingTeaser from "../../js/components/SykmeldingTeaser.js";
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils'
import React from 'react'


function renderTeaser (Component, sykmelding) {
	return TestUtils.renderIntoDocument(<Component sykmelding={sykmelding} />)
}

function getContentOfNode (component, className) {
	const node = ReactDOM.findDOMNode(component);
	return node.textContent;
}

describe("SykmeldingTeaser", () => {
    it("Renders the dates", function () {
        const sykmelding = {
            fom: "2016-02-02T00:00:00Z",
            tom: "2016-02-16T00:00:00Z",
            grad: "100",
            id: 123
        };
        const teaser = renderTeaser(SykmeldingTeaser, sykmelding);
        expect(ReactDOM.findDOMNode(teaser).textContent).to.contain("Sykmelding fra 02.02.2016 til 16.02.2016");
    });

    it("Render correct meta information", function () {
        const teaser = renderTeaser(SykmeldingTeaser, {
            fom: "2016-02-02T00:00:00Z",
            tom: "2016-02-16T00:00:00Z",
            grad: "100",
            arbeidsgiver: "Bekk Consulting AS"
        }); 

        expect(getContentOfNode(teaser)).to.contain("Du er 100 % sykmeldt fra Bekk Consulting AS i 14 dager")
    });

    it("Contains a link (an <a> element", function () {
        const teaser = renderTeaser(SykmeldingTeaser, {
            fom: "2016-02-02T00:00:00Z",
            tom: "2016-02-16T00:00:00Z",
            grad: "100",
            arbeidsgiver: "Bekk Consulting AS"
        }); 
       const links = TestUtils.scryRenderedDOMComponentsWithTag(teaser, "a");
       expect(links.length).not.to.equal(0);
    });
})