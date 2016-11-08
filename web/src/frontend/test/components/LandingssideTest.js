import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Landingsside, { GenerellInfo } from "../../js/components/Landingsside";
import LandingssideLenke from "../../js/components/LandingssideLenke";
import UnderUtviklingVarselContainer from "../../js/containers/UnderUtviklingVarselContainer"

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
        expect(component.find(LandingssideLenke)).to.have.length(1);
    });

    it("Skal vise generell informasjon", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(GenerellInfo)).to.have.length(1);
    });

    it("Skal vise varsel dersom skjulVarsel === false", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={false}/>);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(1);
    });

    it("Skal ikke vise varsel dersom skjulVarsel ==== true", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(0);
    });

    describe("GenerellInfo", () => {

        it("Skal vise en overskrift", () => {
            component = shallow(<GenerellInfo ledetekster={ledetekster} />);
            expect(component.find("h2")).to.have.length(1);
        });

        it("Skal vise to lenker", () => {
           component = mount(<GenerellInfo ledetekster={ledetekster} />);
           expect(component.find("a")).to.have.length(2); 
        })

    })

}); 