import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import getSykmelding from "../../mockSykmeldinger";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { Utvidbar } from "digisyfo-npm";

import ArbeidsgiversSykmelding from '../../../js/components/sykmelding/ArbeidsgiversSykmelding';
import { ArbeidsgiversSykmeldingOpplysninger, setLedetekster } from 'digisyfo-npm';

let component;

describe("ArbeidsgiversSykmelding", () => {

    beforeEach(() => {
        setLedetekster(ledetekster);
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} />)
    });

    it("Skal inneholde Utvidbar", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} />);
        expect(component.find(Utvidbar)).to.have.length(1)
    });

    it("Skal inneholde ArbeidsgiversSykmeldingOpplysninger", () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} />);
        expect(component.find(ArbeidsgiversSykmeldingOpplysninger)).to.have.length(1)
    });

});
