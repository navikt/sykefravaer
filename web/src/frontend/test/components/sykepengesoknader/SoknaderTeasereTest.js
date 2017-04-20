import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import SoknaderTeaser from '../../../js/components/sykepengesoknader/SoknaderTeaser';
import SoknaderTeasere from '../../../js/components/sykepengesoknader/SoknaderTeasere';
import { getSoknad } from '../../mockSoknader';

describe("SoknadTeasere", () => {

    const ledetekster = {
        'soknader.introduksjonstekst': 'introtekst',
        'soknader.sidetittel': 'tittel',
    };

    const soknader = [ getSoknad(), getSoknad(), getSoknad() ];

    it("Viser en header", () => {
        const component = shallow(<SoknaderTeasere tittel="Søknader som venter din behandling" soknader={soknader} ledetekster={ledetekster}/>);
        expect(component.find("header")).to.have.length(1);
        expect(component.find("header").text()).to.contain("Søknader som venter din behandling")
    });

    it("Viser en SoknadTeaser per Soknad", function () {
        const component = shallow(<SoknaderTeasere tittel="Søknader som venter din behandling" soknader={soknader} ledetekster={ledetekster}/>);
        expect(component.find(SoknaderTeaser)).to.have.length(3);
    });

    it("Viser en melding når det ikke er sykmeldinger", () => {
        const component = shallow(<SoknaderTeasere tittel="Søknader som venter din behandling" soknader={[]} ledetekster={ledetekster} tomListeTekst={'tomlisteTekst'}/>);
        expect(component.find(SoknaderTeaser)).to.have.length(0);
        expect(component.text()).to.contain('tomlisteTekst')
    })
}); 