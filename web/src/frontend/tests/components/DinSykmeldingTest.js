var expect = require("chai").expect;
import DinSykmelding from "../../js/components/DinSykmelding.js";
import TestUtils from 'react-addons-test-utils'
import React from 'react'

function getContentOfNode (component, className) {
	const node = TestUtils.findRenderedDOMComponentWithClass(component, className);
	return node.textContent;
}

let component; 
const sykmelding = {
	id: 3456789,
	fnr: "12",
	fornavn: "Per",
	etternavn: "Person",
	sykmelder: "Ove Olsen",
	arbeidsgiver: "Selskapet AS",
	fom: "2015-12-31T00:00:00Z",
	tom: "2016-01-06T00:00:00Z",
	diagnose: "Influensa",
	grad: 67,
	friskmeldt: 75
};

describe("DinSykmelding", () => {

	beforeEach(() => {
		component = TestUtils.renderIntoDocument(<DinSykmelding {...sykmelding} />); 
	});

	it("Should display the period based on the props", () => {
		expect(getContentOfNode(component, "js-periode")).to.contain("Fra og med 31.12.2015 til og med 06.01.2016");
	});

	it("Should display the GP based on on the props", () => {
		expect(getContentOfNode(component, "js-avsender")).to.contain("Ove Olsen");
	});

	it("Should display the name of the employer", () => {
		expect(getContentOfNode(component, "js-arbeidsgiver")).to.contain("Selskapet AS");
	});

	it("Should display the current diagnosis", () => {
		expect(getContentOfNode(component, "js-diagnose")).to.equal("Influensa")
	});

	it("Should display the expected employable grad", () => {
		expect(getContentOfNode(component, "js-friskmeldt")).to.equal("75 % arbeidsfør etter perioden")
	});	


});
