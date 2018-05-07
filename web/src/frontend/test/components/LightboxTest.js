import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Lightbox from '../../js/components/Lightbox';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Lightbox', () => {
    let component;
    let onClose;

    beforeEach(() => {
        onClose = sinon.spy();
        component = mount(<Lightbox onClose={onClose}><p>Innhold</p></Lightbox>);
    });

    it('Skal sette fokus på Lukk-knapp', () => {
        component = mount(<Lightbox onClose={onClose} />);
        expect(document.activeElement.className).to.contain('js-lukk');
    });

    it('Skal sette erApen til true', () => {
        expect(component.state()).to.deep.equal({
            erApen: true,
        });
    });

    it('Skal vise children', () => {
        expect(component.contains(<p>Innhold</p>)).to.equal(true);
    });

    describe('Når man klikker på lukk', () => {
        beforeEach(() => {
            component.find('.js-lukk').simulate('click');
        });

        it('Skal sette erApen til false', () => {
            expect(component.state().erApen).to.equal(false);
        });

        it('Skal kalle på onClose', () => {
            expect(onClose.calledOnce).to.equal(true);
        });

        it('Skal ikke vise children', () => {
            expect(component.contains(<p>Innhold</p>)).to.equal(false);
        });
    });
});
