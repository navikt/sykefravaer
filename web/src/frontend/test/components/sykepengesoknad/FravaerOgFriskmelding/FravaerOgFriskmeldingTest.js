import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { FravaerOgFriskmeldingSkjema } from '../../../../js/components/sykepengesoknad/FravaerOgFriskmelding/FravaerOgFriskmelding';
import AvbrytSoknadContainer from '../../../../js/containers/sykepengesoknad/AvbrytSoknadContainer';
import { getSoknad } from '../../../mockSoknader'

describe("FravaerOgFriskmelding", () => {

	let component;
	let sykepengesoknad;

	beforeEach(() => {
		sykepengesoknad = getSoknad();
		component = shallow(<FravaerOgFriskmeldingSkjema handleSubmit={sinon.spy()} sykepengesoknad={sykepengesoknad} />);
	})

    it("Skal inneholde en AvbrytSoknadContainer", () => {
        expect(component.contains(<AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />)).to.be.true;
    });

});
