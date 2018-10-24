import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { DineSykmeldingOpplysninger, setLedetekster } from 'digisyfo-npm';
import ledetekster from '../../mock/mockLedetekster';
import getSykmelding from '../../mock/mockSykmeldinger';
import NySykmelding from '../../../js/components/sykmelding/NySykmelding';
import DinSykmeldingSkjemaContainer from '../../../js/containers/sykmelding/DinSykmeldingSkjemaContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

let component;

describe('NySykmelding -', () => {
    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it('Skal vise DineSykmeldingOpplysninger', () => {
        component = shallow(<NySykmelding sykmelding={getSykmelding()} />);

        expect(component.find(DineSykmeldingOpplysninger)).to.have.length(1);
        expect(component.find(DinSykmeldingSkjemaContainer)).to.have.length(1);

        expect(component.contains(<DineSykmeldingOpplysninger sykmelding={getSykmelding()} />)).to.equal(true);
        expect(component.contains(<DinSykmeldingSkjemaContainer sykmeldingId={getSykmelding().id} />)).to.equal(true);
    });
});
