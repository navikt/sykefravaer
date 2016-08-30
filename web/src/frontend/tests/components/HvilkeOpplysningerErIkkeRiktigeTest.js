import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";
import HvilkeOpplysningerErIkkeRiktige, { SykmeldingFeilaktigeOpplysningerInfo, DuTrengerNySykmelding, DuKanBrukeSykmeldingenDinDiagnoseAndre, DuKanBrukeSykmeldingenDinArbeidsgiver } from '../../js/components/sykmelding/HvilkeOpplysningerErIkkeRiktige';
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("HvilkeOpplysningerErIkkeRiktige", () => {

    const getField = (value) => {
        const changeSpy = sinon.spy();
        const blurSpy = sinon.spy();

        return {
            value,
            onChange: changeSpy,
            onBlur: blurSpy,
        }
    }

    let reduxFormProps = {}

    beforeEach(() => {
        reduxFormProps = {
            fields: {
                opplysningeneErRiktige: getField(""),
                feilaktigeOpplysninger: getField(""),
                arbeidssituasjon: getField(""),
                valgtArbeidsgiver: getField("")
            },
            handleSubmit: () => {
                return;
            }
        }
    });
    
    it("Skal inneholde en Checkboxgruppe", () => {
        let component = shallow(<HvilkeOpplysningerErIkkeRiktige {...reduxFormProps} />);
        expect(component.find(Checkboxgruppe)).to.have.length(1);
    });

    it("Skal inneholde fem input-felter", () => {
        let component = shallow(<HvilkeOpplysningerErIkkeRiktige {...reduxFormProps}  />);
        expect(component.find("input[type='checkbox']")).to.have.length(5);
    });

    it("Skal inneholde SykmeldingFeilaktigeOpplysningerInfo", () => {
        let component = shallow(<HvilkeOpplysningerErIkkeRiktige {...reduxFormProps}  />)
        expect(component.contains(<SykmeldingFeilaktigeOpplysningerInfo feilaktigeOpplysninger={{}} />)).to.be.true;
    });

    it("Skal sette valgte feilaktige opplysninger til checked", () => {
        const feilaktigeOpplysninger = {
            periode: true,
            diagnose: true,
        }
        reduxFormProps.fields.feilaktigeOpplysninger.value = feilaktigeOpplysninger;
        let component = mount(<HvilkeOpplysningerErIkkeRiktige {...reduxFormProps} sykmeldingId="33" ledetekster={ledetekster} />);
        expect(component.find("input[name='periode']")).to.be.checked();
        expect(component.find("input[name='diagnose']")).to.be.checked();
        expect(component.find("input[name='sykmeldingsgrad']")).not.to.be.checked();
        expect(component.find("input[name='andre']")).not.to.be.checked();
    });

    it("Skal kalle onChange når man velger en checkbox", () => {
        const spy = sinon.spy();
        reduxFormProps.fields.feilaktigeOpplysninger.onChange = spy;
        let component = mount(<HvilkeOpplysningerErIkkeRiktige sykmeldingId="33" setFeilaktigOpplysning={spy} ledetekster={ledetekster}  {...reduxFormProps} />);
        component.find("input[name='periode']").simulate("change", {
            target: {
                checked: true
            }
        });
        component.find("input[name='sykmeldingsgrad']").simulate("change", {
            target: {
                checked: false
            }
        });
        expect(spy.calledTwice).to.equal(true);
        expect(spy.getCall(0).args[0]).to.deep.equal({
            periode: true
        });
        expect(spy.getCall(1).args[0]).to.deep.equal({
            sykmeldingsgrad: false
        });
    });

    describe("SykmeldingFeilaktigeOpplysningerInfo", () => {

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

