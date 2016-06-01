import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";

chai.use(chaiEnzyme());
const expect = chai.expect;

import { VelgArbeidssituasjon, mapStateToProps } from "../../js/containers/TidslinjeVelgArbeidssituasjonContainer.js";
import Faner from "../../js/components/Faner.js";

describe("TidslinjeVelgArbeidssituasjonContainer", () => {

    let initState; 

    beforeEach(() => {
        initState = {
            brukerinfo: {
                innstillinger: {}
            },
            arbeidssituasjoner: [{
                tittel: 'Jeg har arbeidsgiver',
                verdi: 'MED_ARBEIDSGIVER',
            }, {
                tittel: 'Jeg har ikke arbeidsgiver',
                verdi: 'UTEN_ARBEIDSGIVER',
            }],
        }
    }); 

    describe("mapStateToProps", () => {

        it("Skal returnere valgt arbeidssituasjon", () => {
            let props = mapStateToProps(initState);
            expect(props.valgtArbeidssituasjon).to.equal("MED_ARBEIDSGIVER");

            initState.brukerinfo.innstillinger.arbeidssituasjon = "Olsen"
            let props2 = mapStateToProps(initState);
            expect(props2.valgtArbeidssituasjon).to.equal("Olsen");            
        }); 


        it("Skal returnere arbeidssituasjoner", () => {
            let props = mapStateToProps(initState);
            expect(props.arbeidssituasjoner).to.deep.equal([{
                tittel: 'Jeg har arbeidsgiver',
                verdi: 'MED_ARBEIDSGIVER',
            }, {
                tittel: 'Jeg har ikke arbeidsgiver',
                verdi: 'UTEN_ARBEIDSGIVER',
            }]);
        });         

    });

    describe("VelgArbeidssituasjon", () => {

        it("Skal vise faner", () => {
            let component = shallow(<VelgArbeidssituasjon arbeidssituasjoner={initState.arbeidssituasjoner} />)
            expect(component.find(Faner)).to.have.length(1);
        })

    })

}); 