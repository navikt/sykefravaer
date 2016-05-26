import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/sykmeldinger_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("sykmeldinger_actions", () => {

	it("Skal ha en henterSykmeldinger()-funksjon som returnerer riktig action", () => {
		expect(actions.henterSykmeldinger()).to.deep.equal({
			type: 'HENTER_SYKMELDINGER'
		})
	});

	it("Skal ha en setSykmeldinger()-funksjon som returnerer riktig action", () => {
		expect(actions.setSykmeldinger([{tekst: "Min ledetekst"}])).to.deep.equal({
			type: 'SET_SYKMELDINGER',
			sykmeldinger: [{
				tekst: "Min ledetekst"
			}]
		});
	});

	it("Skal ha en hentSykmeldingerFeilet()-funksjon som returnerer riktig action", () => {
		expect(actions.hentSykmeldingerFeilet()).to.deep.equal({
			type: 'HENT_SYKMELDINGER_FEILET'
		})
	});	

	it("Skal ha en hentSykmeldinger()-funksjon som returnerer en funksjon", () => {
		expect(typeof actions.hentSykmeldinger()).to.equal("function")
	});	
	
}); 