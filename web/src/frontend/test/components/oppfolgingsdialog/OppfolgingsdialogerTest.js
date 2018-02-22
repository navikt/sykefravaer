import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    NyNaermestelederInfoboks,
    UnderUtviklingVarsel,
    OppfolgingsdialogUtenSykmelding,
    OppfolgingsdialogerUtenAktivSykmelding,
} from 'oppfolgingsdialog-npm';
import Sidetopp from '../../../js/components/Sidetopp';
import Oppfolgingsdialoger from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';
import IngenledereInfoboks from '../../../js/components/oppfolgingsdialoger/IngenledereInfoboks';
import OppfolgingsdialogerVisning from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerVisning';
import getOppfolgingsdialog, { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';
import {
    hentSykmeldingIkkeGyldigForOppfoelging,
    hentSykmeldingGyldigForOppfoelging,
    leggTilDagerPaaDato,
} from '../../mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialoger', () => {
    let component;
    let dinesykmeldinger;
    let naermesteLedere;
    const oppfolgingsdialoger = getOppfolgingsdialoger;
    let hentVirksomhet;
    let hentPerson;
    let hentForrigeNaermesteLeder;
    let hentKontaktinfo;
    const dagensDato = new Date('2017-01-01');
    dagensDato.setHours(0, 0, 0, 0);
    let clock;
    const virksomhet = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    const person = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    const kontaktinfo = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    const naermesteleder = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    const forrigenaermesteleder = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    beforeEach(() => {
        clock = sinon.useFakeTimers(dagensDato.getTime());
        dinesykmeldinger = {
            data: [hentSykmeldingGyldigForOppfoelging(dagensDato)],
        };
        naermesteLedere = { data: [] };
        hentForrigeNaermesteLeder = sinon.spy();
        hentPerson = sinon.spy();
        hentKontaktinfo = sinon.spy();
        hentVirksomhet = sinon.spy();

        component = shallow(<Oppfolgingsdialoger
            oppfolgingsdialoger={[]}
            dinesykmeldinger={dinesykmeldinger}
            naermesteLedere={naermesteLedere}
            hentVirksomhet={hentVirksomhet}
            hentNaermesteLeder={sinon.spy()}
            hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            naermesteleder={naermesteleder}
            forrigenaermesteleder={forrigenaermesteleder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
        />);
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal vise UnderUtviklingVarsel', () => {
        expect(component.find(UnderUtviklingVarsel)).to.have.length(1);
    });

    it('Skal vise overskrift for Oppfolgingsdialoger', () => {
        expect(component.find(Sidetopp)).to.have.length(1);
    });

    it('Skal vise tekst for Oppfolgingsdialoger', () => {
        expect(component.find('p.oppfolgingsdialoger__tekst')).to.have.length(1);
    });

    describe('Ny NaermesteLeder', () => {
        it('Skal vise IngenledereInfoboks, dersom det ikke er oppfolgingsdialoger og man ikke har noen naermesteLeder hos noen virksomhet', () => {
            expect(component.find(IngenledereInfoboks)).to.have.length(1);
        });

        it('Skal vise NyNaermestelederInfoboks, dersom det er en oppfolgingsdialog med ny naermeste leder og bekreftetNyNaermesteLeder er false', () => {
            const oppfolgingsdialogListe = [Object.assign({}, getOppfolgingsdialog(), {
                arbeidsgiver: {
                    naermesteLeder: {
                        fnr: '***REMOVED***',
                        aktivFom: '2017-01-01',
                    },
                    forrigeNaermesteLeder: {},
                },
                arbeidstaker: { sistInnlogget: '2017-01-01T12:12:12.000' },
            })];
            component = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialogListe}
                dinesykmeldinger={dinesykmeldinger}
                hentVirksomhet={hentVirksomhet}
                hentNaermesteLeder={sinon.spy()}
                hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
                hentPerson={hentPerson}
                hentKontaktinfo={hentKontaktinfo}
                naermesteleder={naermesteleder}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
                naermesteLedere={naermesteLedere}
            />);
            expect(component.find(NyNaermestelederInfoboks)).to.have.length(1);
        });
    });

    describe('Uten gyldig sykmelding', () => {
        let component1;
        let sykmeldingListe;

        beforeEach(() => {
            sykmeldingListe = {
                data: [hentSykmeldingIkkeGyldigForOppfoelging(dagensDato)],
            };
            component1 = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialoger}
                dinesykmeldinger={sykmeldingListe}
                naermesteLedere={naermesteLedere}
                hentVirksomhet={sinon.spy()}
                hentNaermesteLeder={sinon.spy()}
                hentForrigeNaermesteLeder={sinon.spy()}
                hentPerson={sinon.spy()}
                hentKontaktinfo={sinon.spy()}
                naermesteleder={naermesteleder}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
                bekreftetNyNaermesteLeder
            />);
        });

        it('Skal vise OppfolgingsdialogUtenSykmelding', () => {
            expect(component1.find(OppfolgingsdialogUtenSykmelding)).to.have.length(1);
        });

        it('Skal vise ikke OppfolgingsdialogerUtenAktivSykmelding, dersom det ikke er tidligere planer', () => {
            const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                godkjentPlan: {
                    gyldighetstidspunkt: {
                        fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                        tom: leggTilDagerPaaDato(dagensDato, 1).toISOString(),
                    },
                },
            })];
            component1 = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialogListe}
                dinesykmeldinger={sykmeldingListe}
                naermesteLedere={naermesteLedere}
                hentVirksomhet={sinon.spy()}
                hentNaermesteLeder={sinon.spy()}
                hentForrigeNaermesteLeder={sinon.spy()}
                hentPerson={sinon.spy()}
                hentKontaktinfo={sinon.spy()}
                naermesteleder={naermesteleder}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
            />);
            expect(component1.find(OppfolgingsdialogerUtenAktivSykmelding)).to.have.length(0);
        });

        it('Skal vise OppfolgingsdialogerUtenAktivSykmelding, dersom det er tidligere planer', () => {
            const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                godkjentPlan: {
                    gyldighetstidspunkt: {
                        fom: leggTilDagerPaaDato(dagensDato, -5).toISOString(),
                        tom: leggTilDagerPaaDato(dagensDato, -1).toISOString(),
                    },
                },
            })];
            const component2 = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialogListe}
                dinesykmeldinger={sykmeldingListe}
                naermesteLedere={naermesteLedere}
                hentVirksomhet={sinon.spy()}
                hentNaermesteLeder={sinon.spy()}
                hentForrigeNaermesteLeder={sinon.spy()}
                hentPerson={sinon.spy()}
                hentKontaktinfo={sinon.spy()}
                naermesteleder={naermesteleder}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
                bekreftetNyNaermesteLeder
            />);
            expect(component2.find(OppfolgingsdialogerUtenAktivSykmelding)).to.have.length(1);
        });
    });

    describe('Standard visning', () => {
        it('Skal vise OppfolgingsdialogerVisning', () => {
            expect(component.find(OppfolgingsdialogerVisning)).to.have.length(0);
        });
    });
});
