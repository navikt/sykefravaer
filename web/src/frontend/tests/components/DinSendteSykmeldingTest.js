import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DinSendteSykmelding from "../../js/components/sykmelding/DinSendteSykmelding";
import DineSykmeldingOpplysninger from "../../js/components/sykmeldingOpplysninger/DineSykmeldingOpplysninger";
import StatusPanel from "../../js/components/StatusPanel";
import ArbeidsgiversSykmelding from "../../js/components/sykmelding/ArbeidsgiversSykmelding";
import FlereOpplysninger from "../../js/components/sykmeldingOpplysninger/FlereOpplysninger";

describe("DinSendteSykmelding", () => {

    let component;

    it("Skal vise kvittering ", () => {
        let dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        component = shallow(<DinSendteSykmelding sykmelding={dinSykmelding} ledetekster={ledetekster}/>);
        expect(component.find(StatusPanel)).to.have.length(1)
    });

    it("Skal vise DineSykmeldingOpplysninger ", () => {
        let dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        let arbeidsgiversSykmelding = {
            test: "olsen"
        };
        component = shallow(<DinSendteSykmelding dinSykmelding={dinSykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster}/>);
        expect(component.contains(<DineSykmeldingOpplysninger sykmelding={dinSykmelding} ledetekster={ledetekster} />)).to.be.true;
    });

    it("Skal vise arbedsgiveropplysninger dersom status er sendt", () => {
        let dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        let arbeidsgiversSykmelding = {
            test: "olsen"
        };
        component = shallow(<DinSendteSykmelding sykmelding={dinSykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster}/>);
        expect(component.contains(<ArbeidsgiversSykmelding sykmelding={arbeidsgiversSykmelding} ledetekster={ledetekster} />)).to.be.true;
    }); 

}); 