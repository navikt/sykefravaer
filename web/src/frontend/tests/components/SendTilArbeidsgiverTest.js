import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Utvidbar from "../../js/components/Utvidbar.js";
import FlereOpplysninger from "../../js/components/FlereOpplysninger.js";

import SendTilArbeidsgiver from "../../js/components/SendTilArbeidsgiver.js";
import VelgArbeidsgiverContainer from '../../js/containers/VelgArbeidsgiverContainer.js';
import ArbeidsgiversSykmelding from "../../js/components/ArbeidsgiversSykmelding.js";

let component;


describe("SendTilArbeidsgiver", () => {

    beforeEach(() => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>)
    })

    it("Skal vise ArbeidsgiversSykmelding", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(ArbeidsgiversSykmelding)).to.have.length(1)
    });

    it("Skal vise VelgArbeidsgiverContainer", () => {
        component = shallow(<SendTilArbeidsgiver sykmelding={getSykmelding()} ledetekster={ledetekster}/>);
        expect(component.find(VelgArbeidsgiverContainer)).to.have.length(1)
    });

});
