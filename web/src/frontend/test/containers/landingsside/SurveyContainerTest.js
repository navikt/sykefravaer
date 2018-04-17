import chai from 'chai';
import React from 'react'
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Survey from "../../../js/components/landingsside/Survey";
import { Container } from "../../../js/containers/landingsside/SurveyContainer";

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SurveyContainer', () => {

    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2018-04-01').getTime());
    });

    it('Skal vise survey hvis sykeperioden startet for minst 2 uker siden', () => {
        const container = shallow(<Container startdato={new Date('2018-03-17')} />);
        expect(container.find(Survey)).to.have.length(1);
    });

    it('Skal ikke vise survey hvis sykeperioden startet for mindre enn 2 uker siden', () => {
        const container = shallow(<Container startdato={new Date('2018-03-19')} />);
        expect(container.find(Survey)).to.have.length(0);
    });

    afterEach(() => {
        clock.restore();
    });

});