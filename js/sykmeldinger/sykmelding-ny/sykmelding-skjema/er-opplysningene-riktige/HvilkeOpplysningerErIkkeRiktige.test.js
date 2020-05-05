import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Field } from 'redux-form';
import Checkbox from '../../../../components/skjema/Checkbox';
import {
    HvilkeOpplysninger,
    VelgFeilaktigeOpplysninger,
    FeilaktigeOpplysningerInfo,
    DuTrengerNySykmelding,
    DuKanBrukeSykmeldingenDinArbeidsgiver,
    DuKanBrukeSykmeldingenDinDiagnoseAndre,
} from './HvilkeOpplysningerErIkkeRiktige';
import Feilomrade from '../../../../components/skjema/Feilomrade';
import { feilaktigeOpplysninger } from './ErOpplysningeneRiktige';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('HvilkeOpplysningerErIkkeRiktige', () => {
    describe('VelgFeilaktigeOpplysninger', () => {
        let component;
        let fields;
        let meta;

        beforeEach(() => {
            meta = {
                error: 'Feilmelding',
                touched: false,
            };
            fields = ['periode', 'sykmeldingsgrad', 'arbeidsgiver', 'diagnose', 'andre'];
            component = shallow(<VelgFeilaktigeOpplysninger fields={fields} meta={meta} />);
        });


        it('Skal inneholde et Feilomrade', () => {
            expect(component.find(Feilomrade).prop('error')).to.deep.equal(meta.error);
            expect(component.find(Feilomrade).prop('touched')).to.deep.equal(meta.touched);
        });

        it('Skal inneholde ett checkbox-Field med riktig name-attributt per field', () => {
            expect(component.find(Field)).to.have.length(5);
            for (let i = 0; i < feilaktigeOpplysninger.length; i += 1) {
                const c = component.find(Field).at(i);
                expect(c.prop('component')).to.deep.equal(Checkbox);
                expect(c.prop('name')).to.equal(`feilaktigeOpplysninger[${i}].avkrysset`);
            }
        });
    });

    describe('HvilkeOpplysninger', () => {
        let fields;
        let meta;
        let component;
        let _feilaktigeOpplysninger;

        beforeEach(() => {
            fields = ['periode', 'sykmeldingsgrad', 'arbeidsgiver', 'diagnose', 'andre'];
            _feilaktigeOpplysninger = [{ avkrysset: true, opplysning: 'periode' }];
            component = shallow(<HvilkeOpplysninger feilaktigeOpplysninger={_feilaktigeOpplysninger} fields={fields} meta={meta} />);
        });

        it('viser FeilaktigeOpplysningerInfo', () => {
            expect(component.find(FeilaktigeOpplysningerInfo)).to.have.length(1);
            expect(component.find(FeilaktigeOpplysningerInfo).prop('feilaktigeOpplysninger')).to.deep.equal(_feilaktigeOpplysninger);
        });
    });

    describe('FeilaktigeOpplysningerInfo', () => {
        it('viser DuTrengerNySykmelding ved periode eller sykmeldingsgrad', () => {
            let comp = shallow(<FeilaktigeOpplysningerInfo feilaktigeOpplysninger={[{ opplysning: 'periode', avkrysset: true }]} />);
            expect(comp.find(DuTrengerNySykmelding)).to.be.length(1);

            comp = shallow(<FeilaktigeOpplysningerInfo feilaktigeOpplysninger={[{ opplysning: 'sykmeldingsgrad', avkrysset: true }]} />);
            expect(comp.find(DuTrengerNySykmelding)).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinArbeidsgiver', () => {
            const comp = shallow(<FeilaktigeOpplysningerInfo feilaktigeOpplysninger={[{ opplysning: 'arbeidsgiver', avkrysset: true }]} />);
            expect(comp.find(DuKanBrukeSykmeldingenDinArbeidsgiver)).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinDiagnoseAndre ved diagnose eller andre', () => {
            let comp = shallow(<FeilaktigeOpplysningerInfo feilaktigeOpplysninger={[{ opplysning: 'andre', avkrysset: true }]} />);
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnoseAndre)).to.be.length(1);

            comp = shallow(<FeilaktigeOpplysningerInfo feilaktigeOpplysninger={[{ opplysning: 'diagnose', avkrysset: true }]} />);
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnoseAndre)).to.be.length(1);
        });

        it('viser null ellers', () => {
            const comp = shallow(<FeilaktigeOpplysningerInfo feilaktigeOpplysninger={[]} />);
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnoseAndre)).to.be.length(0);
            expect(comp.find(DuKanBrukeSykmeldingenDinArbeidsgiver)).to.be.length(0);
            expect(comp.find(DuTrengerNySykmelding)).to.be.length(0);
        });
    });
});
