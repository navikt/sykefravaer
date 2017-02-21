import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Datovelger from '../../../js/components/skjema/Datovelger';
import { Periodevelger, Periode } from '../../../js/components/skjema/Periodevelger';
import { FieldArray } from 'redux-form';

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

    it("Skal inneholde et FieldArray med component = Periode ", () => {
        const compo = shallow(<Periodevelger fields={fields} />);
        expect(compo.find(FieldArray)).to.have.length(1);
        expect(compo.find(FieldArray).prop("component")).to.deep.equal(Periode);
    });

    describe("Periode", () => {

        it("Skal inneholde to datovelgere", () => {
            const compo = shallow(<Periode fields={fields} />);
            expect(compo.find(Datovelger)).to.have.length(2);
        });

    })

});