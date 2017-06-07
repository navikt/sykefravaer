import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actions from '../../js/actions/forskutteringssporsmal_actions'
import forskutteringssporsmal from '../../js/reducers/forskutteringssporsmal';

describe("forskutteringssporsmal", () => {

	let state = {}

	it("Håndterer sjekkerSkalViseForskutteringssporsmal()", () => {
		const action = actions.sjekkerSkalViseForskutteringssporsmal();
		state = forskutteringssporsmal(state, action);
		expect(state).to.deep.equal({
			henter: true,
			hentingFeilet: false,
			visSporsmal: false,
		});
	});

	it("Håndterer skalViseForskutteringssporsmalSjekket(true)", () => {
		const action = actions.skalViseForskutteringssporsmalSjekket(true);
		state = forskutteringssporsmal(state, action);
		expect(state).to.deep.equal({
			henter: false,
			hentingFeilet: false,
			visSporsmal: true,
		})
	});

	it("Håndterer skalViseForskutteringssporsmalSjekket(false)", () => {
		const action = actions.skalViseForskutteringssporsmalSjekket(false);
		state = forskutteringssporsmal(state, action);
		expect(state).to.deep.equal({
			henter: false,
			visSporsmal: false,
			hentingFeilet: false,
		})
	});

	it("Håndterer sjekkSkalViseForskutteringssporsmalFeilet", () => {
		const action = actions.sjekkSkalViseForskutteringssporsmalFeilet();
		state = forskutteringssporsmal(state, action);
		expect(state).to.deep.equal({
			henter: false,
			visSporsmal: true,
			hentingFeilet: true,
		})
	});

});