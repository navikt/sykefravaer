import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';

chai.use(chaiEnzyme());
const expect = chai.expect;

import DetteHarSkjedd from '../../../js/components/landingsside/DetteHarSkjedd'

describe("DetteHarSkjedd", () => {

	let hendelser;

	beforeEach(() => {
		setLedetekster({
			'sykefravaer.dette-har-skjedd.tittel': "Aktivitetsplikt"
		})
		hendelser = [
			{"id":68929,"inntruffetdato":new Date("2017-09-18"),"type":"AKTIVITETSKRAV_VARSEL","ressursId":null},
			{"id":66306,"inntruffetdato":new Date("2017-08-02"),"type":"NY_NAERMESTE_LEDER","ressursId":null},
			{"id":68931,"inntruffetdato":new Date("2017-09-18"),"type":"AKTIVITETSKRAV_BEKREFTET","ressursId":"68929"}]
	});

	it("Skal vise tittel", () => {
		const component = mount(<DetteHarSkjedd hendelser={hendelser} />);
		expect(component.text()).to.contain("Aktivitetsplikt");
	});

	it("Skal vise et liste-element per hendelse", () => {
		const component = mount(<DetteHarSkjedd hendelser={hendelser} />);
		expect(component.find(".js-hendelse")).to.have.length(3);
	});

});