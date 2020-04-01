import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
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
    it('Viser feilmelding når man trykker på nei', () => {
        const component = mount(
            <BekreftEgenmeldingSkjemaComponent props={props} />,
        );
        expect(component.find(RadioPanelGruppe)).to.have.length(2);
        // expect(component.find(RadioPanelGruppe).first().text()).to.contain('Er opplysningene riktige?');
        expect(
            component
                .find('input')
                .at(0)
                .prop('value'),
        ).to.equal('ja');
        expect(
            component
                .find('input')
                .at(1)
                .prop('value'),
        ).to.equal('nei');
        expect(component.find('.skjemaelement__feilmelding').length).to.equal(0);
        component
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'erOpplysningeneRiktige', value: 'nei' },
            });
        expect(component.find('.skjemaelement__feilmelding').length).to.equal(1);
        expect(component.find('.knapp--fare').length).to.equal(1);
    });
});
