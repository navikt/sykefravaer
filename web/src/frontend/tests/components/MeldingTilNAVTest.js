import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import MeldingTilNAV from "../../js/components/MeldingTilNAV.js";

let component;

const sykmelding = {
    id: 3456789,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31T00:00:00Z",
        tom: "2016-01-06T00:00:00Z",
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
};

const getSykmelding = (skmld = {}) => {
    return Object.assign({}, sykmelding, skmld);
}

describe("Melding til NAV", () => {

    describe("navBoerTaTakISaken", () => {
        it("Skal vise checkbox dersom sykmelding.navBoerTaTakISaken === true", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                navBoerTaTakISaken: true
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå")
        });

        it("Skal ikke vise navBoerTaTakISaken dersom den ikke finnes", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                navBoerTaTakISaken: null
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISaken").length).to.equal(0)
        });
    }); 

    describe("navBoerTaTakISaken med begrunnelse", () => {
        it("Skal vise checkbox og begrunnelse dersom sykmelding.navBoerTaTakISaken === true og navBoerTaTakISakenBegrunnelse = (noe)", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                navBoerTaTakISaken: true,
                navBoerTaTakISakenBegrunnelse: "Den sykmeldte trenger bistand fra NAV"
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISaken").text()).to.equal("NAV bør ta tak i saken nå")
            expect(component.find(".js-navBoerTaTakISakenBegrunnelse").text()).to.equal("Den sykmeldte trenger bistand fra NAV")
        });

        it("Skal ikke vise begrunnelse dersom den ikke finnes", () => {
            let component = mount(<MeldingTilNAV sykmelding={getSykmelding({
                navBoerTaTakISaken: true
            })} ledetekster={ledetekster} />);
            expect(component.find(".js-navBoerTaTakISakenBegrunnelse").length).to.equal(0)
        });
    });         


}); 