import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import getSykmelding from "../mockSykmeldinger";
import StatusOpplysning from '../../js/nokkelopplysninger/StatusOpplysning';
import { Hjelpetekst } from 'digisyfo-npm'
chai.use(chaiEnzyme());
const expect = chai.expect;

describe("StatusOpplysning", () => {
   it("Skal vise hjelpetekst for status === TIL_SENDING", () => {
       const comp = mount(<StatusOpplysning ledetekster={{}} nokkelopplysning='STATUS' sykmelding={getSykmelding({status: 'TIL_SENDING'})} />);
       expect(comp.find(Hjelpetekst)).to.have.length(1);
   });

    it("Skal ikke vise hjelpetekst for status !== TIL_SENDING", () => {
        const comp = mount(<StatusOpplysning ledetekster={{}} nokkelopplysning='STATUS' sykmelding={getSykmelding({status: 'NY'})} />);
        expect(comp.find(Hjelpetekst)).to.have.length(0);
    });
});
