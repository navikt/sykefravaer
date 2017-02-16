import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import VelgArbeidssituasjon, { RendreVelgArbeidssituasjon } from '../../js/components/sykmelding/VelgArbeidssituasjon';
import { FieldArray, Field } from 'redux-form';

describe('VelgArbeidssituasjon', () => {

    describe("",() => {
        it("Har et field med RendreVelgArbeidssituasjon", () => {
            const comp = shallow(<VelgArbeidssituasjon ledetekster={{eple: 'kake'}}/>)
            const field = comp.find(Field);
            expect(field.props().component).to.be.equal(RendreVelgArbeidssituasjon);
        });
    });

    describe('RendreVelgArbeidssituasjon', () => {
        it("Har med default option om arbeidssituasjon ikke er valgt", () => {
            const input = {value: null};
            const meta = {};
            const comp = shallow(RendreVelgArbeidssituasjon({input, meta}));
            expect((comp.find('option').length)).to.be.equal(6);
        });

        it("Har med default option om default arbeidssituasjon er valgt", () => {
            const input = {value: 'default'};
            const meta = {};
            const comp = shallow(RendreVelgArbeidssituasjon({input, meta}));
            expect((comp.find('option').length)).to.be.equal(6);
        });

        it("Har ikke med default option om arbeidssituasjon er valgt", () => {
            const input = {value: 'frilanser'};
            const meta = {};
            const comp = shallow(RendreVelgArbeidssituasjon({input, meta}));
            expect((comp.find('option').length)).to.be.equal(5);
        });
    });
});