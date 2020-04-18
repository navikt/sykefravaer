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
    DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiverDiagnoseAndre,
    DuKanBrukeSykmeldingenDinArbeidsgiverDiagnoseAndre,
    DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiver,
    DuKanBrukeSykmeldingenDinArbeidsgiverDiagnose,
    DuKanBrukeSykmeldingenDinSykmeldingsgradHoy,
    DuKanBrukeSykmeldingenDinDiagnose,
    DuKanBrukeSykmeldingenDinAndre,
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
            fields = [
                'periode',
                'sykmeldingsgrad',
                'sykmeldingsgradHoy',
                'arbeidsgiver',
                'diagnose',
                'andre',
            ];
            component = shallow(
                <VelgFeilaktigeOpplysninger fields={fields} meta={meta} />,
            );
        });

        it('Skal inneholde et Feilomrade', () => {
            expect(component.find(Feilomrade).prop('error')).to.deep.equal(
                meta.error,
            );
            expect(component.find(Feilomrade).prop('touched')).to.deep.equal(
                meta.touched,
            );
        });

        it('Skal inneholde ett checkbox-Field med riktig name-attributt per field', () => {
            expect(component.find(Field)).to.have.length(6);
            for (let i = 0; i < feilaktigeOpplysninger.length; i += 1) {
                const c = component.find(Field).at(i);
                expect(c.prop('component')).to.deep.equal(Checkbox);
                expect(c.prop('name')).to.equal(
                    `feilaktigeOpplysninger[${i}].avkrysset`,
                );
            }
        });
    });

    describe('HvilkeOpplysninger', () => {
        let fields;
        let meta;
        let component;
        let _feilaktigeOpplysninger;

        beforeEach(() => {
            fields = [
                'periode',
                'sykmeldingsgrad',
                'arbeidsgiver',
                'diagnose',
                'andre',
            ];
            _feilaktigeOpplysninger = [{ avkrysset: true, opplysning: 'periode' }];
            component = shallow(
                <HvilkeOpplysninger
                    feilaktigeOpplysninger={_feilaktigeOpplysninger}
                    fields={fields}
                    meta={meta}
                />,
            );
        });

        it('viser FeilaktigeOpplysningerInfo', () => {
            expect(component.find(FeilaktigeOpplysningerInfo)).to.have.length(1);
            expect(
                component
                    .find(FeilaktigeOpplysningerInfo)
                    .prop('feilaktigeOpplysninger'),
            ).to.deep.equal(_feilaktigeOpplysninger);
        });
    });

    describe('FeilaktigeOpplysningerInfo', () => {
        it('viser DuTrengerNySykmelding ved periode eller sykmeldingsgrad', () => {
            let comp = shallow(
                <FeilaktigeOpplysningerInfo
                    feilaktigeOpplysninger={[{ opplysning: 'periode', avkrysset: true }]}
                />,
            );
            expect(comp.find(DuTrengerNySykmelding)).to.be.length(1);

            comp = shallow(
                <FeilaktigeOpplysningerInfo
                    feilaktigeOpplysninger={[
                        { opplysning: 'sykmeldingsgrad', avkrysset: true },
                    ]}
                />,
            );
            expect(comp.find(DuTrengerNySykmelding)).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiverDiagnoseAndre ved sykmeldingsgradHoy, arbeidsgiver og diagnose (+ andre)', () => {
            const opplysninger = [
                { opplysning: 'sykmeldingsgradHoy', avkrysset: true },
                { opplysning: 'arbeidsgiver', avkrysset: true },
                { opplysning: 'diagnose', avkrysset: true },
            ];
            let comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysninger} />,
            );
            expect(
                comp.find(
                    DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiverDiagnoseAndre,
                ),
            ).to.be.length(1);

            opplysninger.push({ opplysning: 'andre', avkrysset: true });
            comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysninger} />,
            );
            expect(
                comp.find(
                    DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiverDiagnoseAndre,
                ),
            ).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinArbeidsgiverDiagnoseAndre ved arbeidsgiver, diagnose og andre', () => {
            const opplysninger = [
                { opplysning: 'arbeidsgiver', avkrysset: true },
                { opplysning: 'diagnose', avkrysset: true },
                { opplysning: 'andre', avkrysset: true },
            ];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysninger} />,
            );
            expect(
                comp.find(DuKanBrukeSykmeldingenDinArbeidsgiverDiagnoseAndre),
            ).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiver ved sykmeldingsgradHoy og arbeisgiver', () => {
            const opplysninger = [
                { opplysning: 'sykmeldingsgradHoy', avkrysset: true },
                { opplysning: 'arbeidsgiver', avkrysset: true },
            ];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysninger} />,
            );
            expect(
                comp.find(DuKanBrukeSykmeldingenDinSykmeldingsgradHoyArbeidsgiver),
            ).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinArbeidsgiverDiagnose ved arbeisgiver og diagnose', () => {
            const opplysninger = [
                { opplysning: 'arbeidsgiver', avkrysset: true },
                { opplysning: 'diagnose', avkrysset: true },
            ];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysninger} />,
            );
            expect(
                comp.find(DuKanBrukeSykmeldingenDinArbeidsgiverDiagnose),
            ).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinDiagnoseAndre ved diagnose og andre', () => {
            const opplysninger = [
                { opplysning: 'diagnose', avkrysset: true },
                { opplysning: 'andre', avkrysset: true },
            ];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysninger} />,
            );
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnoseAndre)).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinSykmeldingsgradHoy ved sykmeldingsgradHoy', () => {
            const opplysninger = [
                { opplysning: 'sykmeldingsgradHoy', avkrysset: true },
            ];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysninger} />,
            );
            expect(
                comp.find(DuKanBrukeSykmeldingenDinSykmeldingsgradHoy),
            ).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinArbeidsgiver', () => {
            const opplysniger = [{ opplysning: 'arbeidsgiver', avkrysset: true }];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysniger} />,
            );
            expect(comp.find(DuKanBrukeSykmeldingenDinArbeidsgiver)).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinDiagnose', () => {
            const opplysniger = [{ opplysning: 'diagnose', avkrysset: true }];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysniger} />,
            );
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnose)).to.be.length(1);
        });

        it('viser DuKanBrukeSykmeldingenDinAndre', () => {
            const opplysniger = [{ opplysning: 'andre', avkrysset: true }];
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={opplysniger} />,
            );
            expect(comp.find(DuKanBrukeSykmeldingenDinAndre)).to.be.length(1);
        });

        it.skip('viser DuKanBrukeSykmeldingenDinDiagnoseAndre ved diagnose eller andre', () => {
            let comp = shallow(
                <FeilaktigeOpplysningerInfo
                    feilaktigeOpplysninger={[{ opplysning: 'andre', avkrysset: true }]}
                />,
            );
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnoseAndre)).to.be.length(1);

            comp = shallow(
                <FeilaktigeOpplysningerInfo
                    feilaktigeOpplysninger={[{ opplysning: 'diagnose', avkrysset: true }]}
                />,
            );
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnoseAndre)).to.be.length(1);
        });

        it('viser null ellers', () => {
            const comp = shallow(
                <FeilaktigeOpplysningerInfo feilaktigeOpplysninger={[]} />,
            );
            expect(comp.find(DuKanBrukeSykmeldingenDinDiagnoseAndre)).to.be.length(0);
            expect(comp.find(DuKanBrukeSykmeldingenDinArbeidsgiver)).to.be.length(0);
            expect(comp.find(DuTrengerNySykmelding)).to.be.length(0);
        });
    });
});
