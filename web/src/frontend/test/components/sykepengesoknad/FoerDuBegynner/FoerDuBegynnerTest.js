import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { FoerDuBegynnerSkjema } from '../../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import AvbrytSoknadContainer from '../../../../js/containers/sykepengesoknad/AvbrytSoknadContainer';
import { getSoknad } from '../../../mockSoknader'

describe("FoerDuBegynner", () => {

	let component;
	let sykepengesoknad;

	beforeEach(() => {
		sykepengesoknad = getSoknad();
		component = shallow(<FoerDuBegynnerSkjema handleSubmit={sinon.spy()} sykepengesoknad={sykepengesoknad} />);
	})

    it("Skal inneholde en AvbrytSoknadContainer", () => {
        expect(component.contains(<AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />)).to.be.true;
    });

});
