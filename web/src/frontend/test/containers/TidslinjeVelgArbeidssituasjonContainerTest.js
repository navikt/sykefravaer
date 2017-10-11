import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../mockLedetekster";
import sinon from 'sinon';
import history from '../../js/history';

chai.use(chaiEnzyme());
const expect = chai.expect;

import { VelgArbeidssituasjon, mapStateToProps, erstattUrl } from "../../js/containers/TidslinjeVelgArbeidssituasjonContainer";
import { Radiofaner } from "digisyfo-npm";

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
            ledetekster: {
                data: ledetekster
            }
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
                hjelpetekst: {
                    tittel: "Jeg har ikke arbeidsgiver",
                    tekst:"Velg «Jeg har ikke arbeidsgiver» dersom du er for eks. selvstendig næringsdrivende, frilanser eller arbeidsledig."
                }
            }]);
        });

    });

    describe("VelgArbeidssituasjon", () => {

        it("Skal vise faner", () => {
            let component = shallow(<VelgArbeidssituasjon arbeidssituasjoner={initState.arbeidssituasjoner}/>)
            expect(component.find(Radiofaner)).to.have.length(1);
        });

        it("Skal vise faner med riktige props", () => {
            let hentTidslinjerSpy = sinon.spy(); 
            let component = shallow(<VelgArbeidssituasjon arbeidssituasjoner={initState.arbeidssituasjoner} hentTidslinjer={hentTidslinjerSpy} valgtArbeidssituasjon="UTEN_ARBEIDSGIVER" />)
            let faner = component.find(Radiofaner);
            expect(faner.prop("alternativer")).to.equal(initState.arbeidssituasjoner);
            expect(faner.prop("valgtAlternativ")).to.equal("UTEN_ARBEIDSGIVER");
        });

        it("Skal kalle på innsendt funksjon + redirect når man velger", () => {
            let hentTidslinjerSpy = sinon.spy(); 
            let redirStub = sinon.spy(history, "replace");
            let component = mount(<VelgArbeidssituasjon arbeidssituasjoner={initState.arbeidssituasjoner} hentTidslinjer={hentTidslinjerSpy} valgtArbeidssituasjon="UTEN_ARBEIDSGIVER" />)
            let faner = component.find(Radiofaner);
            faner.find(".js-MED_ARBEIDSGIVER").simulate("change");
            expect(redirStub.calledOnce).to.be.true;
            expect(redirStub.getCall(0).args[0]).to.equal("/sykefravaer/tidslinjen/med-arbeidsgiver");
            expect(hentTidslinjerSpy.calledOnce).to.be.true;
            expect(hentTidslinjerSpy.getCall(0).args[1]).to.equal("MED_ARBEIDSGIVER")
        })

    })

});