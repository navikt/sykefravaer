import chai from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import SykmeldingPeriode from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/SykmeldingPeriode';
import SykmeldingPerioder from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/SykmeldingPerioder';

const { expect } = chai;

chai.use(chaiEnzyme());

describe('SykmeldingPerioder', () => {
    it('Viser ingen perioder dersom man ikke har noen perioder', () => {
        const component = shallow(<SykmeldingPerioder perioder={[]} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPeriode)).to.have.length(0);
    });

    it('Viser en periode per periode dersom man har perioder', () => {
        const perioder = [
            {
                fom: new Date('2015-04-08'),
                tom: new Date('2015-04-18'),
                grad: 100,
            }, {
                fom: new Date('2015-04-08'),
                tom: new Date('2015-04-18'),
                grad: 100,
            }, {
                fom: new Date('2015-04-08'),
                tom: new Date('2015-04-18'),
                grad: 100,
            }];
        const component = shallow(<SykmeldingPerioder perioder={perioder} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPeriode)).to.have.length(3);
    });

    it('Viser perioder sortert på eldste først', () => {
        const perioder = [{
            fom: new Date('2015-04-08'),
            tom: new Date('2015-04-18'),
            grad: 100,
        }, {
            fom: new Date('2015-04-07'),
            tom: new Date('2015-04-14'),
            grad: 100,
        }];

        const component = mount(<SykmeldingPerioder perioder={perioder} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPeriode).at(0).props().periode).to.deep.equal(
            {
                fom: new Date('2015-04-07'),
                tom: new Date('2015-04-14'),
                grad: 100,
            },
        );
    });

    it('Viser korteste perioder først ved samme FOM', () => {
        const perioder = [{
            fom: new Date('2015-04-07'),
            tom: new Date('2015-04-13'),
            grad: 100,
        }, {
            fom: new Date('2015-04-07'),
            tom: new Date('2015-04-16'),
            grad: 100,
        }];

        const component = mount(<SykmeldingPerioder perioder={perioder} ledetekster={ledetekster} />);
        expect(component.find(SykmeldingPeriode).first().props().periode).to.deep.equal({
            fom: new Date('2015-04-07'),
            tom: new Date('2015-04-13'),
            grad: 100,
        });
    });
});
