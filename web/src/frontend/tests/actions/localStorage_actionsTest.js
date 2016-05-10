import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/localStorage_actions.js';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("localStorage_actions", () => {

	beforeEach(() => {
		window.localStorage = {
			setItem: (item, value) => {
				return
			}
		}

		sinon.spy(window.localStorage, "setItem")
	});

	it("Should have a skjulUnderUtviklingVarsel() function that returns a proper action", () => {
		expect(actions.skjulUnderUtviklingVarsel()).to.deep.equal({
			type: "SKJUL_UNDER_UTVIKLING_VARSEL"
		});
	});

	it("Should call window.localStorage.setItem with the right parameters", () => {
		actions.skjulUnderUtviklingVarsel(); 
		expect(window.localStorage.setItem.getCall(0).args[0]).to.equal("skjulUnderUtviklingVarsel");
		expect(window.localStorage.setItem.getCall(0).args[1]).to.equal(true);
	});

});