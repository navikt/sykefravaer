import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { LandingssideSide, mapStateToProps } from "../../js/containers/LandingssideContainer";
import Landingsside from '../../js/components/landingsside/Landingsside';
import sinon from 'sinon';


describe("LandingssideContainer", () => {

    describe("mapStateToProps", () => {

        let state;

        beforeEach(() => {
            state = {
                ledetekster: {
                    data: {}
                },
                toggles: {
                    data: {
                        'syfotoggles.oppfoelgingsdialog': 'true',
                    }
                },
                sykepengesoknader: {
                    data: []
                },
                dineSykmeldinger: {
                    data: [{}]
                },
                mote: {},
                ledere: {
                    hentet: false,
                    data: []
                },
                hendelser: {}
            }
        });

        it("Skal returnere harDialogmote === false", () => {
            state.mote.data = null;
            const res = mapStateToProps(state);
            expect(res.harDialogmote).to.be.false;
        });

        it("Skal returnere harDialogmote === true", () => {
            state.mote.data = {};
            const res = mapStateToProps(state);
            expect(res.harDialogmote).to.be.true;
        });

        it("Skal returnere sykepengesoknader", () => {
            const res = mapStateToProps(state);
            expect(res.sykepengesoknader).to.deep.equal([]);
        });

        it("Skal returnere altHentet = false når sykepengesoknader ikke er hentet", () => {
            state.ledere.hentet = true;
            state.mote.hentet = true;
            state.dineSykmeldinger.hentet = true;
            state.toggles.hentet = true;
            state.sykepengesoknader.hentet = false;
            const res = mapStateToProps(state);
            expect(res.altHentet).to.be.false;
            expect(res.hentet.sykepengesoknader).to.be.false;
        });

        it("Skal returnere altHentet = true når alt nødvendig er hentet", () => {
            state.ledere.hentet = true;
            state.mote.hentet = true;
            state.dineSykmeldinger.hentet = true;
            state.toggles.hentet = true;
            state.sykepengesoknader.hentet = true;
            const res = mapStateToProps(state);
            expect(res.altHentet).to.be.true;
        });

        it("Skal returnere altHentet = false når ledere ikke er hentet", () => {
            const res = mapStateToProps(state);
            expect(res.hentet.ledere).to.be.false;
        });

        it("Skal returnere = true når ledere er hentet", () => {
            state.ledere.hentet = true;
            const res = mapStateToProps(state);
            expect(res.hentet.ledere).to.be.true;
        });


    });

    describe("LandingssideSide", () => {

        let hentMote;
        let hentSykepengesoknader;
        let hentLedere;
        let hentToggles;
        let hentDineSykmeldinger;
        let hent

        beforeEach(() => {
            hentMote = sinon.spy();
            hentSykepengesoknader = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
            hentLedere = sinon.spy();
            hentToggles = sinon.spy();
            hent = {
                hentMote, hentSykepengesoknader, hentDineSykmeldinger, hentLedere, hentToggles
            }
        });

        it("Skal vise Landingsside", () => {
            let component = shallow(<LandingssideSide hentet={{}} toggles={{}} {...hent} />);
            expect(component.find(Landingsside)).to.have.length(1);
        });

        it("Skal hente sykepengesoknader hvis sykepengesoknader ikke er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{sykepengesoknader: false}} toggles={{}} {...hent} />);
            expect(hentSykepengesoknader.called).to.be.true;
        });

        it("Skal ikke hente sykepengesoknader hvis sykepengesoknader er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{sykepengesoknader: true}} toggles={{}} {...hent} />);
            expect(hentSykepengesoknader.called).to.be.false;
        });

        it("Skal hente møte hvis møte ikke er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{mote: false}} toggles={{}} {...hent} />);
            expect(hentMote.called).to.be.true;
        });

        it("Skal ikke hente møte hvis møte er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{mote: true}} toggles={{}} {...hent} />);
            expect(hentMote.called).to.be.false;
        });

        it("Skal hente ledere hvis ledere ikke er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{ledere: false}} toggles={{}} {...hent} />);
            expect(hentLedere.called).to.be.true;
        });

        it("Skal ikke hente ledere hvis ledere er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{ledere: true}} toggles={{}} {...hent} />);
            expect(hentLedere.called).to.be.false;
        });

        it("Skal hente toggles hvis det ikke er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{}} toggles={{}} {...hent} />);
            expect(hentToggles.called).to.be.true;
        });

        it("Skal hente toggles hvis det er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{toggles: true}} toggles={{}} {...hent} />);
            expect(hentToggles.called).to.be.false;
        });

        it("Skal hente dineSykmeldinger hvis dineSykmeldinger ikke er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{}} toggles={{dineSykmeldinger: false}} {...hent} />);
            expect(hentDineSykmeldinger.called).to.be.true;
        });

        it("Skal ikke hente dineSykmeldinger hvis dineSykmeldinger er hentet", () => {
            let component = shallow(<LandingssideSide hentet={{dineSykmeldinger: true}} {...hent} />);
            expect(hentDineSykmeldinger.called).to.be.false;
        });

    });

}); 