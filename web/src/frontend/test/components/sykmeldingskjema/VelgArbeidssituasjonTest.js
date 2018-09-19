import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import chaiEnzyme from 'chai-enzyme';
import VelgArbeidssituasjon, { RendreVelgArbeidssituasjon, Velg } from '../../../js/components/sykmeldingskjema/VelgArbeidssituasjon';
import VelgArbeidsgiverContainer from '../../../js/containers/sykmelding/VelgArbeidsgiverContainer';
import SporsmalMedTillegg from '../../../js/components/skjema/SporsmalMedTillegg';
import Radioknapper from '../../../js/components/skjema/Radioknapper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('VelgArbeidssituasjon', () => {
    it('Har et field med Velg', () => {
        const comp = shallow(<VelgArbeidssituasjon />);
        const field = comp.find(Field);
        expect(field.props().component).to.deep.equal(Velg);
    });

    describe('Velg', () => {
        let component;
        let props;

        beforeEach(() => {
            props = {};
            component = shallow(<Velg {...props} />);
        });

        it('Skal inneholde SporsmalMedTillegg', () => {
            expect(component.find(SporsmalMedTillegg)).to.have.length(1);
            expect(component.find(SporsmalMedTillegg).prop('Sporsmal')).to.deep.equal(<RendreVelgArbeidssituasjon {...props} />);
        });

        it('Skal inneholde SporsmalMedTillegg med riktig children', () => {
            expect(component.find(SporsmalMedTillegg).contains(<VelgArbeidsgiverContainer {...props} />)).to.equal(true);
        });

        it("Skal vise tillegg hvis arbeidssituasjon === 'ARBEIDSTAKER'", () => {
            props.input = {
                value: 'ARBEIDSTAKER',
            };
            expect(component.find(SporsmalMedTillegg).prop('visTillegg')(props)).to.equal(true);
        });

        it("Skal ikke vise tillegg hvis arbeidssituasjon === 'noe annet enn ARBEIDSTAKER'", () => {
            props.input = {
                value: 'noe annet enn ARBEIDSTAKER',
            };
            expect(component.find(SporsmalMedTillegg).prop('visTillegg')(props)).to.equal(false);
        });
    });

    describe('RendreVelgArbeidssituasjon', () => {
        it('Har viser 5 radioknapper', () => {
            const input = { value: null };
            const meta = {};
            const comp = shallow(<RendreVelgArbeidssituasjon input={input} meta={meta} />);
            expect(comp.find(Radioknapper)).to.have.length(1);
            expect(comp.find('i').length).to.be.equal(5);
        });
    });
});
