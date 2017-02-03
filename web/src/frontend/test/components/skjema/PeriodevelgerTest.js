import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';


chai.use(chaiEnzyme());
const expect = chai.expect;

import Datovelger from '../../../js/components/skjema/Datovelger';
import { Periodevelger } from '../../../js/components/skjema/Periodevelger';

describe("Periodevelger", () => {

    let fields;

    beforeEach(() => {
        fields = [];
    })

    it("Skal legge til en periode dersom det ikke finnes noen perioder", () => {
        const push = sinon.spy();
        fields.push = push;

        const compo = shallow(<Periodevelger fields={fields} />);
        expect(push.calledOnce).to.be.true;
        expect(push.calledWith({})).to.be.true;
    });

    it("Skal ikke legge til en periode dersom det ikke finnes noen perioder", () => {
        fields = [{}];
        const push = sinon.spy();
        fields.push = push;

        const compo = shallow(<Periodevelger fields={fields} />);
        expect(push.calledOnce).to.be.false;
        expect(push.calledWith({})).to.be.false;
    });

    it("Skal inneholde to datovelgere", () => {
        const compo = shallow(<Periodevelger fields={fields} />);
        expect(compo.find(Datovelger)).to.have.length(2);
    });

});