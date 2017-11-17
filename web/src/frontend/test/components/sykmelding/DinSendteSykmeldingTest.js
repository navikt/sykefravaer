import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import getSykmelding from "../../mockSykmeldinger";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DinSendteSykmelding from "../../../js/components/sykmelding/DinSendteSykmelding";
import { DineSykmeldingOpplysninger } from "digisyfo-npm";
import StatusPanel from "../../../js/components/StatusPanel";
import ArbeidsgiversSykmeldingContainer from "../../../js/containers/sykmelding/ArbeidsgiversSykmeldingContainer";
import { setLedetekster } from 'digisyfo-npm';

describe("DinSendteSykmelding", () => {

    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
    })

    it("Skal vise kvittering ", () => {
        let dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        component = shallow(<DinSendteSykmelding dinSykmelding={dinSykmelding} />);
        expect(component.find(StatusPanel)).to.have.length(1)
    });

    it("Skal vise DineSykmeldingOpplysninger ", () => {
        let dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        let arbeidsgiversSykmelding = {
            id: "arbeidsgivers-sykmelding-id",
            test: "olsen"
        };
        component = shallow(<DinSendteSykmelding dinSykmelding={dinSykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding}/>);
        expect(component.contains(<DineSykmeldingOpplysninger sykmelding={dinSykmelding} />)).to.be.true;
    });

    it("Skal vise ArbeidsgiversSykmeldingContainer", () => {
        let dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        let arbeidsgiversSykmelding = {
            id: "arbeidsgivers-sykmelding-id",
            test: "olsen"
        };
        component = shallow(<DinSendteSykmelding dinSykmelding={dinSykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding}/>);
        expect(component.contains(<ArbeidsgiversSykmeldingContainer sykmeldingId={dinSykmelding.id} />)).to.be.true;
    }); 

}); 