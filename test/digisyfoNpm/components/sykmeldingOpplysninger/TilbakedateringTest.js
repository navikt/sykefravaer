import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import Tilbakedatering from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/Tilbakedatering';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('Tilbakedatering', () => {
    describe('dokumenterbarPasientkontakt', () => {
        it('Skal vise dersom sykmelding.dokumenterbarPasientkontakt === (dato)', () => {
            const component = shallow(<Tilbakedatering
                sykmelding={getParsetSykmelding({
                    tilbakedatering: {
                        dokumenterbarPasientkontakt: new Date('2015-12-31'),
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-dokumenterbarPasientkontakt').text()).to.equal('31. desember 2015');
        });

        it('Skal ikke vise dersom sykmelding.dokumenterbarPasientkontakt !== (dato)', () => {
            const component = shallow(<Tilbakedatering
                sykmelding={getParsetSykmelding({
                    tilbakedatering: {
                        dokumenterbarPasientkontakt: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-dokumenterbarPasientkontakt').length).to.equal(0);
        });
    });

    describe('tilbakedatertBegrunnelse', () => {
        it('Skal vise dersom sykmelding.tilbakedatertBegrunnelse === (dato)', () => {
            const component = shallow(<Tilbakedatering
                sykmelding={getParsetSykmelding({
                    tilbakedatering: {
                        tilbakedatertBegrunnelse: 'God grunn',
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-tilbakedatertBegrunnelse').text()).to.equal('God grunn');
        });

        it('Skal ikke vise dersom sykmelding.tilbakedatertBegrunnelse !== (dato)', () => {
            const component = shallow(<Tilbakedatering
                sykmelding={getParsetSykmelding({
                    tilbakedatering: {
                        tilbakedatertBegrunnelse: null,
                    },
                })}
                ledetekster={ledetekster} />);
            expect(component.find('.js-tilbakedatertBegrunnelse').length).to.equal(0);
        });
    });
});
