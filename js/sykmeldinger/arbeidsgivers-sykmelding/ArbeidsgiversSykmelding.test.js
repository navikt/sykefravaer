import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { Utvidbar, ArbeidsgiversSykmeldingOpplysninger, setLedetekster } from '../../digisyfoNpm';
import ledetekster from '../../../test/mock/mockLedetekster';
import getSykmelding from '../../../test/mock/mockSykmeldinger';
import ArbeidsgiversSykmelding from './ArbeidsgiversSykmelding';

chai.use(chaiEnzyme());
const { expect } = chai;

let component;

describe('ArbeidsgiversSykmelding', () => {
    beforeEach(() => {
        setLedetekster(ledetekster);
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} />);
    });

    it('Skal inneholde Utvidbar', () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} />);
        expect(component.find(Utvidbar)).to.have.length(1);
    });

    it('Skal inneholde ArbeidsgiversSykmeldingOpplysninger', () => {
        component = shallow(<ArbeidsgiversSykmelding sykmelding={getSykmelding()} />);
        expect(component.find(ArbeidsgiversSykmeldingOpplysninger)).to.have.length(1);
    });
});
