import chai from 'chai';
import React from 'react'
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import SoknadTeaser, { SendtUlikt } from "../../../js/components/sykepengesoknader/SoknadTeaser";
import { setLedetekster } from 'digisyfo-npm';

describe("SoknadTeaser", () => {

    const soknad = {
        id: "1",
        opprettetDato: new Date("2016-01-20"),
        fom: new Date("2016-01-01"),
        tom: new Date("2016-01-20"),
        arbeidsgiver: {
            navn: 'BEKK Consulting AS',
        }
    };

        beforeEach(() => {
        setLedetekster({

        });
    });

    beforeEach(() => {
        setLedetekster({
            'soknad.teaser.dato': 'Opprettet %DATO%',
            'soknad.teaser.tittel': 'Tittel',
            'soknad.teaser.tekst': 'For sykmeldingsperioden %FRA% - %TIL%',
            'soknad.teaser.undertekst': '%ARBEIDSGIVER%',
            'soknad.teaser.status.UTKAST_TIL_KORRIGERING': "Utkast til endring",
            'soknad.teaser.status.UTGAATT': "Ikke brukt på nett",
            'soknad.teaser.status.SENDT': 'Sendt %DATO%',
            'soknad.teaser.status.SENDT.til-arbeidsgiver': 'Sendt til %ARBEIDSGIVER% %DATO%',
            'soknad.teaser.status.SENDT.til-nav': 'Sendt til NAV %DATO%',
            'soknad.teaser.status.SENDT.til-arbeidsgiver-og-nav': 'Sendt til %ARBEIDSGIVER% og NAV %DATO%',
            'soknad.teaser.status.TIL_SENDING.til-nav': 'Sender til NAV...',
            'soknad.teaser.status.TIL_SENDING.til-arbeidsgiver': 'Sender til %ARBEIDSGIVER%...',
            'soknad.teaser.status.TIL_SENDING.til-arbeidsgiver-og-nav': 'Sender til %ARBEIDSGIVER% og NAV...',
        });
    });

    it('er en lenke', () => {
        const component = shallow(<SoknadTeaser soknad={soknad} />)
        expect(component.find('.js-panel').props().to).to.be.equal('/sykefravaer/soknader/1')
        expect(component.find('.js-panel')).to.be.length(1)
    });

    it('har et ikon', () => {
        const component = shallow(<SoknadTeaser soknad={soknad} />)
        expect(component.find('.js-ikon')).to.be.length(1)
    });

    it('har opprettet tekst', () => {
        const component = shallow(<SoknadTeaser soknad={soknad} />)
        expect(component.find('.js-meta').text()).to.contain('Opprettet 20.01.2016')
    });

    it('har tittel', () => {
        const component = shallow(<SoknadTeaser soknad={soknad} />)
        expect(component.find('.js-title').text()).to.contain('Tittel')
    });

    it('har tekst', () => {
        const component = shallow(<SoknadTeaser soknad={soknad} />)
        expect(component.find('.js-tekst').text()).to.contain('For sykmeldingsperioden 01.01.2016 - 20.01.2016');
    });

    it('har undertekst', () => {
        const component = shallow(<SoknadTeaser soknad={soknad} />)
        expect(component.find('.js-undertekst').text()).to.contain('BEKK Consulting AS')
    });

    it('viser ikke status om soknad er ny', () => {
        const _soknad = Object.assign({}, soknad, {status: 'NY'});
        const component = shallow(<SoknadTeaser soknad={_soknad} />)
        expect(component.find('.js-status')).to.be.length(0);
    });

    it('viser navn på arbeidsgiver soknad er ny', () => {
        const _soknad = Object.assign({}, soknad, {status: 'NY'});
        const component = shallow(<SoknadTeaser soknad={_soknad} />)
        expect(component.find('.js-undertekst').text()).to.equal("BEKK Consulting AS");
    });

    it('viser ikke status om soknad er sendt', () => {
        const _soknad = Object.assign({}, soknad, {status: 'NY'});
        const component = shallow(<SoknadTeaser soknad={_soknad} />)
        expect(component.find('.js-status')).to.be.length(0);
        expect(component.find('.js-undertekst')).to.be.length(1);
    });

    it('viser undertekst om soknad er sendt', () => {
        const _soknad = Object.assign({}, soknad, {status: 'SENDT'})
        const component = shallow(<SoknadTeaser soknad={_soknad} />)
        expect(component.find('.js-undertekst')).to.be.length(1)
    });

    it("Viser status om søknaden er UTGAATT", () => {
       const _soknad = Object.assign({}, soknad, {status: 'UTGAATT'})
       const component = shallow(<SoknadTeaser soknad={_soknad} />)
       expect(component.find('.js-status')).to.be.length(1);
       expect(component.find('.js-status').text()).to.equal("Ikke brukt på nett");
    });

    it("Viser status om søknaden er UTKAST_TIL_KORRIGERING", () => {
       const _soknad = Object.assign({}, soknad, {status: 'UTKAST_TIL_KORRIGERING'})
       const component = shallow(<SoknadTeaser soknad={_soknad} />)
       expect(component.find('.js-status')).to.be.length(1);
       expect(component.find('.js-status').text()).to.equal("Utkast til endring");
    });

    it("Viser datoen søknaden er sendt hvis den bare er sendt til NAV", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'SENDT',
            sendtTilArbeidsgiverDato: null,
            sendtTilNAVDato: new Date("2017-05-11")
        });
        const component = shallow(<SoknadTeaser soknad={_soknad} />);
        expect(component.find(".js-undertekst").text()).to.equal("Sendt til NAV 11.05.2017");
    });

    it("Viser datoen søknaden er sendt hvis den bare er sendt til arbeidsgiver", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'SENDT',
            sendtTilNAVDato: null,
            sendtTilArbeidsgiverDato: new Date("2017-05-11")
        });
        const component = shallow(<SoknadTeaser soknad={_soknad} />);
        expect(component.find(".js-undertekst").text()).to.equal("Sendt til BEKK Consulting AS 11.05.2017");
    });

    it("Viser datoen søknaden er sendt hvis den er sendt til begge på samme dag", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'SENDT',
            sendtTilNAVDato: new Date("2017-05-11"),
            sendtTilArbeidsgiverDato: new Date("2017-05-11")
        });
        const component = shallow(<SoknadTeaser soknad={_soknad} />);
        expect(component.find(".js-undertekst").text()).to.equal("Sendt til BEKK Consulting AS og NAV 11.05.2017");
    });

    it("Viser SendtUlikt hvis den er sendt til begge på forskjellige dager", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'SENDT',
            sendtTilNAVDato: new Date("2017-05-18"),
            sendtTilArbeidsgiverDato: new Date("2017-05-11")
        });
        const component = shallow(<SoknadTeaser soknad={_soknad} />);
        expect(component.find(SendtUlikt)).to.have.length(1);

        const sendtUlikt = shallow(<SendtUlikt soknad={_soknad} />);
        expect(sendtUlikt.text()).to.contain("Sendt til BEKK Consulting AS 11.05.2017");
        expect(sendtUlikt.text()).to.contain("Sendt til NAV 18.05.2017");
    });

    it("Viser statustekst hvis søknaden sendes til NAV", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'TIL_SENDING',
            sendtTilNAVDato: new Date("2017-05-18"),
            sendtTilArbeidsgiverDato: null
        });
        const component = shallow(<SoknadTeaser soknad={_soknad} />);
        expect(component.find(".js-undertekst").text()).to.contain("Sender til NAV...");
    });

    it("Viser statustekst hvis søknaden sendes til arbeidsgiver", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'TIL_SENDING',
            sendtTilNAVDato: null,
            sendtTilArbeidsgiverDato: new Date("2017-05-18")
        });
        const component = shallow(<SoknadTeaser soknad={_soknad} />);
        expect(component.find(".js-undertekst").text()).to.contain("Sender til BEKK Consulting AS...");
    });

    it("Viser statustekst hvis søknaden sendes til begge", () => {
        const _soknad = Object.assign({}, soknad, {
            status: 'TIL_SENDING',
            sendtTilNAVDato: new Date("2017-05-18"),
            sendtTilArbeidsgiverDato: new Date("2017-05-18")
        });
        const component = shallow(<SoknadTeaser soknad={_soknad} />);
        expect(component.find(".js-undertekst").text()).to.contain("Sender til BEKK Consulting AS og NAV...");
    });

}); 