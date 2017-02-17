import { datoMedKlokkeslett } from '../../js/utils/datoUtils';
import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("datoUtils", () => {
   it("skal formattere dato", () => {
       const datotekst = datoMedKlokkeslett("2017-02-16T11:00:00");
       expect(datotekst).to.be.equal('16/2 klokken 11:00')
   });

    it("skal ikke krasje ved bad input", () => {
        let datotekst = datoMedKlokkeslett(undefined);
        expect(datotekst).to.be.equal("");

        datotekst = datoMedKlokkeslett(null);
        expect(datotekst).to.be.equal("");
    });
});