import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DinSendteSykmelding from "../../js/components/DinSendteSykmelding";
import DinSykmelding from "../../js/components/DinSykmelding";
import KvitteringPanel from "../../js/components/KvitteringPanel";
import ArbeidsgiversSykmelding from "../../js/components/ArbeidsgiversSykmelding";

describe("DinSendteSykmelding", () => {

    let component;

    it("Skal vise kvittering ", () => {
        let sykmelding = getSykmelding();
        sykmelding.status = 'SENDT';
        component = shallow(<DinSendteSykmelding sykmelding={sykmelding} ledetekster={ledetekster}/>);
        expect(component.find(KvitteringPanel)).to.have.length(1)
    });

    it("Skal vise DinSykmelding ", () => {
        let sykmelding = getSykmelding();
        sykmelding.status = 'SENDT';
        component = shallow(<DinSendteSykmelding sykmelding={sykmelding} ledetekster={ledetekster}/>);
        expect(component.find(DinSykmelding)).to.have.length(1)
    });

    it("Skal vise arbedsgiveropplysninger dersom status er sendt", () => {
        let sykmelding = getSykmelding();
        sykmelding.status = 'SENDT';
        component = shallow(<DinSendteSykmelding sykmelding={sykmelding} ledetekster={ledetekster}/>);
        expect(component.find(ArbeidsgiversSykmelding)).to.have.length(1)
    });

}); 