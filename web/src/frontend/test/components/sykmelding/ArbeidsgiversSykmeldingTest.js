import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Utvidbar, ArbeidsgiversSykmeldingOpplysninger, setLedetekster } from 'digisyfo-npm';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../mockLedetekster';
import getSykmelding from '../../mockSykmeldinger';
import ArbeidsgiversSykmelding from '../../../js/components/sykmelding/ArbeidsgiversSykmelding';

chai.use(chaiEnzyme());
const expect = chai.expect;

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
