import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { LandingssideSide, mapStateToProps } from "../../js/containers/LandingssideContainer";
import Landingsside from '../../js/components/landingsside/Landingsside';


describe("LandingssideContainer", () => {


    describe("mapStateToProps", () => {

        it("Skal returnere skjulUnderUtviklingVarsel", function() {
            const res = mapStateToProps({
                brukerinfo: {
                    innstillinger: {
                        skjulUnderUtviklingVarsel: true
                    }
                },
                ledetekster: {
                    data: []
                },
                sykepengesoknader: {
                    data: []
                },
                deltaker: {
                    data: [{harDialogmote:false}]
                }
            });
            expect(res.skjulVarsel).to.equal(true)
        });

        it("Skal returnere ledetekster", function () {
            const res = mapStateToProps({
                ledetekster: {
                    data: {
                        "min.tekst": "Dette er en test"
                    }
                },
                brukerinfo: {
                    data: {}
                },
                sykepengesoknader: {
                    data: []
                },
                deltaker: {
                    data: [{harDialogmote:false}]
                }
            });
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            })
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