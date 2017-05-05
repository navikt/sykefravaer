import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import OppfolgingsdialogerTeaser from "../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerTeaser";
import OppfolgingsdialogerTeasere from "../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerTeasere";
import { setLedetekster } from 'digisyfo-npm';
import { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialoger = getOppfolgingsdialoger;

describe("OppfolgingsdialogerTeasere", () => {

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it("Viser en header", () => {
        const component = shallow(<OppfolgingsdialogerTeasere tittel="Oppfolgingsdialoger" oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find("header")).to.have.length(1);
        expect(component.find("header").text()).to.contain("Oppfolgingsdialoger")
    });

    it("Viser en OppfolgingsdialogTeaser per oppfolgingsdialog", function () {
        const component = shallow(<OppfolgingsdialogerTeasere oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(OppfolgingsdialogerTeaser)).to.have.length(1);
    });

    it("Viser en melding når det ikke er oppfolgingsdialoger", () => {
        const component = shallow(<OppfolgingsdialogerTeasere tittel="Oppfolgingsdialoger" oppfolgingsdialoger={[]}  ingenOppfolgingsdialogerMelding="Du har ingen oppfolgingsdialoger" />);
        expect(component.find(OppfolgingsdialogerTeaser)).to.have.length(0);
        expect(component.find("p").text()).to.equal("Du har ingen oppfolgingsdialoger")
    })

});