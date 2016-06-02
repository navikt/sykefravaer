import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Landingsside from "../../js/components/Landingsside.js";
import UnderUtviklingVarselContainer from "../../js/containers/UnderUtviklingVarselContainer.js"

describe("Sykmelding og oppfolging", () => {

    let component;

    it("Skal vise overskrift for 'Ditt sykefravær'", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={false}/>);
        expect(component.find(".js-sidetittel").text()).to.equal("Ditt sykefravær");
    });

    it("SKal vise intro-banner", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={false}/>);
        expect(component.find(".js-intro-banner")).to.have.length(1);
    })

    it("Skal vise lenkeboks til dine sykmeldinger", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(".js-dine-sykmeldinger-lenke")).to.have.length(1);
    });

    it("Skal vise generell informasjon", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(".js-generell-informasjon")).to.have.length(1);
    });

    it("Skal vise varsel dersom skjulVarsel === false", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={false}/>);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(1);
    });

    it("Skal ikke vise varsel dersom skjulVarsel ==== true", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(0);
    });

}); 