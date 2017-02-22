import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import AndreInntektskilderComponent, { VelgInntektskilder, fields } from '../../../../js/components/sykepengesoknad/AktiviteterISykmeldingsperioden/AndreInntektskilder';
import { FieldArray, Field } from 'redux-form';
import Checkbox from '../../../../js/components/skjema/Checkbox';
import Radioknapper from '../../../../js/components/skjema/Radioknapper';
import ledetekster from '../../../mockLedetekster';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("AndreInntektskilder", () => {

    it("Skal returnere et FieldArray", () => {
        const compo = shallow(<AndreInntektskilderComponent />);
        const arr = compo.find(FieldArray);
        expect(arr).to.have.length(1);
        expect(arr.prop("fields")).to.equal(fields);
        expect(arr.prop("name")).to.equal("andreInntektskilder");
        expect(arr.prop("component")).to.deep.equal(VelgInntektskilder);
    });

    describe("VelgInntektskilder", () => {

        let component; 

        beforeEach(() => {
            const meta = { error: "Feil", touched: false };
            component = shallow(<VelgInntektskilder fields={fields} meta={meta} ledetekster={ledetekster} />);
        });

        it("Skal rendre to Field for hver field, unntatt Annet der det bare skal være én Field", () => {
            const fields = component.find(Field);
            expect(fields).to.have.length(11); 
        });

        describe("Inntektskilder", () => {

            beforeEach(() => {
                checkboxField = component.find(Field).first();
            })

            it("Skal sette riktig props på fields", () => {
                expect(checkboxField.prop("name")).to.equal("andreInntektskilder.ANDRE_ARBEIDSFORHOLD.avkrysset");
                expect(checkboxField.prop("label")).to.equal("Andre arbeidsforhold");
                expect(checkboxField.prop("component")).to.equal(Checkbox);
            });

            it("Skal inneholde et sett med radioknapper", () => {
                const radioknappField = checkboxField.children(); 
                expect(radioknappField).to.have.length(1);
                expect(radioknappField.prop("name")).to.equal("andreInntektskilder.ANDRE_ARBEIDSFORHOLD.sykmeldt")
                expect(radioknappField.prop("component")).to.equal(Radioknapper)
            });

        });

        describe("Annet", () => {

            beforeEach(() => {
                checkboxField = component.find(Field).last();
            })

            it("Skal sette riktig props på fields", () => {
                expect(checkboxField.prop("name")).to.equal("andreInntektskilder.ANNET.avkrysset");
                expect(checkboxField.prop("label")).to.equal("Annet");
                expect(checkboxField.prop("component")).to.equal(Checkbox);
            });

            it("Skal ikke inneholde et sett med radioknapper", () => {
                const radioknappField = checkboxField.children(); 
                expect(radioknappField).to.have.length(0);
            });

        })

    });

});
