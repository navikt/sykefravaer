import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import SykmeldingOgOppfolging from "../../js/components/SykmeldingOgOppfolging.js";
import UnderUtviklingVarselContainer from "../../js/containers/UnderUtviklingVarselContainer.js"
import TidslinjeUtsnittContainer from "../../js/containers/TidslinjeUtsnittContainer.js"

describe("Sykmelding og oppfolging", () => {

    let component;

    it("Skal vise overskrift for 'Sykmelding og oppfolging'", () => {
        component = shallow(<SykmeldingOgOppfolging ledetekster={ledetekster} skjulVarsel={false} />);
        expect(component.find("h1").text()).to.equal("Sykmeldinger og oppfølging");
    });

    it("Skal vise varsel", () => {
        component = shallow(<SykmeldingOgOppfolging ledetekster={ledetekster} skjulVarsel={false} />);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(1);
    });

    it("Skal ikke vise varsel", () => {
        component = shallow(<SykmeldingOgOppfolging ledetekster={ledetekster} skjulVarsel={true} />);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(0);
    });

    it("Skal vise tidslinjeutsnitt", () => {
        component = shallow(<SykmeldingOgOppfolging ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(TidslinjeUtsnittContainer)).to.have.length(1);
    });

    it("Skal vise lenkeboks til dine sykmeldinger", () => {
        component = shallow(<SykmeldingOgOppfolging ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(".dashboard-lenke")).to.have.length(1);
    });

    it("Skal vise generell informasjon", () => {
        component = shallow(<SykmeldingOgOppfolging ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(".js-generell-informasjon")).to.have.length(1);
    });

    it("Skal vise roller", () => {
        component = shallow(<SykmeldingOgOppfolging ledetekster={ledetekster} skjulVarsel={true} />);
        expect(component.find(".js-roller")).to.have.length(1);
    });

}); 