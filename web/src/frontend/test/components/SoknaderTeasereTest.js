import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import SoknaderTeaser from '../../js/components/soknader/SoknaderTeaser';
import SoknaderTeasere from '../../js/components/soknader/SoknaderTeasere';

describe("SoknadTeasere", () => {

    const ledetekster = {
        'soknader.introduksjonstekst': 'introtekst',
        'soknader.sidetittel': 'tittel',
    };

    const soknader = [
        {
            id: 1,
            status: 'NY',
            fom: '01.01.2017',
            tom: '01.20.2017',
            arbeidsgiver: 'BEKK Consulting AS',
        },
        {
            id: 2,
            status: 'SENDT',
            fom: '23.11.2016',
            tom: '30.11.2016',
            arbeidsgiver: 'BEKK Consulting AS',
            innsendingsDato: '02.01.2017'
        },
        {
            id: 3,
            status: 'NY',
            fom: '01.06.2016',
            tom: '13.06.2016',
            arbeidsgiver: 'BEKK Consulting AS',
        },

    ];

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