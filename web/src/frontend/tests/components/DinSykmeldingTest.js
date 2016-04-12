import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DinSykmelding from "../../js/components/DinSykmelding.js";

let component;

const sykmelding = {
    id: 3456789,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    fom: "2015-12-31T00:00:00Z",
    tom: "2016-01-06T00:00:00Z",
    diagnose: "Influensa",
    grad: 67,
    friskmeldt: 75
};

describe("DinSykmelding", () => {

    beforeEach(() => {
        component = shallow(<DinSykmelding sykmelding={sykmelding} ledetekster={ledetekster}/>);
    })

    it("Should display the period based on the props", () => {
        expect(component.find(".js-periode")).to.contain("31.12.2015");
        expect(component.find(".js-periode")).to.contain("06.01.2016");
    });

    it("Should display the GP based on on the props", () => {
        expect(component.find(".js-avsender")).to.contain("Ove Olsen");
    });

    it("Should display the name of the employer", () => {
        expect(component.find(".js-arbeidsgiver")).to.contain("Selskapet AS");
    });

    it("Should display the current diagnosis", () => {
        expect(component.find(".js-diagnose")).to.contain("Influensa")
    });

    it("Should display the expected employable grad", () => {
        expect(component.find(".js-friskmeldt").text()).to.contain("75 % arbeidsfør etter perioden")
    });

});
