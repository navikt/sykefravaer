import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Tiltak from "../../../js/components/oppfolgingsdialoger/Tiltak";
import {
    RenderNotifikasjonBoksSuksess,
    RenderNotifikasjonBoks,
    RenderTiltakKnapper,
    RenderOpprettTiltak,
    RenderOppfolgingsdialogTiltakTabell,
} from "../../../js/components/oppfolgingsdialoger/Tiltak";
import {
    OppfolgingsdialogInfoboks,
    LagreTiltakSkjema,
    OppfolgingsdialogSide,
} from "oppfolgingsdialog-npm";
import { setLedetekster } from 'digisyfo-npm';
import getOppfolgingsdialog from '../../mockOppfolgingsdialoger';

chai.use(chaiEnzyme());
const expect = chai.expect;

const oppfolgingsdialog = getOppfolgingsdialog();

describe("Tiltak", () => {

    let component;
    let arbeidsgiver;
    let arbeidstaker;

    beforeEach(() => {
        toggleTiltakSkjema = sinon.spy();
        sendLagreTiltak = sinon.spy();
        sendSlettTiltak = sinon.spy();
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

    it("Skal vise en OppfolgingsdialogSide", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find(OppfolgingsdialogSide)).to.have.length(1);
    });

    it("Skal vise en OppfolgingsdialogInfoboks, om det ikke er tiltak", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker: arbeidstaker,
            arbeidsgiver: arbeidsgiver,
            tiltakListe: [],
        });
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
    });

    it("Skal vise RenderOpprettTiltak, om det ikke er tiltak og visTiltakSkjema er true", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker: arbeidstaker,
            arbeidsgiver: arbeidsgiver,
            tiltakListe: [],
        });
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    visTiltakSkjema={true}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find(RenderOpprettTiltak)).to.have.length(1);
    });

    it("Skal vise en overskrift, om det er tiltak", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find('h2')).to.have.length(1);
    });

    it("Skal vise RenderNotifikasjonBoks, om det er tiltak som er lagt til av arbeidsgiver ", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker: arbeidstaker,
            arbeidsgiver: arbeidsgiver,
            tiltakListe: [{opprettetAv: {aktoerId: arbeidsgiver.aktoerId}}]
        });
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find(RenderNotifikasjonBoks)).to.have.length(1);
    });

    it("Skal vise RenderNotifikasjonBoksSuksess, om det er tiltak og en tiltak er lagret", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    tiltakLagret={true}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find(RenderNotifikasjonBoksSuksess)).to.have.length(1);
    });

    it("Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find(RenderOppfolgingsdialogTiltakTabell)).to.have.length(1);
    });

    it("Skal vise LagreTiltakSkjema, om det er tiltak og visTiltakSkjema er true", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    visTiltakSkjema={true}
                                    tiltakListe={oppfolgingsdialog.tiltakListe} />);
        expect(component.find(LagreTiltakSkjema)).to.have.length(1);
    });

    it("Skal vise spinner dersom data lagres", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                            lagrer />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it("Skal vise spinner dersom data slettes", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                        sletter />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it("Skal vise feilmelding dersom lagring feilet", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                            lagringFeilet />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it("Skal vise feilmelding dersom sletting feilet", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                        slettingFeilet />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });


    describe("RenderOpprettTiltak", () => {

        it("Skal vise en overskrift", () => {
            component = shallow(<RenderOpprettTiltak />);
            expect(component.find('h2')).to.have.length(1);
        });

        it("Skal vise et LagreTiltakSkjema", () => {
            component = shallow(<RenderOpprettTiltak />);
            expect(component.find(LagreTiltakSkjema)).to.have.length(1);
        });

    });

    describe("RenderTiltakKnapper", () => {

        it("Skal vise 1 knapp", () => {
            component = shallow(<RenderTiltakKnapper />);
            expect(component.find('button')).to.have.length(1);
        });

    });

});
