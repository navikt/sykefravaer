import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Radiofaner from '../../../js/digisyfoNpm/components/Radiofaner';

chai.use(chaiEnzyme());

const { expect } = chai;

describe('Radiofaner', () => {
    let alternativer;

    beforeEach(() => {
        alternativer = [{
            tittel: 'Jeg har arbeidsgiver',
            verdi: 'MED_ARBEIDSGIVER',
        }, {
            tittel: 'Jeg har ikke arbeidsgiver',
            verdi: 'UTEN_ARBEIDSGIVER',
        }];
    });

    it('Skal rendre faner', () => {
        const component = shallow(<Radiofaner alternativer={alternativer} />);
        expect(component.find('li')).to.have.length(2);
    });

    it('Skal rendre radioknapper', () => {
        const component = shallow(<Radiofaner alternativer={alternativer} />);
        expect(component.find('input')).to.have.length(2);
    });

    it('Skal sette valgtAlternativ til valgt', () => {
        const component = mount(<Radiofaner alternativer={alternativer} valgtAlternativ="MED_ARBEIDSGIVER" />);
        expect(component.find('.js-MED_ARBEIDSGIVER')).to.be.checked();
        const component2 = mount(<Radiofaner alternativer={alternativer} valgtAlternativ="UTEN_ARBEIDSGIVER" />);
        expect(component2.find('.js-UTEN_ARBEIDSGIVER')).to.be.checked();
    });

    it('Skal kalle på changeHandler når man velger et alternativ', () => {
        const spy = sinon.spy();
        const component = mount(<Radiofaner
            alternativer={alternativer}
            valgtAlternativ="MED_ARBEIDSGIVER"
            changeHandler={spy} />);
        component.find('.js-UTEN_ARBEIDSGIVER').simulate('change');
        expect(spy.calledOnce).to.equal(true);
        expect(spy.getCall(0).args[0]).to.equal('UTEN_ARBEIDSGIVER');
    });
});
