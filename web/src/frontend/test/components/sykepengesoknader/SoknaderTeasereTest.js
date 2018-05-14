import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';
import SoknadTeaser from '../../../js/components/sykepengesoknader/SoknadTeaser';
import SoknaderTeasere from '../../../js/components/sykepengesoknader/SoknaderTeasere';
import { getSoknad } from '../../mockSykepengesoknader';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SoknadTeasere', () => {
    const ledetekster = {
        'soknader.introduksjonstekst': 'introtekst',
        'soknader.sidetittel': 'tittel',
    };

    const soknader = [getSoknad({
        sendtTilNAVDato: new Date(),
        sendtTilArbeidsgiverDato: new Date(),
    }), getSoknad({
        sendtTilNAVDato: new Date(),
        sendtTilArbeidsgiverDato: new Date(),
    }), getSoknad({
        sendtTilNAVDato: new Date(),
        sendtTilArbeidsgiverDato: new Date(),
    })];

    beforeEach(() => {
        setLedetekster(ledetekster);
    });

    it('Viser en header', () => {
        const component = shallow(<SoknaderTeasere tittel="Søknader som venter din behandling" soknader={soknader} />);
        expect(component.find('header')).to.have.length(1);
        expect(component.find('header').text()).to.contain('Søknader som venter din behandling');
    });

    it('Viser en SoknadTeaser per Soknad', () => {
        const component = shallow(<SoknaderTeasere tittel="Søknader som venter din behandling" soknader={soknader} />);
        expect(component.find(SoknadTeaser)).to.have.length(3);
    });

    it('Viser en melding når det ikke er sykmeldinger', () => {
        const component = shallow(<SoknaderTeasere tittel="Søknader som venter din behandling" soknader={[]} tomListeTekst={'tomlisteTekst'} />);
        expect(component.find(SoknadTeaser)).to.have.length(0);
        expect(component.text()).to.contain('tomlisteTekst');
    });
});
