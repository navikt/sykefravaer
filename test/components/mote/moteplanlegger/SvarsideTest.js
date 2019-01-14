import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Svarside from '../../../../js/components/moter/moteplanlegger/Svarside';
import Svarskjema from '../../../../js/components/moter/moteplanlegger/Svarskjema';
import { moteIkkeBesvart } from '../../../mock/mockMote';

describe('Svarside', () => {
    it('Skal vise riktig introtekst når deltakertype === undefined', () => {
        const component = shallow(<Svarside mote={moteIkkeBesvart} />);
        expect(component.find('.js-intro')).to.be.length(1);
    });

    it('Skal vise riktig introtekst når deltakertype === "arbeidsgiver"', () => {
        const component = shallow(<Svarside
            deltakertype="arbeidsgiver"
            mote={moteIkkeBesvart}
        />);
        expect(component.find('.js-intro')).to.be.length(1);
    });

    it('Skal inneholde et Svarskjema', () => {
        const component = shallow(<Svarside mote={moteIkkeBesvart} />);
        expect(component.find(Svarskjema)).to.have.length(1);
    });

    it('Skal sette Bruker som standard deltakertype i Svarskjema', () => {
        const component = shallow(<Svarside mote={moteIkkeBesvart} />);
        expect(component.find(Svarskjema).prop('deltakertype')).to.equal('Bruker');
    });

    it('Skal sende innsendt deltakertype videre til Svarskjema', () => {
        const component = shallow(<Svarside
            mote={moteIkkeBesvart}
            deltakertype="fiskekake"
        />);
        expect(component.find(Svarskjema).prop('deltakertype')).to.equal('fiskekake');
    });
});
