import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { RadioPanelGruppe } from 'nav-frontend-skjema';
import { BekreftEgenmeldingSkjemaComponent } from './BekreftEgenmeldingSkjema';
import getSykmelding from '../../../../test/mock/mockSykmeldinger';

chai.use(chaiEnzyme());
const { expect } = chai;

const props = {
    sykmelding: getSykmelding({
        id: '1',
    }),
    bekreftSykmelding: sinon.spy(),
    avbrytSykmelding: sinon.spy(),
    sender: false,
    sendingFeilet: false,
    avbryter: false,
    avbrytFeilet: false,
};

describe('BekreftEgenmeldingSkjema', () => {
    it('Vise avbrytfeilmelding når man trykker på nei', () => {
        const component = shallow(<BekreftEgenmeldingSkjemaComponent props={props} />);
        expect(component.find(RadioPanelGruppe)).to.have.length(2);
        // expect(component.find(RadioPanelGruppe).first().text()).to.contain('Er opplysningene riktige?');
    });
});
