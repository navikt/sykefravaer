import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dineSykmeldinger_actions.js';
import sinon from 'sinon';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

chai.use(chaiEnzyme());
const expect = chai.expect;
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("dineSykmeldinger_actions", () => {

	let store; 

	beforeEach(() => {
		store = mockStore();
		window = window || {};
		window.SYFO_SETTINGS = {
			REST_ROOT: 'http://tjenester.nav.no/syforest'
		};
	});

	afterEach(() => {
		nock.cleanAll();
	});	

	it("Skal ha en henterDineSykmeldinger()-funksjon som returnerer riktig action", () => {
		expect(actions.henterDineSykmeldinger()).to.deep.equal({
			type: 'HENTER_DINE_SYKMELDINGER'
		})
	});

	it("Skal ha en setDineSykmeldinger()-funksjon som returnerer riktig action", () => {
		expect(actions.setDineSykmeldinger([{id: 12345, navn: "Helge"}])).to.deep.equal({
			type: 'SET_DINE_SYKMELDINGER',
			sykmeldinger: [{
				id: 12345, navn: "Helge"
			}]
		});
	});

	it("Skal ha en hentDineSykmeldingerFeilet()-funksjon som returnerer riktig action", () => {
		expect(actions.hentDineSykmeldingerFeilet()).to.deep.equal({
			type: 'HENT_DINE_SYKMELDINGER_FEILET'
		})
	});	

	it("Skal ha en hentDineSykmeldinger()-funksjon som returnerer en funksjon", () => {
		expect(typeof actions.hentDineSykmeldinger()).to.equal("function")
	});

	it("Skal ha en sorterSykmeldinger()-funksjon som returnerer riktig action", () => {
		const res = actions.sorterSykmeldinger("arbeidsgiver", "tidligere");
		expect(res).to.deep.equal({
			type: "SET_SORTERING",
			kriterium: "arbeidsgiver",
			status: "tidligere",
		});

		const res2 = actions.sorterSykmeldinger("arbeidsgiver", "nye");
		expect(res2).to.deep.equal({
			type: "SET_SORTERING",
			kriterium: "arbeidsgiver",
			status: "nye",
		});
	})

	describe("hentDineSykmeldinger()", () => {

		it("Kaller på SET_DINE_SYKMELDINGER når hentDineSykmeldinger() er fullført", () => {
			nock('http://tjenester.nav.no/syforest/')
			.get("/sykmeldinger")
			.reply(200, [{
				"id": 1
			}])

			const expectedActions = [
				{ type: "HENTER_DINE_SYKMELDINGER"}, 
				{ type: "SET_DINE_SYKMELDINGER", sykmeldinger: [{
					"id": 1
				}]}
			]

			return store.dispatch(actions.hentDineSykmeldinger())
				.then(() => { 
					expect(store.getActions()).to.deep.equal(expectedActions)
				});

		});

	}); 
	
}); 