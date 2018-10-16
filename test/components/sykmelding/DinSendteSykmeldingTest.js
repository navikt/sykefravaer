import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { DineSykmeldingOpplysninger, setLedetekster } from 'digisyfo-npm';
import SendtSykmelding from '../../../js/components/sykmelding/SendtSykmelding';
import SykmeldingStatuspanel from '../../../js/components/sykmeldingstatuspanel/SykmeldingStatuspanel';
import ArbeidsgiversSykmeldingContainer from '../../../js/containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import ledetekster from '../../mockLedetekster';
import getSykmelding from '../../mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SendtSykmelding', () => {
    let component;

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it('Skal vise kvittering ', () => {
        const dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        component = shallow(<SendtSykmelding dinSykmelding={dinSykmelding} />);
        expect(component.find(SykmeldingStatuspanel)).to.have.length(1);
    });

    it('Skal vise DineSykmeldingOpplysninger ', () => {
        const dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        const arbeidsgiversSykmelding = {
            id: 'arbeidsgivers-sykmelding-id',
            test: 'olsen',
        };
        component = shallow(<SendtSykmelding dinSykmelding={dinSykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} />);
        expect(component.contains(<DineSykmeldingOpplysninger sykmelding={dinSykmelding} />)).to.equal(true);
    });

    it('Skal vise ArbeidsgiversSykmeldingContainer', () => {
        const dinSykmelding = getSykmelding();
        dinSykmelding.status = 'SENDT';
        const arbeidsgiversSykmelding = {
            id: 'arbeidsgivers-sykmelding-id',
            test: 'olsen',
        };
        component = shallow(<SendtSykmelding dinSykmelding={dinSykmelding} arbeidsgiversSykmelding={arbeidsgiversSykmelding} />);
        expect(component.contains(<ArbeidsgiversSykmeldingContainer sykmeldingId={dinSykmelding.id} />)).to.equal(true);
    });
});
