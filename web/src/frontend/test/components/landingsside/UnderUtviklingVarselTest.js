import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());
const expect = chai.expect;

import UnderUtviklingVarsel from "../../../js/components/landingsside/UnderUtviklingVarsel";
import { Varselstripe } from "digisyfo-npm";
import ledetekster from "../../ledetekster_mock";

describe("UnderUtviklingVarsel", () => {

    let clock;
    let skjulUnderUtviklingVarsel;

    beforeEach(() => {
        skjulUnderUtviklingVarsel = sinon.spy();
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        clock.restore();
    });

    it("Skal inneholde en Varselstripe", () => {
        const component = shallow(<UnderUtviklingVarsel skjulUnderUtviklingVarsel={skjulUnderUtviklingVarsel} ledetekster={ledetekster} />)
        expect(component.find(Varselstripe)).to.have.length(1);
    });

    it("Skal kalle på skjulUnderUtviklingVarsel når man klikker på js-lukk", () => {
        const component = shallow(<UnderUtviklingVarsel skjulUnderUtviklingVarsel={skjulUnderUtviklingVarsel} ledetekster={ledetekster} />);
        component.find(".js-lukk").simulate("click");
        expect(skjulUnderUtviklingVarsel.calledOnce).to.be.true;
    });

    it("Skal sette erSynlig = true etter 200 ms", () => {
        const component = shallow(<UnderUtviklingVarsel skjulUnderUtviklingVarsel={skjulUnderUtviklingVarsel} ledetekster={ledetekster} />);
        expect(component.state().synlig).to.be.false;
        clock.tick(199);
        expect(component.state().synlig).to.be.false;
        clock.tick(1);
        expect(component.state().synlig).to.be.true;
        clock.tick(2000);
        expect(component.state().synlig).to.be.true;
    }); 

})
