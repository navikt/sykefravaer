import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { SykmeldingOgOppfolgingSide, mapStateToProps } from "../../js/containers/SykmeldingOgOppfolgingContainer";
import SykmeldingOgOppfolging from '../../js/components/SykmeldingOgOppfolging.js';



describe("SykmeldingOgOppfolgingContainer", () => {


    describe("mapStateToProps", () => {

        it("Skal returnere skjulUnderUtviklingVarsel", function() {
            const res = mapStateToProps({
                brukerinfo: {
                    innstillinger: {
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

    describe("Sykemeldinger og oppfolging", () => {

        it("Skal vise Sykmeldinger og oppfolging", () => {
            let component = shallow(<SykmeldingOgOppfolgingSide ledetekster={ledetekster} skjulVarsel={false} />);
            expect(component.find(SykmeldingOgOppfolging)).to.have.length(1);
        });
    })

}); 