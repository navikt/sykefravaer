import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Datovelger from '../../../js/components/skjema/Datovelger';
import { PeriodevelgerComponent, Periode, StateConnectedPeriodevelger } from '../../../js/components/skjema/Periodevelger';
import { Field } from 'redux-form';

describe("Periodevelger", () => {

    let fields;

    beforeEach(() => {
        fields = [];
    })

    it("Skal legge til en periode dersom det ikke finnes noen perioder", () => {
        const push = sinon.spy();
        fields.push = push;

        const compo = shallow(<PeriodevelgerComponent fields={fields} />);
        expect(push.calledOnce).to.be.true;
        expect(push.calledWith({})).to.be.true;
    });

    it("Skal ikke legge til en periode dersom det ikke finnes noen perioder", () => {
        fields = [{}];
        const push = sinon.spy();
        fields.push = push;

        const compo = shallow(<PeriodevelgerComponent fields={fields} />);
        expect(push.calledOnce).to.be.false;
        expect(push.calledWith({})).to.be.false;
    });

    it("Skal inneholde en Periode per periode ", () => {
        fields = [{}, {}]
        const compo = shallow(<PeriodevelgerComponent fields={fields} />);
        expect(compo.find(Periode)).to.have.length(2);
    });

    describe("Periode", () => {

        it("Skal inneholde to datovelgere", () => {
            const compo = shallow(<Periode fields={fields} />);
            expect(compo.find(Datovelger)).to.have.length(2);
        });

    })

});