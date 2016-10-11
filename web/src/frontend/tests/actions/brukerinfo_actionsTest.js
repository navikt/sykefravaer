import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/brukerinfo_actions.js';
import sinon from 'sinon';
import * as utils from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("brukerinfo_actions", () => {

	beforeEach(() => {
		window.localStorage = {
			setItem: (item, value) => {
				return
			}
		}

		sinon.spy(window.localStorage, "setItem")
	});

	describe("skjulUnderUtviklingVarsel", () => {

		it("SKal ha en skjulUnderUtviklingVarsel()-funksjon som returnerer riktig action", () => {
			expect(actions.skjulUnderUtviklingVarsel()).to.deep.equal({
				type: "SKJUL_UNDER_UTVIKLING_VARSEL"
			});
		});

		it("Skal kalle på window.localStorage.setItem med riktige parametre", () => {
			actions.skjulUnderUtviklingVarsel(); 
			expect(window.localStorage.setItem.getCall(0).args[0]).to.equal("skjulUnderUtviklingVarsel");
			expect(window.localStorage.setItem.getCall(0).args[1]).to.equal(true);
		});

	});

	it("Skal ha en hentBrukerinfo()-funksjon som returnerer riktig action", () => {
		expect(actions.henterBrukerinfo()).to.deep.equal({
			type: 'HENTER_BRUKERINFO'
		});
	});		

	it("Skal ha en hentBrukerinfo()-funksjon", () => {
		expect(typeof actions.hentBrukerinfo).to.equal("function");
	});

	it("Skal ha en hentBrukerinfoFeilet()-function som returnerer riktig action", () => {
		expect(actions.hentBrukerinfoFeilet()).to.deep.equal({
			type: 'HENT_BRUKERINFO_FEILET',
		})
	});

	it("Skal ha en setBrukerinfo()-funksjon som returnerer riktig action", () => {
		expect(actions.setBrukerinfo({
			navn: "Helge",
			alder: 32
		})).to.deep.equal({
			type: "SET_BRUKERINFO", 
			data: {
				navn: "Helge",
				alder: 32	
			}
		});

		expect(actions.setBrukerinfo()).to.deep.equal({
			type: "SET_BRUKERINFO",
			data: {}
		});
	});

	it("Skal ha en setArbeidssituasjon()-funksjon som returnerer riktig action()", () => {
		expect(actions.setArbeidssituasjon("MED_ARBEIDSGIVER")).to.deep.equal({
			type: "SET_TIDSLINJE_ARBEIDSSITUASJON",
			arbeidssituasjon: "MED_ARBEIDSGIVER"
		})
	});

	it("Skal ha en sjekkInnlogging()-funksjon som returnerer riktig action", () => {
		expect(typeof actions.sjekkInnlogging()).to.equal("function")
	});

});