var expect = require("chai").expect;
import DineSykmeldinger from "../../js/containers/DineSykmeldinger.js";
import TestUtils from 'react-addons-test-utils'
import React from 'react'

function renderComponent (Component, props) {
	return TestUtils.renderIntoDocument(<Component {...props} />)
}

function getContentOfNode (component, className) {
	const node = TestUtils.findRenderedDOMComponentWithClass(component, className);
	return node.textContent;
}

let component; 

describe("DineSykmeldinger", () => {

	describe("When there are no sickleaves", () => {

		beforeEach(() => {
			component = renderComponent(DineSykmeldinger, {})
		});

		it("Should display a message", () => {
			expect(getContentOfNode(component, "js-nye-sykmeldinger")).to.equal("Du har ingen nye sykmeldinger.");
		});

	});

	describe("When there are sickleaves", () => {
		
		beforeEach(() => {
			component = renderComponent(DineSykmeldinger, {
				sykmeldinger: [{
				    id: 0,
				    fnr: "12",
				    fornavn: "Per",
				    etternavn: "Person",
				    arbeidsgiver: "Selskapet AS",
				    fom: "2015-12-31T00:00:00Z",
				    tom: "2016-01-06T00:00:00Z",
				    status: "UBEKREFTET"
				}]
			})
		});

		it("Should render those sickleaves", () => {
			expect(getContentOfNode(component, "js-nye-sykmeldinger")).to.contain("Sykmelding fra 31.12.2015 til 06.01.2016");
		});

	});

})
