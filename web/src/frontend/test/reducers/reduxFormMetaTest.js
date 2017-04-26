import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import { sendSkjemaFeilet, sendSkjemaFeiletHandtert, skjemaErGyldig } from '../../js/actions/reduxFormMeta_actions'
import reduxFormMeta from '../../js/reducers/reduxFormMeta';

describe("reduxFormMeta", () => {

	it("Returnerer et tomt objekt by default", () => {
		expect(reduxFormMeta()).to.deep.equal({});
	});

	it("Håndterer sendSkjemaFeilet", () => {
		const action = sendSkjemaFeilet("SYKEPENGER");
		expect(reduxFormMeta(deepFreeze({}), action)).to.deep.equal({
			"SYKEPENGER": {
				status: "SEND_SKJEMA_FEILET",
				settFokus: true,
			}
		});
	});

	it("Håndterer sendSkjemaFeiletHandtert", () => {
		const action = sendSkjemaFeiletHandtert("SYKEPENGER");
		expect(reduxFormMeta(deepFreeze({}), action)).to.deep.equal({
			"SYKEPENGER": {
				status: 'SEND_SKJEMA_FEILET',
				settFokus: false,
			}
		});
	});

	it("Håndterer skjemaErGyldig etter sendSkjemaFeiletHandtert", () => {
		const action1 = sendSkjemaFeiletHandtert("SYKEPENGER");
		const action2 = skjemaErGyldig("SYKEPENGER");
		const state1 = reduxFormMeta(deepFreeze({}), action1);
		const state2 = reduxFormMeta(deepFreeze(state1), action2);
		expect(state2).to.deep.equal({
			"SYKEPENGER": {}
		});
	});

	it("Håndterer sendSkjemaFeiletHandtert() etter sendSkjemaFeilet() for annet skjema", () => {
		const action1 = sendSkjemaFeilet("SYKEPENGER");
		const action2 = sendSkjemaFeilet("SYKMELDING");
		const action3 = sendSkjemaFeiletHandtert("SYKEPENGER");
		const state1 = reduxFormMeta(deepFreeze({}), action1);
		const state2 = reduxFormMeta(deepFreeze(state1), action2);
		const state3 = reduxFormMeta(deepFreeze(state2), action3);
		expect(state3).to.deep.equal({
			"SYKEPENGER": {
				status: 'SEND_SKJEMA_FEILET',
				settFokus: false,
			}, 
			"SYKMELDING": {
				status: "SEND_SKJEMA_FEILET",
				settFokus: true,
			}
		});
	});

});