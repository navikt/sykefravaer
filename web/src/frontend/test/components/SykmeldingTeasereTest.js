import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;
import ledetekster from "../ledetekster_mock";
import SykmeldingTeaser from "../../js/components/sykmeldinger/SykmeldingTeaser";
import SykmeldingTeasere from "../../js/components/sykmeldinger/SykmeldingTeasere";
import SykmeldingerSorteringContainer from "../../js/containers/SykmeldingerSorteringContainer";

const sykmeldinger = [{
    id: 1,
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
        tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
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
        fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
        tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
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
        fom: { year: 2015, monthValue: 12, dayOfMonth: 31 },
        tom: { year: 2016, monthValue: 1, dayOfMonth: 6 },
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

    it("Viser children dersom de er sendt inn", () => {
        const component = shallow(<SykmeldingTeasere tittel="Mine sykmeldinger" sykmeldinger={sykmeldinger} ledetekster={ledetekster}>
            <SykmeldingerSorteringContainer />
            </SykmeldingTeasere>);
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