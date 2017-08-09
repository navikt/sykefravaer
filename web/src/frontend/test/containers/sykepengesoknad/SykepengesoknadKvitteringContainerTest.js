import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Controller, mapStateToProps } from '../../../js/containers/sykepengesoknad/SykepengesoknadKvitteringContainer';
import { Standardkvittering } from '../../../js/components/sykmelding/SykmeldingKvittering';
import { getSoknad } from '../../mockSoknader';
import Feilmelding from '../../../js/components/Feilmelding';

describe("SykepengesoknadKvitteringContainer", () => {

	let component; 
	let sykepengesoknad;

	it("Skal vise Standardkvittering hvis søknaden er avbrutt", () => {
		sykepengesoknad = getSoknad({
			status: "AVBRUTT",
		});
		component = shallow(<Controller sykepengesoknad={sykepengesoknad} />);
		expect(component.find(Standardkvittering)).to.have.length(1);
	});

	it("Skal vise Feilmelding hvis søknad ikke er avbrutt", () => {
		sykepengesoknad = getSoknad();
		component = shallow(<Controller sykepengesoknad={sykepengesoknad} />);
		expect(component.find(Feilmelding)).to.have.length(1);
	})

});