import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import ledetekster from "../../mockLedetekster";
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Arbeidsoppgaver from "../../../js/components/oppfolgingsdialoger/utfylling/Arbeidsoppgaver";
import {
    RenderNotifikasjonBoksSuksess,
    RenderNotifikasjonBoks,
    RenderArbeidsoppgaverKnapper,
    RenderOpprettArbeidsoppgave,
    RenderOppfolgingsdialogArbeidsoppgaverTabell,
} from "../../../js/components/oppfolgingsdialoger/utfylling/Arbeidsoppgaver";
import {
    OppfolgingsdialogInfoboks,
    LagreArbeidsoppgaveSkjema,
} from "oppfolgingsdialog-npm";
import { setLedetekster } from 'digisyfo-npm';
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialog = getOppfolgingsdialog();

describe("Arbeidsoppgaver", () => {

    let component;
    let arbeidsgiver;
    let arbeidstaker;
    let lagreArbeidsoppgave;
    let slettArbeidsoppgave;

    beforeEach(() => {
        lagreArbeidsoppgave = sinon.spy();
        slettArbeidsoppgave = sinon.spy();
        setLedetekster(ledetekster);
        arbeidsgiver = {
            navn: 'Arbeidsgiver',
            aktoerId: '***REMOVED***',
        };
        arbeidstaker = {
            navn: 'Arbeidstaker',
            aktoerId: '1234567891234',
        };
    });

    it("Skal vise en OppfolgingsdialogInfoboks, om det ikke er arbeidsoppgaver", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker: arbeidstaker,
            arbeidsgiver: arbeidsgiver,
            arbeidsoppgaveListe: [],
        });
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             oppfolgingsdialogerHentet
                                             lagreArbeidsoppgave={lagreArbeidsoppgave}
                                             slettArbeidsoppgave={slettArbeidsoppgave}
                                             arbeidsoppgaveListe={oppfolgingsdialog.arbeidsoppgaveListe} />);
        expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
    });

    it("Skal vise RenderOpprettArbeidsoppgave, om det ikke er arbeidsoppgaver og visArbeidsoppgaveSkjema er true", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker: arbeidstaker,
            arbeidsgiver: arbeidsgiver,
            arbeidsoppgaveListe: [],
        });
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             nyArbeidsoppgave
                                             lagreArbeidsoppgave={lagreArbeidsoppgave}
                                             slettArbeidsoppgave={slettArbeidsoppgave}
                            />);
        component.setState({
            visArbeidsoppgaveSkjema: true,
        });
        expect(component.find(RenderOpprettArbeidsoppgave)).to.have.length(1);
    });

    it("Skal vise en overskrift, om det er arbeidsoppgaver", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             nyArbeidsoppgave
                                             lagreArbeidsoppgave={lagreArbeidsoppgave}
                                             slettArbeidsoppgave={slettArbeidsoppgave}
                            />);
        expect(component.find('h2')).to.have.length(1);
    });

    it("Skal vise RenderOppfolgingsdialogArbeidsoppgaverTabell, om det er arbeidsoppgaver", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             oppfolgingsdialogerHentet
                                             lagreArbeidsoppgave={lagreArbeidsoppgave}
                                             slettArbeidsoppgave={slettArbeidsoppgave}
                            />);
        expect(component.find(RenderOppfolgingsdialogArbeidsoppgaverTabell)).to.have.length(1);
    });

    it("Skal vise LagreArbeidsoppgaveSkjema, om det er arbeidsoppgaver og visArbeidsoppgaveSkjema er true", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             oppfolgingsdialogerHentet
                                             lagreArbeidsoppgave={lagreArbeidsoppgave}
                                             slettArbeidsoppgave={slettArbeidsoppgave}
                            />);
        component.setState({
           visArbeidsoppgaveSkjema: true,
        });
        expect(component.find(LagreArbeidsoppgaveSkjema)).to.have.length(1);
    });

    it("Skal vise spinner dersom data lagres", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                    lagrer />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it("Skal vise spinner dersom data slettes", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                    sletter />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it("Skal vise feilmelding dersom lagring feilet", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                    lagringFeilet />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it("Skal vise feilmelding dersom sletting feilet", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                    slettingFeilet />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
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
