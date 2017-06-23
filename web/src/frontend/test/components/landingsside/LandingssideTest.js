import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";

chai.use(chaiEnzyme());
const expect = chai.expect;

import Landingsside, { GenerellInfo } from "../../../js/components/landingsside/Landingsside";
import LandingssideLenke from "../../../js/components/landingsside/LandingssideLenke";
import UnderUtviklingVarselContainer from "../../../js/containers/UnderUtviklingVarselContainer"
import { getSoknad } from '../../mockSoknader';
import { setLedetekster } from 'digisyfo-npm';

describe("Landingsside", () => {

    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it("Skal vise overskrift for 'Ditt sykefravær'", () => {
        component = shallow(<Landingsside skjulVarsel={false}/>);
        expect(component.find(".js-sidetittel").text()).to.equal("Ditt sykefravær");
    });

    it("Skal vise tre lenkebokser om vi ikke har dialogmoter eller soknader", () => {
        component = shallow(<Landingsside skjulVarsel={true} />);
        expect(component.find(LandingssideLenke)).to.have.length(2);
    });

    it("Skal vise lenkeboks til dialogmoter om vi har et dialogmote", () => {
        component = shallow(<Landingsside skjulVarsel={true} harDialogmote={true} />);
        expect(component.find(LandingssideLenke)).to.have.length(3);
    });

    it("Skal ikke vise lenkeboks til oppfølgingsdialog om vi har oppfolgingsdialog togglet pa og ikke eksisterer sykmelding", () => {
        component = shallow(<Landingsside skjulVarsel={true} harDialogmote={false} visOppfoelgingsdialog={true} dineSykmeldinger={[]} />);
        expect(component.find(LandingssideLenke)).to.have.length(2);
    });

    it("Skal vise lenkeboks til oppfølgingsdialog om vi har oppfolgingsdialog togglet pa og det eksisterer minst 1 sykmelding", () => {
        component = shallow(<Landingsside skjulVarsel={true} harDialogmote={false} visOppfoelgingsdialog={true} dineSykmeldinger={[{}]} />);
        expect(component.find(LandingssideLenke)).to.have.length(3);
    });

    it("Skal vise lenkeboks til soknader om vi har en soknad", () => {
        component = shallow(<Landingsside skjulVarsel={true} sykepengesoknader={[getSoknad()]} />);
        expect(component.find(LandingssideLenke)).to.have.length(3);
    });

    it("Skal vise generell informasjon", () => {
        component = shallow(<Landingsside skjulVarsel={true} />);
        expect(component.find(GenerellInfo)).to.have.length(1);
    });

    it("Skal vise varsel dersom skjulVarsel === false", () => {
        component = shallow(<Landingsside skjulVarsel={false}/>);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(1);
    });

    it("Skal ikke vise varsel dersom skjulVarsel ==== true", () => {
        component = shallow(<Landingsside skjulVarsel={true}/>);
        expect(component.find(UnderUtviklingVarselContainer)).to.have.length(0);
    });

    describe("GenerellInfo", () => {

        it("Skal vise en overskrift", () => {
            component = shallow(<GenerellInfo />);
            expect(component.find("h2")).to.have.length(1);
        });

        it("Skal vise to lenker", () => {
           component = mount(<GenerellInfo />);
           expect(component.find("a")).to.have.length(2); 
        })

    })

}); 