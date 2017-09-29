import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../../mockLedetekster";
import AppSpinner from '../../../js/components/AppSpinner';
import Feilmelding from '../../../js/components/Feilmelding';
import Tiltak from "../../../js/components/oppfolgingsdialoger/utfylling/Tiltak";
import {
    RenderNotifikasjonBoksSuksess,
    RenderNotifikasjonBoks,
    RenderOpprettTiltak,
    RenderOppfolgingsdialogTiltakTabell,
} from "../../../js/components/oppfolgingsdialoger/utfylling/Tiltak";
import {
    OppfolgingsdialogInfoboks,
    LagreTiltakSkjema,
    LeggTilElementKnapper,
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
    let lagreTiltak;
    let slettTiltak;

    beforeEach(() => {
        lagreTiltak = sinon.spy();
        slettTiltak = sinon.spy();
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
    });

    it("Skal vise en OppfolgingsdialogInfoboks, om det ikke er tiltak", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker: arbeidstaker,
            arbeidsgiver: arbeidsgiver,
            tiltakListe: [],
        });
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    oppfolgingsdialogerHentet
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
                             />);
        expect(component.find(OppfolgingsdialogInfoboks)).to.have.length(1);
    });

    it("Skal vise RenderOpprettTiltak, om det ikke er tiltak og visTiltakSkjema er true", () => {
        const oppfolgingsdialog = Object.assign({}, oppfolgingsdialog, {
            arbeidstaker: arbeidstaker,
            arbeidsgiver: arbeidsgiver,
            tiltakListe: [],
        });
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    oppfolgingsdialogerHentet
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
                             />);
        component.setState({
           visTiltakSkjema: true,
        });
        expect(component.find(RenderOpprettTiltak)).to.have.length(1);
    });

    it("Skal vise en overskrift, om det er tiltak", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    oppfolgingsdialogerHentet
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
                             />);
        expect(component.find('h2')).to.have.length(1);
    });

    it("Skal vise RenderOppfolgingsdialogTiltakTabell, om det er tiltak", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    oppfolgingsdialogerHentet
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
                            />);
        expect(component.find(RenderOppfolgingsdialogTiltakTabell)).to.have.length(1);
    });

    it("Skal vise LagreTiltakSkjema, om det er tiltak og visTiltakSkjema er true", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    oppfolgingsdialogerHentet
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
                            />);
        component.setState({
            visTiltakSkjema: true,
        });
        expect(component.find(LagreTiltakSkjema)).to.have.length(1);
    });

    it("Skal vise spinner dersom data lagres", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                            lagrer />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it("Skal vise spinner dersom data slettes", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
                                    sletter />);
        expect(component.contains(<AppSpinner />)).to.equal(true);
    });

    it("Skal vise feilmelding dersom lagring feilet", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
                                    lagringFeilet />);
        expect(component.contains(<Feilmelding />)).to.equal(true);
    });

    it("Skal vise feilmelding dersom sletting feilet", () => {
        component = shallow(<Tiltak oppfolgingsdialog={oppfolgingsdialog}
                                    lagreTiltak={lagreTiltak}
                                    slettTiltak={slettTiltak}
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

    describe("LeggTilElementKnapper", () => {

        it("Skal vise 1 knapp", () => {
            component = shallow(<LeggTilElementKnapper />);
            expect(component.find('button')).to.have.length(1);
        });

    });

});
