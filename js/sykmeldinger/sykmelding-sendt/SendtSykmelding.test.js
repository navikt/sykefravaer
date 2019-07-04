import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { DineSykmeldingOpplysninger, setLedetekster } from '@navikt/digisyfo-npm';
import SendtSykmelding from './SendtSykmelding';
import SykmeldingStatuspanel from '../statuspanel/SykmeldingStatuspanel';
import ArbeidsgiversSykmeldingContainer from '../arbeidsgivers-sykmelding/ArbeidsgiversSykmeldingContainer';
import ledetekster from '../../../test/mock/mockLedetekster';
import getSykmelding from '../../../test/mock/mockSykmeldinger';

chai.use(chaiEnzyme());
const { expect } = chai;

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
