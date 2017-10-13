import chai from 'chai';
import React from 'react'
import {mount, shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import VelgArbeidssituasjon, { RendreVelgArbeidssituasjon, Velg } from '../../../js/components/sykmeldingskjema/VelgArbeidssituasjon';
import VelgArbeidsgiverContainer from '../../../js/containers/sykmelding/VelgArbeidsgiverContainer';
import SporsmalMedTillegg from '../../../js/components/skjema/SporsmalMedTillegg';
import { FieldArray, Field } from 'redux-form';

describe('VelgArbeidssituasjon', () => {

    it("Har et field med Velg", () => {
        const comp = shallow(<VelgArbeidssituasjon />)
        const field = comp.find(Field);
        expect(field.props().component).to.deep.equal(Velg);
    });

    describe("Velg", () => {
        let component;
        let props;

        beforeEach(() => {
            props = {}
            component = shallow(<Velg {...props} />)
        })

        it("Skal inneholde SporsmalMedTillegg", () => {
            expect(component.find(SporsmalMedTillegg)).to.have.length(1); 
            expect(component.find(SporsmalMedTillegg).prop("Sporsmal")).to.deep.equal(<RendreVelgArbeidssituasjon {...props} />)
        });

        it("Skal inneholde SporsmalMedTillegg med riktig children", () => {
            expect(component.find(SporsmalMedTillegg).contains(<VelgArbeidsgiverContainer {...props} />)).to.be.true;
        });

        it("Skal vise tillegg hvis arbeidssituasjon === 'ARBEIDSTAKER'", () => {
            props.input = {
                value: "ARBEIDSTAKER"
            }
            expect(component.find(SporsmalMedTillegg).prop("visTillegg")(props)).to.be.true;
        }); 

        it("Skal ikke vise tillegg hvis arbeidssituasjon === 'noe annet enn ARBEIDSTAKER'", () => {
            props.input = {
                value: "noe annet enn ARBEIDSTAKER"
            }
            expect(component.find(SporsmalMedTillegg).prop("visTillegg")(props)).to.be.false;
        }); 
    })

    describe('RendreVelgArbeidssituasjon', () => {
    
        it("Har med default option om arbeidssituasjon ikke er valgt", () => {
            const input = {value: null};
            const meta = {};
            const comp = shallow(RendreVelgArbeidssituasjon({input, meta}));
            expect((comp.find('option').length)).to.be.equal(6);
        });

        it("Har med default option om default arbeidssituasjon er valgt", () => {
            const input = {value: 'DEFAULT'};
            const meta = {};
            const comp = shallow(RendreVelgArbeidssituasjon({input, meta}));
            expect((comp.find('option').length)).to.be.equal(6);
        });

        it("Har ikke med default option om arbeidssituasjon er valgt", () => {
            const input = {value: 'FRILANSER'};
            const meta = {};
            const comp = shallow(RendreVelgArbeidssituasjon({input, meta}));
            expect((comp.find('option').length)).to.be.equal(5);
        });

    });

});