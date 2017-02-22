import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import getSykmelding from "../mockSykmeldinger";
import { ARBEIDSGIVER, INNSENDT_DATO, ORGNUMMER, STATUS } from '../../js/nokkelopplysninger/NokkelOpplysningerEnum';

chai.use(chaiEnzyme());
const expect = chai.expect;


import StatusOpplysning from '../../js/nokkelopplysninger/StatusOpplysning';
import { SykmeldingNokkelOpplysning } from "digisyfo-npm";



describe("NokkelOpplysningerMapper", () => {

    let component;

    it("En nøkkelopplysning som finnes i mappingen blir til et SykmeldingNokkelOpplysning - element", () => {
        component = mount(<StatusOpplysning sykmelding={getSykmelding()} ledetekster={ledetekster} nokkelopplysning={STATUS} />);
        expect(component.find(SykmeldingNokkelOpplysning)).to.have.length(1)
    });

    it("Ukjent nøkkelattributt vises ikke", () => {
        component = mount(<StatusOpplysning sykmelding={getSykmelding()} ledetekster={ledetekster} nokkelopplysning={'noe'} />);
        expect(component.find(SykmeldingNokkelOpplysning)).to.have.length(0)
    });
});