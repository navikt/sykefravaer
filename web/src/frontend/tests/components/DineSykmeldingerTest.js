import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import DineSykmeldinger from "../../js/components/DineSykmeldinger.js";
import SykmeldingTeasere from '../../js/components/SykmeldingTeasere.js';
import SykmeldingTeaser from '../../js/components/SykmeldingTeaser.js';

let component;

const sykmeldinger = [{
    id: 2,
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
}, {
    id: 1,
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
}, {
    id: 3,
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
}];

describe("Dine sykmeldinger", () => {

    let component; 

    beforeEach(() => {
        component = shallow(<DineSykmeldinger sykmeldinger={sykmeldinger} ledetekster={ledetekster} />);
    })

    it("Skal vise overskrift for 'Dine sykmeldinger'", () => {
        expect(component.find("h1").text()).to.equal("Dine sykmeldinger");
    });

    it("Skal vise introtekst", () => {
        expect(component.find(".js-intro").length).to.equal(1)
    });

    it("Skal rendre SykmeldingTeasere", () => {
        expect(component.find(SykmeldingTeasere)).to.have.length(1);
    });

    it("Skal rendre en forklaring", () => {
        expect(component.find(".js-forklaring")).to.have.length(1);
    })    

}); 