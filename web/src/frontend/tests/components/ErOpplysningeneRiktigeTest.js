import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";
import ErOpplysningeneRiktige, { HvilkeOpplysningerErIkkeRiktige, SykmeldingFeilaktigeOpplysningerInfo, DuTrengerNySykmelding, DuKanBrukeSykmeldingenDinDiagnoseAndre, DuKanBrukeSykmeldingenDinArbeidsgiver } from '../../js/components/sykmelding/ErOpplysningeneRiktige';
import Radiogruppe from '../../js/components/skjema/Radiogruppe';
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';
import Checkbox from '../../js/components/skjema/Checkbox';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe.only("Er", () => {

    describe("ErOpplysningeneRiktige", () => {

        it("Skal inneholde en Radiogruppe'", () => {
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} />);
            expect(component.find(Radiogruppe)).to.have.length(1);
        });

        it("Skal inneholde to input-felter", () => {
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} />);
            expect(component.find("input")).to.have.length(2);
        });

    });


    describe("HvilkeOpplysningerErIkkeRiktige", () => {
        
        it("Skal inneholde en Checkboxgruppe", () => {
            let component = shallow(<HvilkeOpplysningerErIkkeRiktige />);
            expect(component.find(Checkboxgruppe)).to.have.length(1);
        });

        it("Skal inneholde fem input-felter", () => {
            let component = shallow(<HvilkeOpplysningerErIkkeRiktige />);
            expect(component.find(Checkbox)).to.have.length(5);
        });

        it("Skal inneholde SykmeldingFeilaktigeOpplysningerInfo", () => {
            let component = shallow(<HvilkeOpplysningerErIkkeRiktige />)
            expect(component.contains(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={{}} />)).to.be.true;
        });

        it("Skal sette valgte feilaktige opplysninger til checked", () => {
            const feilaktigeOpplysninger = {
                periode: true,
                diagnose: true,
            }
            let component = mount(<HvilkeOpplysningerErIkkeRiktige feilaktigeOpplysninger={feilaktigeOpplysninger} sykmeldingId="33" ledetekster={ledetekster} />);
            expect(component.find("input[name='periode']")).to.be.checked();
            expect(component.find("input[name='diagnose']")).to.be.checked();
            expect(component.find("input[name='sykmeldingsgrad']")).not.to.be.checked();
            expect(component.find("input[name='andre']")).not.to.be.checked();
        });

        it("Skal kalle på setFeilaktigOpplysning når man velger en checkbox", () => {
            const spy = sinon.spy();
            let component = mount(<HvilkeOpplysningerErIkkeRiktige sykmeldingId="33" setFeilaktigOpplysning={spy} ledetekster={ledetekster} />);
            component.find("input[name='periode']").simulate("change");
            expect(spy.calledOnce).to.equal(true);
            expect(spy.getCall(0).args[0]).to.equal("33");
            expect(spy.getCall(0).args[1]).to.equal("periode");
            expect(spy.getCall(0).args[2]).to.equal(true);
        });

    });

    describe.only("SykmeldingFeilaktigeOpplysningerInfo", () => {

        it("Skal inneholde 'Du trenger ny sykmelding' dersom periode eller sykmeldingsgrad er blant de feilaktige opplysningene", () => {
            const feilaktigeOpplysninger1 = {
                periode: true
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuTrengerNySykmelding />)).to.be.true;

            const feilaktigeOpplysninger2 = {
                sykmeldingsgrad: true
            };
            let component2 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger2} />);
            expect(component2.contains(<DuTrengerNySykmelding />)).to.be.true;
        }); 

        it("Skal inneholde 'Du kan bruke sykmeldingen din Arbeidsgiver' dersom arbeidsgiver er den eneste feilaktige opplysningen", () => {
            const feilaktigeOpplysninger1 = {
                arbeidsgiver: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.true;
        }); 

        it("Skal inneholde 'Du kan bruke sykmeldingen din Arbeidsgiver' dersom arbeidsgiver og diagnose er de feilaktige opplysnignene", () => {
            const feilaktigeOpplysninger1 = {
                arbeidsgiver: true,
                diagnose: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.true;
            expect(component1.contains(<DuTrengerNySykmelding />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.false;
        }); 

        it("Skal inneholde 'Du trenger ny sykmelding' dersom periode og diagnose er de feilaktige opplysningene", () => {
            const feilaktigeOpplysninger1 = {
                periode: true,
                diagnose: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuTrengerNySykmelding />)).to.be.true;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.false;
        });

        it("Skal inneholde 'DuKanBrukeSykmeldingenDinDiagnoseAndre' dersom diagnose er den feilaktige opplysningen", () => {
            const feilaktigeOpplysninger1 = {
                diagnose: true,
            };
            let component1 = shallow(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={feilaktigeOpplysninger1} />);
            expect(component1.contains(<DuTrengerNySykmelding />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.false;
            expect(component1.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.true;
        });

        it("Skal returnere null dersom ingen opplysninger er feilaktige", () => {
            let component = shallow(<SykmeldingFeilaktigeOpplysningerInfo />);
            expect(component.contains(<DuTrengerNySykmelding />)).to.be.false;
            expect(component.contains(<DuKanBrukeSykmeldingenDinArbeidsgiver />)).to.be.false;
            expect(component.contains(<DuKanBrukeSykmeldingenDinDiagnoseAndre />)).to.be.false;    
        })

    }); 

});