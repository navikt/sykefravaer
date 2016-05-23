import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;
import ledetekster from "../ledetekster_mock.js";
import SykmeldingTeaser from "../../js/components/SykmeldingTeaser.js";
import SykmeldingTeasere from "../../js/components/SykmeldingTeasere.js";
import SykmeldingerSorteringContainer from "../../js/containers/SykmeldingerSorteringContainer.js";

const sykmeldinger = [{
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

describe("SykmeldingTeasere", () => {

    it("Viser en header", () => {
        const component = shallow(<SykmeldingTeasere tittel="Mine sykmeldinger" sykmeldinger={sykmeldinger} ledetekster={ledetekster}/>);
        expect(component.find("header")).to.have.length(1);
        expect(component.find("header").text()).to.contain("Mine sykmeldinger")
    });

    it("Viser sortering", () => {
        const component = shallow(<SykmeldingTeasere tittel="Mine sykmeldinger" sykmeldinger={sykmeldinger} ledetekster={ledetekster}/>);
        expect(component.contains(<SykmeldingerSorteringContainer />)).to.equal(true);
    }); 

    it("Viser en SykmeldingTeaser per sykmelding", function () {
        const component = shallow(<SykmeldingTeasere sykmeldinger={sykmeldinger} ledetekster={ledetekster}/>);
        expect(component.find(SykmeldingTeaser)).to.have.length(3);
    });

    it("Viser en melding når det ikke er sykmeldinger", () => {
        const component = shallow(<SykmeldingTeasere tittel="Mine sykmeldinger" sykmeldinger={[]} ledetekster={ledetekster} ingenSykmeldingerMelding="Du har ingen sykmeldinger" />);
        expect(component.find(SykmeldingTeaser)).to.have.length(0);
        expect(component.find("p").text()).to.equal("Du har ingen sykmeldinger")
    })

});