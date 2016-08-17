import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Utvidbar from "../../js/components/Utvidbar.js";
import FlereOpplysninger from "../../js/components/sykmeldingOpplysninger/FlereOpplysninger.js";

import SykmeldingPerioder from "../../js/components/sykmeldingOpplysninger/SykmeldingPerioder.js";
import ArbeidsgiversSykmelding from '../../js/components/sykmelding/ArbeidsgiversSykmelding.js';
import ArbeidsgiversSykmeldingOpplysninger from '../../js/components/sykmeldingOpplysninger/ArbeidsgiversSykmeldingOpplysninger.js';

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
