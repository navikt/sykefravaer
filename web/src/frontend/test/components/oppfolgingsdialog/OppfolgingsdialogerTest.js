import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import Sidetopp from "../../../js/components/Sidetopp";
import { Oppfolgingsdialoger, OppfolgingsdialogNyDialog} from "../../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger";
import { OppfolgingsdialogTeasere, OppfolgingsdialogerIngenplan } from "oppfolgingsdialog-npm";
import { setLedetekster } from 'digisyfo-npm';
import { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialoger = getOppfolgingsdialoger;

describe("Oppfolgingsdialoger", () => {

    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it("Skal vise overskrift for Oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(Sidetopp).prop("tittel")).to.equal("Oppfølgingsdialoger");
    });

    it("Skal vise tekst for Oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find('p.oppfolgingsdialoger__tekst')).to.have.length(1);
    });

    it("Skal ikke vise OppfolgingsdialogerTeasere dersom man ikke har oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={[]} />);
        expect(component.find(OppfolgingsdialogTeasere)).to.have.length(0);
    });

    it("Skal vise én OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(OppfolgingsdialogTeasere)).to.have.length(0);
    });

    it("Skal vise OppfolgingsdialogNyDialog, dersom man har oppfolgingsdialoger'", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(OppfolgingsdialogNyDialog)).to.have.length(0);
    });

    it("Skal vise OppfolgingsdialogerIngenplan, dersom det ikke er opprettet en oppfolgingsdialog", () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={[]} />);
        expect(component.find(OppfolgingsdialogerIngenplan)).to.have.length(1);
    });

    describe('OppfolgingsdialogNyDialog', () => {

        it('Skal vise tekster', () => {
            component = shallow(<OppfolgingsdialogNyDialog />);
            expect(component.find('h3')).to.have.length(1);
            expect(component.find('p')).to.have.length(1);
        });

        it('Skal vise knapp for å opprette oppfolgingsdialog', () => {
            component = shallow(<OppfolgingsdialogNyDialog />);
            expect(component.find('.knapp')).to.have.length(1);
        });
    });

});