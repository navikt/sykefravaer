import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import SykmeldingPeriode from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/SykmeldingPeriode';

const { expect } = chai;
chai.use(chaiEnzyme());

const toDate = (obj) => {
    const s = new Date();
    s.setYear(obj.year);
    s.setMonth(`0${obj.monthValue}`);
    s.setDate(obj.dayOfMonth);
    return s;
};

describe('SykmeldingPeriode', () => {
    it('Viser grad dersom sykmeldingen er gradert', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: 60,
                behandlingsdager: null,
                reisetilskudd: false,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-grad').text()).to.equal('60 % sykmeldt');
    });

    it('Skal vise antall dager', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: 100,
            }}
            ledetekster={ledetekster}
            antallDager={16} />);
        expect(periode.text()).to.contain('16');
        expect(periode.text()).to.contain('dager');
    });

    it('Viser grad dersom sykmeldingen er ugradert (100 % sykmeldt)', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: 100,
                behandlingsdager: null,
                reisetilskudd: false,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-grad').text()).to.equal('100 % sykmeldt');
    });

    it('Viser ikke grad, men behandlingsdager, dersom sykmeldingen har behandlingsdager', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: null,
                behandlingsdager: 5,
                reisetilskudd: false,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-grad').length).to.equal(0);
        expect(periode.find('.js-behandlingsdager').length).to.equal(1);
        expect(periode.find('.js-behandlingsdager').text()).to.equal('5 behandlingsdager');
    });

    it('Viser ikke behandlingsdager, dersom sykmeldingen ikke har behandlingsdager', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: null,
                behandlingsdager: null,
                reisetilskudd: false,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-grad').length).to.equal(0);
        expect(periode.find('.js-behandlingsdager').length).to.equal(0);
    });

    it('Viser reisetilskudd dersom sykmeldingen er gradert med reisetilskudd', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: 45,
                behandlingsdager: 5,
                reisetilskudd: true,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-grad').text()).to.equal('45 % sykmeldt med reisetilskudd');
    });

    it('Viser reisetilskudd dersom sykmeldingen er ugradert med reisetilskudd', () => {
        const periode1 = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: null,
                behandlingsdager: null,
                reisetilskudd: true,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode1.find('.js-grad').length).to.equal(0);
        expect(periode1.find('.js-reisetilskudd').text()).to.equal('Reisetilskudd');
    });

    it('Viser ikke reisetilskudd dersom sykmeldingen ikke har reisetilskudd', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: 45,
                behandlingsdager: 5,
                reisetilskudd: null,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-grad').text()).to.equal('45 % sykmeldt');
        expect(periode.find('.js-reisetilskudd').length).to.equal(0);
    });

    it('Viser avventende + innspill til arbeidsgiver dersom sykmeldingen er avventende', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: null,
                behandlingsdager: 5,
                reisetilskudd: true,
                avventende: 'Gi henne en ny og bedre stol',
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-grad').length).to.equal(0);
        expect(periode.find('.js-avventende').text()).to.equal('Avventende sykmelding');
        expect(periode.text()).to.contain('Innspill til arbeidsgiver om tilrettelegging');
        expect(periode.text()).to.contain('Gi henne en ny og bedre stol');
    });

    it('Viser ikke avventende dersom sykmeldingen ikke er avventende', () => {
        const periode = shallow(<SykmeldingPeriode
            periode={{
                fom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 1 }),
                tom: toDate({ year: 2016, monthValue: 5, dayOfMonth: 16 }),
                grad: 45,
                behandlingsdager: 5,
                reisetilskudd: true,
                avventende: null,
            }}
            ledetekster={ledetekster} />);
        expect(periode.find('.js-avventende').length).to.equal(0);
    });
});
