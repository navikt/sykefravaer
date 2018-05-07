import chai from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { SykmeldingNokkelOpplysning, nokkelopplysninger, Hjelpetekst } from 'digisyfo-npm';
import getSykmelding from '../mockSykmeldinger';
import StatusOpplysning from '../../js/components/StatusOpplysning';

chai.use(chaiEnzyme());
const expect = chai.expect;
const { STATUS } = nokkelopplysninger;

describe('StatusOpplysning', () => {
    it('Skal vise hjelpetekst for status === TIL_SENDING', () => {
        const comp = mount(<StatusOpplysning nokkelopplysning="STATUS" sykmelding={getSykmelding({ status: 'TIL_SENDING' })} />);
        expect(comp.find(Hjelpetekst)).to.have.length(1);
    });

    it('Skal ikke vise hjelpetekst for status !== TIL_SENDING', () => {
        const comp = mount(<StatusOpplysning nokkelopplysning="STATUS" sykmelding={getSykmelding({ status: 'NY' })} />);
        expect(comp.find(Hjelpetekst)).to.have.length(0);
    });

    it('En nøkkelopplysning som finnes i mappingen blir til et SykmeldingNokkelOpplysning - element', () => {
        const component = mount(<StatusOpplysning sykmelding={getSykmelding()} nokkelopplysning={STATUS} />);
        expect(component.find(SykmeldingNokkelOpplysning)).to.have.length(1);
    });

    it('Ukjent nøkkelattributt vises ikke', () => {
        const component = mount(<StatusOpplysning sykmelding={getSykmelding()} nokkelopplysning={'noe'} />);
        expect(component.find(SykmeldingNokkelOpplysning)).to.have.length(0);
    });
});
