import chai from 'chai';
import React from 'react';
import { shallow, mount } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { nokkelopplysninger } from 'digisyfo-npm';
import getSykmelding from '../mockSykmeldinger';
import StatusPanel from '../../js/components/StatusPanel';
import StatusOpplysning from '../../js/components/StatusOpplysning';

chai.use(chaiEnzyme());
const expect = chai.expect;

const { ARBEIDSGIVER, INNSENDT_DATO, STATUS } = nokkelopplysninger;

describe('StatusPanelTest', () => {
    let component;

    it('Ingen rader eller elementer gir ingen output', () => {
        component = shallow(<StatusPanel sykmelding={getSykmelding()} nokkelopplysninger={[]} />);
        expect(component.find(StatusOpplysning)).to.have.length(0);
        expect(component.find('.js-rad')).to.have.length(0);
    });

    it('En enkelt rad, med et element gir en container og et element', () => {
        component = mount(<StatusPanel sykmelding={getSykmelding()} nokkelopplysninger={[[STATUS]]} />);
        expect(component.find(StatusOpplysning)).to.have.length(1);
        expect(component.find('.js-rad')).to.have.length(1);
    });

    it('En enkelt rad, med to elementer gir en container og to elementer', () => {
        component = mount(<StatusPanel sykmelding={getSykmelding()} nokkelopplysninger={[[STATUS, INNSENDT_DATO]]} />);
        expect(component.find(StatusOpplysning)).to.have.length(2);
        expect(component.find('.js-rad')).to.have.length(1);
    });

    it('To rader, med et element hver gir to containere og to elementer', () => {
        component = mount(<StatusPanel sykmelding={getSykmelding()} nokkelopplysninger={[[STATUS], [INNSENDT_DATO]]} />);
        expect(component.find(StatusOpplysning)).to.have.length(2);
        expect(component.find('.js-rad')).to.have.length(2);
    });

    it('To rader, med tre elementer hver gir tre containere og 9 elementer', () => {
        const _nokkelopplysninger = [[STATUS, INNSENDT_DATO, ARBEIDSGIVER], [STATUS, INNSENDT_DATO, ARBEIDSGIVER], [STATUS, INNSENDT_DATO, ARBEIDSGIVER]];

        component = mount(<StatusPanel sykmelding={getSykmelding()} nokkelopplysninger={_nokkelopplysninger} />);
        expect(component.find(StatusOpplysning)).to.have.length(9);
        expect(component.find('.js-rad')).to.have.length(3);
    });

    it('To rader, med 3/2/1 elementer hver gir tre containere og 6 elementer', () => {
        const _nokkelopplysninger = [[STATUS, INNSENDT_DATO, ARBEIDSGIVER], [STATUS, INNSENDT_DATO], [STATUS]];

        component = mount(<StatusPanel sykmelding={getSykmelding()} nokkelopplysninger={_nokkelopplysninger} />);
        expect(component.find(StatusOpplysning)).to.have.length(6);
        expect(component.find('.js-rad')).to.have.length(3);
    });

    it('Skal ha med children', () => {
        const _nokkelopplysninger = [[STATUS]];

        component = mount(<StatusPanel sykmelding={getSykmelding()} nokkelopplysninger={_nokkelopplysninger}><button>Children</button></StatusPanel>);
        expect(component.find(StatusOpplysning)).to.have.length(1);
        expect(component.find('button')).to.have.length(1);
        expect(component.find('.js-rad')).to.have.length(1);
    });
});
