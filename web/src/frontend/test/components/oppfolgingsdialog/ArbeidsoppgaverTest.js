import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import Arbeidsoppgaver from "../../../js/components/oppfolgingsdialoger/Arbeidsoppgaver";
import {
    RenderNotifikasjonBoksSuksess,
    RenderNotifikasjonBoks,
    RenderArbeidsoppgaverKnapper,
    RenderOpprettArbeidsoppgave,
    RenderOppfolgingsdialogArbeidsoppgaverTabell,
} from "../../../js/components/oppfolgingsdialoger/Arbeidsoppgaver";
import {
    OppfolgingsdialogInfoboks,
    LagreArbeidsoppgaveSkjema,
    OppfolgingsdialogSide,
} from "oppfolgingsdialog-npm";
import { setLedetekster } from 'digisyfo-npm';
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialog = getOppfolgingsdialog();

describe("Arbeidsoppgaver", () => {

    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it("Skal vise en OppfolgingsdialogSide", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(OppfolgingsdialogSide)).to.have.length(1);
    });

    it("Skal vise en OppfolgingsdialogInfoboks, om det ikke er arbeidsoppgaver", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {arbeidsoppgaveListe: []});
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
    });

    it("Skal vise RenderOpprettArbeidsoppgave, om det ikke er arbeidsoppgaver og visArbeidsoppgaveSkjema er true", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {arbeidsoppgaveListe: []});
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog} />);
        component.setState({
            visArbeidsoppgaveSkjema: true,
        });
        expect(component.find(RenderOpprettArbeidsoppgave)).to.have.length(1);
    });

    it("Skal vise en overskrift, om det er arbeidsoppgaver", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find('h2')).to.have.length(1);
    });

    it("Skal vise RenderNotifikasjonBoks, om det er arbeidsoppgaver som ikke er vurdert av sykmeldt ", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {arbeidsoppgaveListe: [{erVurdertAvSykmeldt: false}]});
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(RenderNotifikasjonBoks)).to.have.length(1);
    });

    it("Skal vise RenderNotifikasjonBoksSuksess, om det er arbeidsoppgaver og en arbeidsoppgave er lagret", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             arbeidsoppgaveLagret={true} />);
        expect(component.find(RenderNotifikasjonBoksSuksess)).to.have.length(1);
    });

    it("Skal vise RenderOppfolgingsdialogArbeidsoppgaverTabell, om det er arbeidsoppgaver", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog} />);
        expect(component.find(RenderOppfolgingsdialogArbeidsoppgaverTabell)).to.have.length(1);
    });

    it("Skal vise LagreArbeidsoppgaveSkjema, om det er arbeidsoppgaver og visArbeidsoppgaveSkjema er true", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog} />);
        component.setState({
            visArbeidsoppgaveSkjema: true,
        });
        expect(component.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
    });


    describe("RenderOpprettArbeidsoppgave", () => {

        it("Skal vise en overskrift", () => {
            component = shallow(<RenderOpprettArbeidsoppgave />);
            expect(component.find('h2')).to.have.length(1);
        });

        it("Skal vise et LagreArbeidsoppgaveSkjema", () => {
            component = shallow(<RenderOpprettArbeidsoppgave />);
            expect(component.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
        });

    });

    describe("RenderArbeidsoppgaverKnapper", () => {

        it("Skal vise 1 knapp", () => {
            component = shallow(<RenderArbeidsoppgaverKnapper />);
            expect(component.find('button')).to.have.length(1);
        });

    });

});
