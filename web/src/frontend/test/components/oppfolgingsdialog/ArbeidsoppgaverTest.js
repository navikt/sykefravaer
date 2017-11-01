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
    RenderOpprettArbeidsoppgave,
    OppfolgingsdialogArbeidsoppgaverTabell,
} from "../../../js/components/oppfolgingsdialoger/utfylling/Arbeidsoppgaver";
import {
    OppfolgingsdialogInfoboks,
    LagreArbeidsoppgaveSkjema,
    LeggTilElementKnapper,
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
    let arbeidsforhold;

    beforeEach(() => {
        lagreArbeidsoppgave = sinon.spy();
        slettArbeidsoppgave = sinon.spy();
        setLedetekster(ledetekster);
        arbeidsgiver = {
            naermesteLeder: {
                navn: 'Arbeidsgiver',
                aktoerId: '***REMOVED***',
            },
        };
        arbeidstaker = {
            navn: 'Arbeidstaker',
            aktoerId: '1234567891234',
        };

        arbeidsforhold = {
            stillinger : {
                yrke: 'Test',
                prosent: '80',
            },
            aktoerId: 1,
        }
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
                                             arbeidsforhold={arbeidsforhold}
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
                                             arbeidsforhold={arbeidsforhold}
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
                                             arbeidsforhold={arbeidsforhold}
                            />);
        expect(component.find('h2')).to.have.length(1);
    });

    it("Skal vise OppfolgingsdialogArbeidsoppgaverTabell, om det er arbeidsoppgaver", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             oppfolgingsdialogerHentet
                                             lagreArbeidsoppgave={lagreArbeidsoppgave}
                                             slettArbeidsoppgave={slettArbeidsoppgave}
                                             arbeidsforhold={arbeidsforhold}
                            />);
        expect(component.find(OppfolgingsdialogArbeidsoppgaverTabell)).to.have.length(1);
    });

    it("Skal vise LagreArbeidsoppgaveSkjema, om det er arbeidsoppgaver og visArbeidsoppgaveSkjema er true", () => {
        component = shallow(<Arbeidsoppgaver oppfolgingsdialog={oppfolgingsdialog}
                                             oppfolgingsdialogerHentet
                                             lagreArbeidsoppgave={lagreArbeidsoppgave}
                                             slettArbeidsoppgave={slettArbeidsoppgave}
                                             arbeidsforhold={arbeidsforhold}
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

    describe("LeggTilElementKnapper", () => {

        it("Skal vise 1 knapp", () => {
            component = shallow(<LeggTilElementKnapper />);
            expect(component.find('button')).to.have.length(1);
        });

    });

});
