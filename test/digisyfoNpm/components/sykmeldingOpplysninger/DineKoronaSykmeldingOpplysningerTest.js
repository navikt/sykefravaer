import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import DineKoronaSykmeldingOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/DineKoronaSykmeldingOpplysninger';
import SykmeldingPerioder from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/SykmeldingPerioder';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('DineKoronaSykmeldingOpplysninger', () => {
    let component;

    it('Skal vise perioder', () => {
        component = shallow(<DineKoronaSykmeldingOpplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPerioder)).to.have.length(1);
    });

    describe('hoveddiagnose', () => {
        it('Skal vise hoveddiagnose dersom den finnes', () => {
            component = mount(<DineKoronaSykmeldingOpplysninger
                sykmelding={getParsetSykmelding()}
                ledetekster={ledetekster} />);
            expect(component.find('.js-hoveddiagnose').text()).to.equal('Influensa');
            expect(component.find('.js-hoveddiagnose-kode').text()).to.contain('LP2');
            expect(component.find('.js-hoveddiagnose-system').text()).to.contain('ICPC');
        });

        it('Skal ikke vise informasjon om at diagnose ikke sendes til arbeidsgiver', () => {
            component = mount(<DineKoronaSykmeldingOpplysninger
                sykmelding={getParsetSykmelding()}
                ledetekster={ledetekster} />);
            expect(component.find('.js-diagnose-meta')).to.have.length(0);
        });

        it('Skal ikke vise hoveddiagnose dersom den ikke finnes', () => {
            component = mount(<DineKoronaSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        hoveddiagnose: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-hoveddiagnose').length).to.equal(0);
            expect(component.find('.js-hoveddiagnose-kode').length).to.equal(0);
            expect(component.find('.js-hoveddiagnose-system').length).to.equal(0);
        });

        it('Skal ikke vise bidiagnose dersom det finnes', () => {
            component = mount(<DineKoronaSykmeldingOpplysninger
                sykmelding={getParsetSykmelding({
                    diagnose: {
                        bidiagnoser: [{
                            diagnose: 'Mageknipe',
                            diagnosesystem: 'IZPZ',
                            diagnosekode: 'LP3',
                        }],
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-bidiagnose').length).to.equal(0);
        });
    });
});
