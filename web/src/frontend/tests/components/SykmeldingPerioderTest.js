import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";


chai.use(chaiEnzyme());
const expect = chai.expect;
import SykmeldingPeriode from "../../js/components/SykmeldingPeriode.js";
import SykmeldingPerioder from "../../js/components/SykmeldingPerioder.js";

describe("SykmeldingPerioder", () => {

    it("Viser ingen perioder dersom man ikke har noen perioder", function () {
        const component = shallow(<SykmeldingPerioder perioder={[]} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPeriode)).to.have.length(0);
    }); 

    it("Viser en periode per periode dersom man har perioder", function () {
        const perioder = [{}, {}, {}];
        const component = shallow(<SykmeldingPerioder perioder={perioder} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPeriode)).to.have.length(3);
    }); 

});