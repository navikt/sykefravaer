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

    it("Skal vise bilde over overskriften", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={false}/>);
        expect(component.find(".sidetopp__bilde")).to.have.length(1);
    });

    it("Skal vise overskrift for 'Ditt sykefravær'", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={false}/>);
        expect(component.find(".js-sidetittel").text()).to.equal("Ditt sykefravær");
    });

    it("Skal vise to lenkebokser om vi ikke har dialogmoter eller soknader", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true}/>);
        expect(component.find(LandingssideLenke)).to.have.length(2);
    });

    it("Skal vise lenkeboks til dialogmoter om vi har et dialogmote", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true} dialogmoter={[{id: 1}]}/>);
        expect(component.find(LandingssideLenke)).to.have.length(3);
    });

    it("Skal vise lenkeboks til soknader om vi har en soknad", () => {
        component = shallow(<Landingsside ledetekster={ledetekster} skjulVarsel={true} soknader={[{id: 1}]}/>);
        expect(component.find(LandingssideLenke)).to.have.length(3);
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