import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;
import ledetekster from "../../mockLedetekster";
import SykmeldingTeaser from "../../../js/components/sykmeldinger/SykmeldingTeaser";
import SykmeldingTeasere from "../../../js/components/sykmeldinger/SykmeldingTeasere";
import SykmeldingerSorteringContainer from "../../../js/containers/sykmeldinger/SykmeldingerSorteringContainer";
import { setLedetekster } from 'digisyfo-npm';

const sykmeldinger = [{
    id: "1",
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31",
        tom: "2016-01-06",
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
}, {
    id: "2",
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31",
        tom: "2016-01-06",
        grad: 67
    }],
    hoveddiagnose: {
        diagnose: "Influensa",
        diagnosesystem: "ICPC",
        diagnosekode: "LP2"
    },
    arbeidsfoerEtterPerioden: true
}, {
    id: "3",
    fnr: "12",
    fornavn: "Per",
    etternavn: "Person",
    sykmelder: "Ove Olsen",
    arbeidsgiver: "Selskapet AS",
    perioder: [{
        fom: "2015-12-31",
        tom: "2016-01-06",
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

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it("Viser en header", () => {
        const component = shallow(<SykmeldingTeasere tittel="Mine sykmeldinger" sykmeldinger={sykmeldinger} />);
        expect(component.find("header")).to.have.length(1);
        expect(component.find("header").text()).to.contain("Mine sykmeldinger")
    });

    it("Viser children dersom de er sendt inn", () => {
        const component = shallow(<SykmeldingTeasere tittel="Mine sykmeldinger" sykmeldinger={sykmeldinger} >
            <SykmeldingerSorteringContainer />
            </SykmeldingTeasere>);
        expect(component.contains(<SykmeldingerSorteringContainer />)).to.equal(true);
    }); 

    it("Viser en SykmeldingTeaser per sykmelding", function () {
        const component = shallow(<SykmeldingTeasere sykmeldinger={sykmeldinger} />);
        expect(component.find(SykmeldingTeaser)).to.have.length(3);
    });

    it("Viser en melding når det ikke er sykmeldinger", () => {
        const component = shallow(<SykmeldingTeasere tittel="Mine sykmeldinger" sykmeldinger={[]}  ingenSykmeldingerMelding="Du har ingen sykmeldinger" />);
        expect(component.find(SykmeldingTeaser)).to.have.length(0);
        expect(component.find("p").text()).to.equal("Du har ingen sykmeldinger")
    })

});