import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Lightbox from "../../js/components/Lightbox";

describe("Lightbox", () => {

    let component; 
    let onClose;

    beforeEach(() => {
        onClose = sinon.spy();
        component = shallow(<Lightbox onClose={onClose}><p>Innhold</p></Lightbox>)
    });

    it("Skal sette fokus på Lukk-knapp", () => {
        component = mount(<Lightbox onClose={onClose} />)
        expect(component.find(".js-lukk").node).to.equal(document.activeElement)
    });

    it("Skal sette erApen til true", () => {
        expect(component.state()).to.deep.equal({
            erApen: true
        })
    });

    it("Skal vise children", () => {
        expect(component.contains(<p>Innhold</p>)).to.be.true;
    });

    describe("Når man klikker på lukk", () => {
        
        beforeEach(() => {
            component.find(".js-lukk").simulate("click");
        });

        it("Skal sette erApen til false", () => {
            expect(component.state().erApen).to.be.false;
        });

        it("Skal kalle på onClose", () => {
            expect(onClose.calledOnce).to.be.true;
        });

        it("Skal ikke vise children", () => {
            expect(component.contains(<p>Innhold</p>)).to.be.false;
        })

    });

});