import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { setLedetekster } from 'digisyfo-npm';
import SykepengesoknadTeaser, { SendtUlikt, TeaserPeriode, TeaserStatus, TeaserTittel, TeaserUndertekst } from '../../../js/components/sykepengesoknader/SykepengesoknadTeaser';
import { getSoknad, getSoknadUtland } from '../../mockSoknader';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('SykepengesoknadTeaser', () => {
    const sykepengesoknad = {
        id: '1',
        opprettetDato: new Date('2016-01-20'),
        fom: new Date('2016-01-01'),
        tom: new Date('2016-01-20'),
        arbeidsgiver: {
            navn: 'Arbeidsgiver AS',
        },
    };

    let frilansersoknad;
    let utlandsoknad;

    beforeEach(() => {
        setLedetekster({
            'soknad.teaser.dato': 'Opprettet %DATO%',
            'soknad.teaser.tittel': 'Tittel',
            'soknad.teaser.tekst': 'For sykmeldingsperioden %PERIODE%',
            'soknad.teaser.undertekst': '%ARBEIDSGIVER%',
            'soknad.teaser.status.UTKAST_TIL_KORRIGERING': 'Utkast til endring',
            'soknad.teaser.status.UTGAATT': 'Ikke brukt på nett',
            'soknad.teaser.status.SENDT': 'Sendt %DATO%',
            'soknad.teaser.status.SENDT.til-arbeidsgiver': 'Sendt til %ARBEIDSGIVER% %DATO%',
            'soknad.teaser.status.SENDT.til-nav': 'Sendt til NAV %DATO%',
            'soknad.teaser.status.SENDT.til-arbeidsgiver-og-nav': 'Sendt til %ARBEIDSGIVER% og NAV %DATO%',
            'soknad.teaser.status.TIL_SENDING.til-nav': 'Sender til NAV...',
            'soknad.teaser.status.TIL_SENDING.til-arbeidsgiver': 'Sender til %ARBEIDSGIVER%...',
            'soknad.teaser.status.TIL_SENDING.til-arbeidsgiver-og-nav': 'Sender til %ARBEIDSGIVER% og NAV...',
            'soknad.teaser.status.AVBRUTT': 'Avbrutt av deg %DATO%',
            'soknad.utland.teaser.tittel': 'Søknad om å beholde sykepenger utenfor Norge',
        });
        frilansersoknad = getSoknad();
        utlandsoknad = getSoknadUtland();
    });

    it('er en lenke', () => {
        const component = shallow(<SykepengesoknadTeaser soknad={sykepengesoknad} />);
        expect(component.find('.js-panel').props().to).to.be.equal('/sykefravaer/soknader/1');
        expect(component.find('.js-panel')).to.be.length(1);
    });

    it('har to ikoner', () => {
        const component = shallow(<SykepengesoknadTeaser soknad={sykepengesoknad} />);
        expect(component.find('.js-ikon')).to.be.length(2);
    });

    it('Har tittel', () => {
        const component = shallow(<SykepengesoknadTeaser soknad={sykepengesoknad} />);
        expect(component.find(TeaserTittel)).to.have.length(1);
    });

    it('har undertekst', () => {
        const component = shallow(<SykepengesoknadTeaser soknad={sykepengesoknad} />);
        expect(component.contains(<TeaserUndertekst soknad={sykepengesoknad} />)).to.equal(true);
    });

    it('har periode', () => {
        const component = shallow(<SykepengesoknadTeaser soknad={sykepengesoknad} />);
        expect(component.contains(<TeaserPeriode soknad={sykepengesoknad} />)).to.equal(true);
    });

    it('har status', () => {
        const component = shallow(<SykepengesoknadTeaser soknad={sykepengesoknad} />);
        expect(component.contains(<TeaserStatus soknad={sykepengesoknad} />)).to.equal(true);
    });

    it('Skal funke med en frilansersøknad', () => {
        shallow(<SykepengesoknadTeaser soknad={frilansersoknad} />);
    });

    it('Skal funke med en søknad om sykpenger ved opphold utenfor Noreg', () => {
        shallow(<SykepengesoknadTeaser soknad={utlandsoknad} />);
    });

    describe('TeaserTittel', () => {
        it('har opprettet tekst', () => {
            const component = shallow(<TeaserTittel soknad={sykepengesoknad} />);
            expect(component.text()).to.contain('Opprettet 20. januar 2016');
        });

        it('har tittel', () => {
            const component = shallow(<TeaserTittel soknad={sykepengesoknad} />);
            expect(component.text()).to.contain('Tittel');
        });

        it('Viser riktig tekst for søknad om utenlandsopphold', () => {
            const component = shallow(<TeaserTittel soknad={utlandsoknad} />);
            expect(component.text()).to.contain('Søknad om å beholde sykepenger utenfor Norge');
        });
    });

    describe('TeaserPeriode', () => {
        it('Skal vise periode', () => {
            const component = shallow(<TeaserPeriode soknad={sykepengesoknad} />);
            expect(component.text()).to.contain('For sykmeldingsperioden 1. – 20. januar 2016');
        });
    });

    describe('TeaserStatus', () => {
        it('viser ikke status om soknad er ny', () => {
            const _soknad = Object.assign({}, sykepengesoknad, { status: 'NY' });
            const component = shallow(<TeaserStatus soknad={_soknad} />);
            expect(component.text()).to.be.length(0);
        });

        it('Viser status om søknaden er UTGAATT', () => {
            const _soknad = Object.assign({}, sykepengesoknad, { status: 'UTGAATT' });
            const component = shallow(<TeaserStatus soknad={_soknad} />);
            expect(component.text()).to.equal('Ikke brukt på nett');
        });

        it('Viser status om søknaden er UTKAST_TIL_KORRIGERING', () => {
            const _soknad = Object.assign({}, sykepengesoknad, { status: 'UTKAST_TIL_KORRIGERING' });
            const component = shallow(<TeaserStatus soknad={_soknad} />);
            expect(component.text()).to.equal('Utkast til endring');
        });
    });

    describe('TeaserUndertekst', () => {
        it('viser navn på arbeidsgiver soknad er ny', () => {
            const _soknad = Object.assign({}, sykepengesoknad, { status: 'NY' });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.find('.js-undertekst').text()).to.equal('Arbeidsgiver AS');
        });


        it('Viser datoen søknaden er sendt hvis den bare er sendt til NAV', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'SENDT',
                sendtTilArbeidsgiverDato: null,
                sendtTilNAVDato: new Date('2017-05-11'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.equal('Sendt til NAV 11. mai 2017');
        });

        it('Viser datoen søknaden er sendt hvis den bare er sendt til arbeidsgiver', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'SENDT',
                sendtTilNAVDato: null,
                sendtTilArbeidsgiverDato: new Date('2017-05-11'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.equal('Sendt til Arbeidsgiver AS 11. mai 2017');
        });

        it('Viser datoen søknaden er sendt hvis den er sendt til begge på samme dag', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'SENDT',
                sendtTilNAVDato: new Date('2017-05-11'),
                sendtTilArbeidsgiverDato: new Date('2017-05-11'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.equal('Sendt til Arbeidsgiver AS og NAV 11. mai 2017');
        });

        it('Viser statustekst hvis søknaden sendes til NAV', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'TIL_SENDING',
                sendtTilNAVDato: new Date('2017-05-18'),
                sendtTilArbeidsgiverDato: null,
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.contain('Sender til NAV...');
        });

        it('Viser statustekst hvis søknaden sendes til arbeidsgiver', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'TIL_SENDING',
                sendtTilNAVDato: null,
                sendtTilArbeidsgiverDato: new Date('2017-05-18'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.contain('Sender til Arbeidsgiver AS...');
        });

        it('Viser statustekst hvis søknaden sendes til begge', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'TIL_SENDING',
                sendtTilNAVDato: new Date('2017-05-18'),
                sendtTilArbeidsgiverDato: new Date('2017-05-18'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.contain('Sender til Arbeidsgiver AS og NAV...');
        });

        it('Viser statustekst hvis søknaden er avbrutt', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'AVBRUTT',
                avbruttDato: new Date('2017-05-18'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.contain('Avbrutt av deg 18. mai 2017');
        });

        it('Viser riktig statustekst for sending til nav', () => {
            const _soknad = Object.assign({}, utlandsoknad, {
                status: 'SENDT',
                innsendtDato: new Date('2018-05-18'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.text()).to.contain('Sendt til NAV 18. mai 2018');
        });

        it('viser ikke status om soknad er sendt', () => {
            const _soknad = Object.assign({}, sykepengesoknad, { status: 'NY' });
            const component = shallow(<SykepengesoknadTeaser soknad={_soknad} />);
            expect(component.find('.js-status')).to.be.length(0);
            expect(component.find(TeaserUndertekst)).to.be.length(1);
        });

        it('viser undertekst om soknad er sendt', () => {
            const _soknad = Object.assign({}, sykepengesoknad, { status: 'SENDT' });
            const component = shallow(<SykepengesoknadTeaser soknad={_soknad} />);
            expect(component.find(TeaserUndertekst)).to.be.length(1);
        });

        it('Viser SendtUlikt hvis den er sendt til begge på forskjellige dager', () => {
            const _soknad = Object.assign({}, sykepengesoknad, {
                status: 'SENDT',
                sendtTilNAVDato: new Date('2017-05-18'),
                sendtTilArbeidsgiverDato: new Date('2017-05-11'),
            });
            const component = shallow(<TeaserUndertekst soknad={_soknad} />);
            expect(component.find(SendtUlikt)).to.have.length(1);

            const sendtUlikt = shallow(<SendtUlikt soknad={_soknad} />);
            expect(sendtUlikt.text()).to.contain('Sendt til Arbeidsgiver AS 11.05.2017');
            expect(sendtUlikt.text()).to.contain('Sendt til NAV 18.05.2017');
        });
    });
});
