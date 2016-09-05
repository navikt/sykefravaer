import chai from 'chai';
import React from 'react'
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from "../ledetekster_mock.js";
import getSykmelding from "../mockSykmeldinger.js";
import ErOpplysningeneRiktige from '../../js/components/sykmelding/ErOpplysningeneRiktige';
import HvilkeOpplysningerErIkkeRiktige, { SykmeldingFeilaktigeOpplysningerInfo, DuTrengerNySykmelding, DuKanBrukeSykmeldingenDinDiagnoseAndre, DuKanBrukeSykmeldingenDinArbeidsgiver } from '../../js/components/sykmelding/HvilkeOpplysningerErIkkeRiktige';
import Radiogruppe from '../../js/components/skjema/Radiogruppe';
import Checkboxgruppe from '../../js/components/skjema/Checkboxgruppe';
import Checkbox from '../../js/components/skjema/Checkbox';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("Er", () => {

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

    describe("ErOpplysningeneRiktige", () => {

        it("Skal inneholde spørsmål", () => {
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} {...reduxFormProps} ledetekster={ledetekster} />);
            expect(component.text()).to.contain("Er opplysningene riktige?")
        }); 

        it("Skal inneholde to input-felter", () => {
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} {...reduxFormProps} ledetekster={ledetekster} />);
            expect(component.find("input")).to.have.length(2);
            expect(component.text()).to.contain("Ja, opplysningene er riktige")
            expect(component.text()).to.contain("Nei, opplysningene er ikke riktige")
        });

        it("Skal vise HvilkeOpplysningerErIkkeRiktige dersom opplysningene ikke er riktige", () => {
            reduxFormProps.fields.opplysningeneErRiktige.value = false;
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} {...reduxFormProps} ledetekster={ledetekster} />);
            expect(component.find(HvilkeOpplysningerErIkkeRiktige)).to.have.length(1);
        });

        it("Skal ikke vise HvilkeOpplysningerErIkkeRiktige dersom opplysningene er riktige", () => {
            reduxFormProps.fields.opplysningeneErRiktige.value = true;
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} {...reduxFormProps} ledetekster={ledetekster} />);
            expect(component.find(HvilkeOpplysningerErIkkeRiktige)).to.have.length(0);
        });

        it("Skal ikke vise HvilkeOpplysningerErIkkeRiktige dersom opplysningene er verken riktige eller uriktige", () => {
            reduxFormProps.fields.opplysningeneErRiktige.value = "";
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} {...reduxFormProps} ledetekster={ledetekster} />);
            expect(component.find(HvilkeOpplysningerErIkkeRiktige)).to.have.length(0);
        });

        it("Skal kalle untouch når man velger", () => {
            reduxFormProps.untouch = sinon.spy();
            let component = shallow(<ErOpplysningeneRiktige sykmelding={getSykmelding()} {...reduxFormProps} ledetekster={ledetekster} />);
            component.find("#radio-true").simulate("change", {
                target: {
                    value: true
                }
            });
            component.find("#radio-false").simulate("blur", {
                target: {
                    value: false
                }
            });
            expect(reduxFormProps.untouch.callCount).to.equal(4);
        });

    });

});