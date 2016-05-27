import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/sykmeldinger_actions.js';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

chai.use(chaiEnzyme());
const expect = chai.expect;
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

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

	describe("hentSykmeldinger()", () => {

		let store; 

		beforeEach(() => {
			store = mockStore();
			window = window || {};
			window.SYFO_SETTINGS = {
				REST_ROOT: 'http://tjenester.nav.no/syforest'
			}
		});

		afterEach(() => {
			nock.cleanAll();
		});

		it("Kaller på SET_SYKMELDINGER når hentSykmeldinger() er fullført", () => {
			nock('http://tjenester.nav.no/syforest/')
			.get("/sykmeldinger")
			.reply(200, [{
				"id": 1
			}])

			const expectedActions = [
				{ type: "HENTER_SYKMELDINGER"}, 
				{ type: "SET_SYKMELDINGER", sykmeldinger: [{
					"id": 1
				}] }
			]

			return store.dispatch(actions.hentSykmeldinger())
				.then(() => { 
					expect(store.getActions()).to.deep.equal(expectedActions)
				});

		});			

	}); 
	
}); 