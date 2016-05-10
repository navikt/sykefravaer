import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/sykmeldinger_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("sykmeldinger_actions", () => {

	it("Should have a henterSykmeldinger function that returns a proper action", () => {
		expect(actions.henterSykmeldinger()).to.deep.equal({
			type: 'HENTER_SYKMELDINGER'
		})
	});

	it("Should have a setSykmeldinger function that returns a proper action", () => {
		expect(actions.setSykmeldinger([{tekst: "Min ledetekst"}])).to.deep.equal({
			type: 'SET_SYKMELDINGER',
			sykmeldinger: [{
				tekst: "Min ledetekst"
			}]
		});
	});

	it("Should have a hentSykmeldingerFeilet function that returns a proper action", () => {
		expect(actions.hentSykmeldingerFeilet()).to.deep.equal({
			type: 'HENT_SYKMELDINGER_FEILET'
		})
	});	

	it("Should have a hentSykmeldinger function that returns a function", () => {
		expect(typeof actions.hentSykmeldinger()).to.equal("function")
	});	
	
}); 