import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/ledetekster_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("ledetekster_actions", () => {

	it("Should have a henterLedetekster action that returns a proper function", () => {
		expect(actions.henterLedetekster()).to.deep.equal({
			type: 'HENTER_LEDETEKSTER'
		})
	});

	it("Should have a setLedetekster action that returns a proper function", () => {
		expect(actions.setLedetekster({tekst: "Min ledetekst"})).to.deep.equal({
			type: 'SET_LEDETEKSTER',
			ledetekster: {
				tekst: "Min ledetekst"
			}
		});
	});

	it("Should have a hentLedeteksterFeilet action that returns a proper function", () => {
		expect(actions.hentLedeteksterFeilet()).to.deep.equal({
			type: 'HENT_LEDETEKSTER_FEILET'
		})
	});	

	it("Should have a hentLedetekster funksjon som returnerer riktig action", () => {
		expect(actions.hentLedetekster()).to.deep.equal({
			type: 'HENT_LEDETEKSTER_FORESPURT'
		})
	});	

});