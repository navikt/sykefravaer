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
                brukerinfo: {
                    innstillinger: {
                        skjulUnderUtviklingVarsel: true
                    }
                },
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
                }
            }
        });

        it("Skal returnere skjulUnderUtviklingVarsel", function() {
            const res = mapStateToProps(state);
            expect(res.skjulVarsel).to.equal(true)
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

        it("Skal returnere visOppfoelgingsdialog === true", () => {
            const res = mapStateToProps(state);
            expect(res.visOppfoelgingsdialog).to.be.true;
        });

        it("Skal returnere visOppfoelgingsdialog === false hvis false", () => {
            state.toggles.data = {
                'syfotoggles.oppfoelgingsdialog': 'false',
            };
            const res = mapStateToProps(state);
            expect(res.visOppfoelgingsdialog).to.be.false;
        });

        it("Skal returnere visOppfoelgingsdialog === false hvis ikke definert", () => {
            state.toggles.data = {
            };
            const res = mapStateToProps(state);
            expect(res.visOppfoelgingsdialog).to.be.false;
        });

        it("Skal returnere sykepengesoknader", () => {
            const res = mapStateToProps(state);
            expect(res.sykepengesoknader).to.deep.equal([]);
        });

        it("Skal returnere sykepengesoknaderHentet = false når sykepengesoknader ikke er hentet", () => {
            const res = mapStateToProps(state);
            expect(res.sykepengesoknaderHentet).to.be.false;
        });

        it("Skal returnere sykepengesoknaderHentet = true når sykepengesoknader er hentet", () => {
            state.sykepengesoknader.hentet = true;
            const res = mapStateToProps(state);
            expect(res.sykepengesoknaderHentet).to.be.true;
        });

        it("Skal returnere ledereHentet = false når ledere ikke er hentet", () => {
            const res = mapStateToProps(state);
            expect(res.ledereHentet).to.be.false;
        });

        it("Skal returnere ledereHentet = true når ledere er hentet", () => {
            state.ledere.hentet = true;
            const res = mapStateToProps(state);
            expect(res.ledereHentet).to.be.true;
        });


    });

    describe("LandingssideSide", () => {

        let hentMote;
        let hentSykepengesoknader;
        let hentLedere;
        let hentToggles;

        beforeEach(() => {
            hentMote = sinon.spy();
            hentSykepengesoknader = sinon.spy();
            hentLedere = sinon.spy();
            hentToggles = sinon.spy();
        });

        it("Skal vise Landingsside", () => {
            let component = shallow(<LandingssideSide hentToggles={hentToggles} hentLedere={hentLedere} hentMote={hentMote} hentSykepengesoknader={hentSykepengesoknader} skjulVarsel={false}/>);
            expect(component.find(Landingsside)).to.have.length(1);
        });

        it("Skal hente sykepengesoknader hvis sykepengesoknader ikke er hentet", () => {
            let component = shallow(<LandingssideSide hentToggles={hentToggles} hentLedere={hentLedere} hentMote={hentMote} hentSykepengesoknader={hentSykepengesoknader} skjulVarsel={false}/>);
            expect(hentSykepengesoknader.called).to.be.true;
        });

        it("Skal ikke hente sykepengesoknader hvis sykepengesoknader er hentet", () => {
            let component = shallow(<LandingssideSide hentToggles={hentToggles} sykepengesoknaderHentet hentLedere={hentLedere} hentMote={hentMote} hentSykepengesoknader={hentSykepengesoknader} skjulVarsel={false}/>);
            expect(hentSykepengesoknader.called).to.be.false;
        });

        it("Skal hente møte", () => {
            let component = shallow(<LandingssideSide hentToggles={hentToggles} sykepengesoknaderHentet hentLedere={hentLedere} hentMote={hentMote} hentSykepengesoknader={hentSykepengesoknader} skjulVarsel={false}/>);
            expect(hentMote.called).to.be.true;
        });

        it("Skal hente ledere hvis ledere ikke er hentet", () => {
            let component = shallow(<LandingssideSide hentToggles={hentToggles} sykepengesoknaderHentet hentMote={hentMote} hentLedere={hentLedere} skjulVarsel={false}/>);
            expect(hentLedere.called).to.be.true;
        });

        it("Skal ikke hente ledere hvis ledere er hentet", () => {
            let component = shallow(<LandingssideSide hentToggles={hentToggles} sykepengesoknaderHentet ledereHentet hentMote={hentMote} hentLedere={hentLedere} skjulVarsel={false}/>);
            expect(hentSykepengesoknader.called).to.be.false;
        });

        it("Skal hente syfotoggles", () => {
            let component = shallow(<LandingssideSide sykepengesoknaderHentet ledereHentet hentToggles={hentToggles} hentMote={hentMote} hentLedere={hentLedere} skjulVarsel={false}/>);
            expect(hentToggles.called).to.be.true;
        });

    });

}); 