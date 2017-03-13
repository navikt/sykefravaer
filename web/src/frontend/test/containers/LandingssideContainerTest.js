import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { LandingssideSide, mapStateToProps } from "../../js/containers/LandingssideContainer";
import Landingsside from '../../js/components/landingsside/Landingsside';


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
                sykepengesoknader: {
                    data: []
                },
                mote: {}
            }
        })

        it("Skal returnere skjulUnderUtviklingVarsel", function() {
            const res = mapStateToProps(state);
            expect(res.skjulVarsel).to.equal(true)
        });

        it("Skal returnere ledetekster", function () {
            state.ledetekster.data = {
                "min.tekst": "Dette er en test"
            }
            const res = mapStateToProps(state);
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            })
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

    });

    describe("LandingssideSide", () => {

        it("Skal vise Landingsside", () => {
            let ledetekster = {"nokkel": "verdi"}
            let component = shallow(<LandingssideSide ledetekster={ledetekster} skjulVarsel={false}/>);
            expect(component.find(Landingsside)).to.have.length(1);
        });
    })

}); 