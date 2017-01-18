import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Soknader from "../../js/components/soknader/Soknader";
import SoknaderTeasere from "../../js/components/soknader/SoknaderTeasere";
import Sidetopp from "../../js/components/Sidetopp";

describe("Søknader om sykepenger", () => {

    const ledetekster = {
        'soknader.introduksjonstekst': 'introtekst',
        'soknader.sidetittel': 'tittel',
    };

    let component;

    it('skal vise tittel', () => {
        component = shallow(<Soknader ledetekster={ledetekster} soknader={[]} />);
        expect(component.find(Sidetopp)).to.have.length(1);
    });

    it('skal vise søknader til behandlings boks', () => {
        component = shallow(<Soknader ledetekster={ledetekster} soknader={[]} />);
        expect(component.find(SoknaderTeasere)).to.have.length(1);
    });

    it('viser ikke innsendte om innsendte soknader er tom', () => {
        component = shallow(<Soknader ledetekster={ledetekster} soknader={[]} />);
        expect(component.find(".js-sendt")).to.have.length(0);
    });

    it('viser innsendte søknader om vi har noen', () => {
        const soknad = {id: 1, status: 'SENDT', fom: '01.01.2017', tom: '01.20.2017', arbeidsgiver: 'BEKK Consulting AS', innsendingsDato: '02.01.2017'}

        component = shallow(<Soknader ledetekster={ledetekster} soknader={[soknad]} />);
        expect(component.find(".js-sendt")).to.have.length(1);
    });

    it('sokander sendes videre til SoknaderTeasere', () => {

        component = shallow(<Soknader ledetekster={ledetekster} soknader={[{id: 1, status: 'SENDT' }, {id: 2, status: 'NY' }]} />);
        expect(component.find('.js-til-behandling').props().soknader).to.have.length(1);
        expect(component.find('.js-sendt').props().soknader).to.have.length(1);
    });
}); 