import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import TidslinjeUtdrag, { VelgArbeidssituasjon } from './TidslinjeUtdrag';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TidslinjeUtdrag', () => {
    beforeEach(() => {
        window.dataLayer = [];
    });

    it('Skal vise VelgArbeidssituasjon dersom visning === VALGFRI', () => {
        const component = shallow(<TidslinjeUtdrag antallDager={5} visning="VALGFRI" />);
        expect(component.find(VelgArbeidssituasjon)).to.have.length(1);
    });

    it('Skal ikke vise VelgArbeidssituasjon hvis visning === MED_ARBEIDSGIVER', () => {
        const component = shallow(<TidslinjeUtdrag antallDager={5} visning="MED_ARBEIDSGIVER" />);
        expect(component.find(VelgArbeidssituasjon)).to.have.length(0);
    });

    it('Skal ikke vise VelgArbeidssituasjon hvis visning === UTEN_ARBEIDSGIVER', () => {
        const component = shallow(<TidslinjeUtdrag antallDager={5} visning="UTEN_ARBEIDSGIVER" />);
        expect(component.find(VelgArbeidssituasjon)).to.have.length(0);
    });

    it('Skal ikke vise VelgArbeidssituasjon hvis visning === UTEN_ARBEIDSGIVER', () => {
        const component = shallow(<TidslinjeUtdrag antallDager={5} visning="UTEN_ARBEIDSGIVER" />);
        expect(component.find(VelgArbeidssituasjon)).to.have.length(0);
    });

    it('Uthenting av tekst', () => {
        const component = shallow(<TidslinjeUtdrag antallDager={16} visning="MED_ARBEIDSGIVER" />);
        expect(component.instance().getTekstObjekt().tom).to.equal(16);
    });

    it('Uthenting av tekst skal funke når antallDager ikke er satt', () => {
        const component = shallow(<TidslinjeUtdrag visning="MED_ARBEIDSGIVER" />);
        expect(component.html()).to.equal(null);
    });
});
