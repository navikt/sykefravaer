import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import SoknaderTeaser from "../../js/components/soknader/SoknaderTeaser";

describe("SoknadTeaser", () => {

    const ledetekster = {
        'soknad.teaser.dato': 'Opprettet %DATO%',
        'soknad.teaser.tittel': 'Tittel',
        'soknad.teaser.tekst': 'tekst',
        'soknad.teaser.undertekst': 'undertekst'
    };

    const soknad = {
        opprettetDato: '2016-01-20',
        aktiviteter: [
            {
                avvik: {},
                grad: 100,
                periode: {
                    fom: '2016-01-01',
                    tom: '2016-01-20',
                }
            },
        ],
        arbeidsgiver: {
            navn: 'BEKK Consulting AS',
        }
    };

    it('er en lenke', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} ledetekster={ledetekster} />)
        expect(component.find('.js-ikon')).to.be.length(1)
    });

    it('har opprettet tekst', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} ledetekster={ledetekster} />)
        expect(component.find('.inngangspanel__meta').text()).to.contain('Opprettet 20.01.2016')
    });

    it('har tittel', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} ledetekster={ledetekster} />)
        expect(component.find('.inngangspanel__tittel').text()).to.contain('Tittel')
    });

    it('har tekst', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} ledetekster={ledetekster} />)
        expect(component.find('.inngangspanel__tekst').text()).to.contain('tekst')
    });

    it('har undertekst', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} ledetekster={ledetekster} />)
        expect(component.find('.inngangspanel__undertekst').text()).to.contain('tekst')
    });

    it('viser ikke status om soknad er ny', () => {
        const _soknad = Object.assign({}, soknad, {status: 'NY'})
        const component = shallow(<SoknaderTeaser soknad={_soknad} ledetekster={ledetekster} />)
        expect(component.find('.inngangspanel__status')).to.be.length(0)
    });

    it('viser status om soknad er sendt', () => {
        const _soknad = Object.assign({}, soknad, {status: 'SENDT', innsendingsDato: '02.06.2016'})
        const component = shallow(<SoknaderTeaser soknad={_soknad} ledetekster={ledetekster} />)
        expect(component.find('.inngangspanel__status')).to.be.length(1)
    });
}); 