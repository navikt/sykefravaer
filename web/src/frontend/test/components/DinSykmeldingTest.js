import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import getSykmelding from "../mockSykmeldinger";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DinSykmelding from "../../js/components/sykmelding/DinSykmelding";
import DinSykmeldingSkjemaContainer from "../../js/containers/DinSykmeldingSkjemaContainer";
import { DineSykmeldingOpplysninger } from "digisyfo-npm";

import { Provider } from 'react-redux';

let component;

describe("DinSykmelding -", () => {

    it("Skal vise DineSykmeldingOpplysninger", () => {
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster} />)

        expect(component.find(DineSykmeldingOpplysninger)).to.have.length(1);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(1);

        expect(component.contains(<DineSykmeldingOpplysninger sykmelding={getSykmelding()} ledetekster={ledetekster} />)).to.be.true;
        expect(component.contains(<DinSykmeldingSkjemaContainer sykmeldingId={getSykmelding().id} />)).to.be.true;
    });

});