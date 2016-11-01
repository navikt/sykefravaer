import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../ledetekster_mock';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import AvbrytDialog from "../../js/components/sykmelding/AvbrytDialog";

describe("AvbrytDialog", () => { 

    let avbrytHandler;
    let bekreftHandler;

    beforeEach(() => {
        avbrytHandler = sinon.spy();
        bekreftHandler = sinon.spy();;
    });

    it("Skal vise en knapp", () => {
        const component = mount(<AvbrytDialog ledetekster={ledetekster} avbrytHandler={avbrytHandler} bekreftHandler={bekreftHandler} />);
        expect(component.find("button")).to.have.length(1);
    });

    it("Skal kalle bekreftHandler når man klikker på knappen", () => {
        const component = mount(<AvbrytDialog ledetekster={ledetekster} avbrytHandler={avbrytHandler} bekreftHandler={bekreftHandler} />);
        component.find(".js-bekreft").simulate("click");
        expect(bekreftHandler.calledOnce).to.equal(true);
        expect(avbrytHandler.calledOnce).to.equal(false);
    });

    it("Skal kalle avbrytHandler når man klikker på avbryt", () => {
        const component = mount(<AvbrytDialog ledetekster={ledetekster} avbrytHandler={avbrytHandler} bekreftHandler={bekreftHandler} />);
        component.find(".js-avbryt").simulate("click");
        expect(bekreftHandler.calledOnce).to.equal(false);
        expect(avbrytHandler.calledOnce).to.equal(true);
    });

});