import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";
import getSykmelding from "../mockSykmeldinger";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Utvidbar } from "digisyfo-npm";

import ArbeidsgiversSykmelding from '../../js/components/sykmelding/ArbeidsgiversSykmelding';
import { ArbeidsgiversSykmeldingOpplysninger } from 'digisyfo-npm';

let component;

describe("ArbeidsgiversSykmelding", () => {

    beforeEach(() => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    });

    it("Skal inneholde Utvidbar", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(Utvidbar)).to.have.length(1)
    });

    it("Skal inneholde ArbeidsgiversSykmeldingOpplysninger", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(ArbeidsgiversSykmeldingOpplysninger)).to.have.length(1)
    });

});
