import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dineSykmeldinger_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("dineSykmeldinger_actions", () => {

	let store; 

	beforeEach(() => {
		window = window || {};
		window.SYFO_SETTINGS = {
			REST_ROOT: 'http://tjenester.nav.no/syforest'
		};
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

	it("Skal ha en hentDineSykmeldinger()-funksjon som returnerer riktig action", () => {
		expect(actions.hentDineSykmeldinger()).to.deep.equal({
			type: 'HENT_DINE_SYKMELDINGER_FORESPURT'
		});
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
	
}); 