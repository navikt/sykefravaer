import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import {FoerDuBegynnerSkjema, TidligSoknad} from '../../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner';
import AvbrytSoknadContainer from '../../../../js/containers/sykepengesoknad/AvbrytSoknadContainer';
import { getSoknad } from '../../../mockSoknader'
import FoerDuBegynner from "../../../../js/components/sykepengesoknad/FoerDuBegynner/FoerDuBegynner";

describe("FoerDuBegynner", () => {

	let component;
	let sykepengesoknad;

	beforeEach(() => {
		sykepengesoknad = getSoknad();
		component = shallow(<FoerDuBegynnerSkjema handleSubmit={sinon.spy()} sykepengesoknad={sykepengesoknad} />);
	});

    it("Skal inneholde en AvbrytSoknadContainer", () => {
        expect(component.contains(<AvbrytSoknadContainer sykepengesoknad={sykepengesoknad} />)).to.be.true;
    });

});

describe("TidligSoknad", () => {

	let component;
	let sykepengesoknad;

	beforeEach(() => {
		sykepengesoknad = getSoknad();
	});

    it("Skal inneholde en TidligSoknad", () => {
        sykepengesoknad.status = 'NY';
        sykepengesoknad.tom = new Date().setDate(new Date().getDate() + 1);
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.be.true;
    });

    it("Skal ikke inneholde en TidligSoknad - Ikke tidlig", () => {
        sykepengesoknad.status = 'NY';
        sykepengesoknad.tom = new Date();
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.be.false;
    });

    it("Skal ikke inneholde en TidligSoknad - Ikke NY søknad", () => {
        sykepengesoknad.status = 'SENDT';
        sykepengesoknad.tom = new Date().setDate(new Date().getDate() + 1);
        component = shallow(<FoerDuBegynner sykepengesoknad={sykepengesoknad} />);
        expect(component.contains(<TidligSoknad />)).to.be.false;
    });
});
