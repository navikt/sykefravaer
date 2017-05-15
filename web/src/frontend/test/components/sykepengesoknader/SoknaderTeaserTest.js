import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import SoknaderTeaser from "../../../js/components/sykepengesoknader/SoknaderTeaser";
import { setLedetekster } from 'digisyfo-npm';

describe("SoknadTeaser", () => {

    const ledetekster = {
        'soknad.teaser.dato': 'Opprettet %DATO%',
        'soknad.teaser.tittel': 'Tittel',
        'soknad.teaser.tekst': 'tekst',
        'soknad.teaser.undertekst': 'undertekst'
    };

    const soknad = {
        id: "1",
        opprettetDato: new Date("2016-01-20"),
        aktiviteter: [
            {
                avvik: {},
                grad: 100,
                periode: {
                    fom: new Date("2016-01-01"),
                    tom: new Date("2016-01-20"),
                }
            },
        ],
        arbeidsgiver: {
            navn: 'BEKK Consulting AS',
        }
    };

    beforeEach(() => {
        setLedetekster(Object.assign({}, ledetekster, {
            'soknad.teaser.status.SENDT': 'Sendt %DATO%'
        }));
    });

    it('er en lenke', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} />)
        expect(component.find('.js-panel').props().to).to.be.equal('/sykefravaer/soknader/1')
        expect(component.find('.js-panel')).to.be.length(1)
    });

    it('har et ikon', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} />)
        expect(component.find('.js-ikon')).to.be.length(1)
    });

    it('har opprettet tekst', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} />)
        expect(component.find('.js-meta').text()).to.contain('Opprettet 20.01.2016')
    });

    it('har tittel', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} />)
        expect(component.find('.js-title').text()).to.contain('Tittel')
    });

    it('har tekst', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} />)
        expect(component.find('.js-tekst').text()).to.contain('tekst')
    });

    it('har undertekst', () => {
        const component = shallow(<SoknaderTeaser soknad={soknad} />)
        expect(component.find('.js-undertekst').text()).to.contain('tekst')
    });

    it('viser ikke status om soknad er ny', () => {
        const _soknad = Object.assign({}, soknad, {status: 'NY'});
        const component = shallow(<SoknaderTeaser soknad={_soknad} />)
        expect(component.find('.js-status')).to.be.length(0)
    });

    it('viser status om soknad er sendt', () => {
        const _soknad = Object.assign({}, soknad, {status: 'SENDT'})
        const component = shallow(<SoknaderTeaser soknad={_soknad} />)
        expect(component.find('.js-status')).to.be.length(1)
    });

    it("Viser datoen søknaden er sendt hvis den bare er sendt til NAV", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'SENDT',
            sendtTilArbeidsgiverDato: null,
            sendtTilNAVDato: new Date("2017-05-11")
        });
        const component = shallow(<SoknaderTeaser soknad={_soknad} />);
        expect(component.find(".js-status").text()).to.contain("Sendt 11.05.2017");
    });

    it("Viser datoen søknaden er sendt hvis den bare er sendt til arbeidsgiver", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'SENDT',
            sendtTilNAVDato: null,
            sendtTilArbeidsgiverDato: new Date("2017-05-11")
        });
        const component = shallow(<SoknaderTeaser soknad={_soknad} />);
        expect(component.find(".js-status").text()).to.contain("Sendt 11.05.2017");
    });

    it("Viser datoen søknaden er sendt hvis den er sendt til begge", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'SENDT',
            sendtTilNAVDato: new Date("2017-05-11"),
            sendtTilArbeidsgiverDato: new Date("2017-05-11")
        });
        const component = shallow(<SoknaderTeaser soknad={_soknad} />);
        expect(component.find(".js-status").text()).to.contain("Sendt 11.05.2017");
    });

}); 