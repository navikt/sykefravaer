import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { DineSykmeldingOpplysninger, setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../mockLedetekster';
import getSykmelding from '../../mockSykmeldinger';
import DinSykmelding from '../../../js/components/sykmelding/DinSykmelding';
import DinSykmeldingSkjemaContainer from '../../../js/containers/sykmelding/DinSykmeldingSkjemaContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

let component;

describe('DinSykmelding -', () => {
    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it('Skal vise DineSykmeldingOpplysninger', () => {
        component = shallow(<DinSykmelding sykmelding={getSykmelding()} />);

        expect(component.find(DineSykmeldingOpplysninger)).to.have.length(1);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(1);

        expect(component.contains(<DineSykmeldingOpplysninger sykmelding={getSykmelding()} />)).to.equal(true);
        expect(component.contains(<DinSykmeldingSkjemaContainer sykmeldingId={getSykmelding().id} />)).to.equal(true);
    });
});
