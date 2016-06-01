import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { LandingssideSide, mapStateToProps } from "../../js/containers/LandingssideContainer.js";
import Landingsside from '../../js/components/Landingsside.js';



describe("LandingssideContainer", () => {


    describe("mapStateToProps", () => {

        it("Skal returnere skjulUnderUtviklingVarsel", function() {
            const res = mapStateToProps({
                brukerinfo: {
                    data: {
                        skjulUnderUtviklingVarsel: true
                    }
                }
            });
            expect(res.skjulVarsel).to.equal(true)
        });

        it("Skal returnere ledetekster", function() {
            const res = mapStateToProps({
                ledetekster: {
                    "min.tekst": "Dette er en test"
                },
                brukerinfo: {
                    data: {}
                }     
            });
            expect(res.ledetekster).to.deep.equal({
                "min.tekst": "Dette er en test"
            })
        });        

    });

    describe("LandingssideSide", () => {

        it("Skal vise Landingsside", () => {
            let component = shallow(<LandingssideSide ledetekster={ledetekster} skjulVarsel={false} />);
            expect(component.find(Landingsside)).to.have.length(1);
        });
    })

}); 