import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import sinon from 'sinon';
import history from '../../js/history.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { VelgArbeidssituasjon, mapStateToProps, erstattUrl } from "../../js/containers/TidslinjeVelgArbeidssituasjonContainer.js";
import Faner from "../../js/components/Faner.js";

describe("TidslinjeVelgArbeidssituasjonContainer", () => {

    let initState; 
    let ownProps = {};

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
            let props = mapStateToProps(initState, ownProps);
            expect(props.valgtArbeidssituasjon).to.equal("MED_ARBEIDSGIVER");

            initState.brukerinfo.innstillinger.arbeidssituasjon = "Olsen"
            let props2 = mapStateToProps(initState, ownProps);
            expect(props2.valgtArbeidssituasjon).to.equal("Olsen");            
        }); 


        it("Skal returnere arbeidssituasjoner", () => {
            let props = mapStateToProps(initState, ownProps);
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
            let component = shallow(<VelgArbeidssituasjon arbeidssituasjoner={initState.arbeidssituasjoner}/>)
            expect(component.find(Faner)).to.have.length(1);
        });

        it("Skal vise faner med riktige props", () => {
            let setArbeidssituasjonSpy = sinon.spy(); 
            let component = shallow(<VelgArbeidssituasjon arbeidssituasjoner={initState.arbeidssituasjoner} setArbeidssituasjon={setArbeidssituasjonSpy} valgtArbeidssituasjon="UTEN_ARBEIDSGIVER" />)
            let faner = component.find(Faner);
            expect(faner.prop("alternativer")).to.equal(initState.arbeidssituasjoner);
            expect(faner.prop("valgtAlternativ")).to.equal("UTEN_ARBEIDSGIVER");
        });

        it("Skal kalle på innsendt funksjon + redirect når man velger", () => {
            let setArbeidssituasjonSpy = sinon.spy(); 
            let redirStub = sinon.stub(VelgArbeidssituasjon.prototype, "redirect");
            let component = mount(<VelgArbeidssituasjon arbeidssituasjoner={initState.arbeidssituasjoner} setArbeidssituasjon={setArbeidssituasjonSpy} valgtArbeidssituasjon="UTEN_ARBEIDSGIVER" />)
            let faner = component.find(Faner);
            faner.find(".js-MED_ARBEIDSGIVER").simulate("click");
            expect(redirStub.calledOnce).to.be.true;
            expect(redirStub.getCall(0).args[0]).to.equal("med-arbeidsgiver");
            expect(setArbeidssituasjonSpy.calledOnce).to.be.true;
            expect(setArbeidssituasjonSpy.getCall(0).args[0]).to.equal("MED_ARBEIDSGIVER")
        })

    })

});