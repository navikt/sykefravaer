import chai from 'chai';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
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
        expect(component.find(RadioPanelGruppe).at(0).text()).to.contain('Er opplysningene riktige?');
        expect(component.find(RadioPanelGruppe).at(1).text()).to.contain('Hvilket arbeid gjelder egenmeldingen? Har du begge roller, velger du bare en av dem.');
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
        expect(component.find('.knapp--fare').length).to.equal(0);
        component
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'erOpplysningeneRiktige', value: 'nei' },
            });
        expect(component.find('.skjemaelement__feilmelding').length).to.equal(1);
        expect(component.find('.knapp--fare').length).to.equal(1);
    });

    // TODO: får ikke til simulate('click') på nav-knapper. Fungerer på vanlig button...
    it.skip('Sender inn riktig skjema når bruker trykker bekreft', () => {
        const component = mount(
            <BekreftEgenmeldingSkjemaComponent props={props} />,
        );
        component
            .find('input')
            .at(0)
            .simulate('change', {
                target: { name: 'erOpplysningeneRiktige', value: 'ja' },
            });
        component
            .find('input')
            .at(3)
            .simulate('change', {
                target: { name: 'arbeidssituasjon', value: 'FRILANSER' },
            });
        component.update();
        expect(component.find('button').text()).to.equal('Bekreft egenmeldingen');
        expect(component.find('button').html()).to.equal('Bekreft egenmeldingen');
        component.find('button').at(0).simulate('click', { target: { value: 1 } });
    });
});
