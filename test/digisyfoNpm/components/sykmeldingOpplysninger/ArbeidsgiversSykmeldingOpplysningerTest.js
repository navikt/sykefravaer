import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mock/mockLedetekster';
import { getParsetSykmelding } from '../../mock/mockSykmeldinger';
import FlereOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/FlereOpplysninger';
import ArbeidsgiversNokkelopplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/ArbeidsgiversNokkelopplysninger';
import ArbeidsgiversSykmeldingOpplysninger from '../../../../js/digisyfoNpm/components/sykmeldingOpplysninger/ArbeidsgiversSykmeldingOpplysninger';

chai.use(chaiEnzyme());
const { expect } = chai;

let component;

describe('ArbeidsgiversSykmelding', () => {
    beforeEach(() => {
        component = shallow(<ArbeidsgiversSykmeldingOpplysninger sykmelding={getParsetSykmelding()} ledetekster={ledetekster} />);
    });

    it('Skal vise fødselsnummer', () => {
        expect(component.find('.js-fnr').text()).to.equal('12121200000');
    });

    it('Viser Nokkelopplysninger', () => {
        expect(component.find(ArbeidsgiversNokkelopplysninger)).to.have.length(1);
    });

    it('Viser FlereOpplysninger', () => {
        expect(component.find(FlereOpplysninger)).to.have.length(1);
    });
});
