import chai from 'chai';
import React from 'react';
import { Link } from 'react-router';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    OppfolgingsdialogTeasere,
    OppfolgingsdialogerIngenplanAT,
    NyNaermestelederInfoboks,
    UnderUtviklingVarsel,
    OppfolgingsdialogUtenSykmelding,
    OppfolgingsdialogerUtenAktivSykmelding,
    MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING,
} from 'oppfolgingsdialog-npm';
import Sidetopp from '../../../js/components/Sidetopp';
import Oppfolgingsdialoger, { OppfolgingsdialogNyDialog } from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';
import IngenledereInfoboks from '../../../js/components/oppfolgingsdialoger/IngenledereInfoboks';
import OppfolgingsdialogFilm from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogFilm';
import getOppfolgingsdialog, { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';
import getSykmelding from '../../mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;
const MILLISEKUNDER_PER_DAG = 86400000;

export const trekkDagerFraDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() - (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const leggTilDagerPaaDato = (dato, dager) => {
    const nyDato = new Date(dato);
    nyDato.setTime(nyDato.getTime() + (dager * MILLISEKUNDER_PER_DAG));
    return new Date(nyDato);
};

export const trekkMnderFraDato = (dato, mnder) => {
    const nyDato = new Date(dato);
    nyDato.setMonth(nyDato.getMonth() - mnder);
    return new Date(nyDato);
};

export const trekkMnderOgDagerFraDato = (dato, mnder, dager) => {
    let nyDato = new Date(dato);
    nyDato = trekkMnderFraDato(nyDato, mnder);
    nyDato = trekkDagerFraDato(nyDato, dager);
    return new Date(nyDato);
};

describe('Oppfolgingsdialoger', () => {
    let component;
    let dinesykmeldinger;
    let naermesteLedere;
    const oppfolgingsdialoger = getOppfolgingsdialoger;
    let hentVirksomhet;
    let hentPerson;
    let hentForrigeNaermesteLeder;
    let hentKontaktinfo;
    const today = new Date('2017-01-01');
    today.setHours(0, 0, 0, 0);
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
    const forrigenaermesteleder = {
        henter: [],
        hentet: [],
        hentingFeilet: [],
        data: [],
    };
    beforeEach(() => {
        clock = sinon.useFakeTimers(today.getTime());
        dinesykmeldinger = {
            data: [getSykmelding({
                mulighetForArbeid: {
                    perioder: [
                        {
                            fom: trekkDagerFraDato(today, 35).toISOString(),
                            tom: trekkDagerFraDato(today, 5).toISOString(),
                        },
                        {
                            fom: trekkDagerFraDato(today, 5).toISOString(),
                            tom: leggTilDagerPaaDato(today, 35).toISOString(),
                        },
                    ],
                },
            })],
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
            hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            forrigenaermesteleder={forrigenaermesteleder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
        />);
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

    it('Skal vise OppfolgingsdialogFilm', () => {
        component = shallow(<Oppfolgingsdialoger
            oppfolgingsdialoger={oppfolgingsdialoger}
            dinesykmeldinger={dinesykmeldinger}
            naermesteLedere={naermesteLedere}
            hentVirksomhet={hentVirksomhet}
            hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
            hentPerson={hentPerson}
            hentKontaktinfo={hentKontaktinfo}
            forrigenaermesteleder={forrigenaermesteleder}
            virksomhet={virksomhet}
            person={person}
            kontaktinfo={kontaktinfo}
            bekreftetNyNaermesteLeder
        />);
        expect(component.find(OppfolgingsdialogFilm)).to.have.length(1);
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
                hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
                hentPerson={hentPerson}
                hentKontaktinfo={hentKontaktinfo}
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
                data: [getSykmelding({
                    mulighetForArbeid: {
                        perioder: [
                            {
                                fom: trekkMnderOgDagerFraDato(today, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1, 1).toISOString(),
                                tom: trekkMnderOgDagerFraDato(today, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING + 1, 0).toISOString(),
                            },
                            {
                                fom: trekkMnderOgDagerFraDato(today, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, 10).toISOString(),
                                tom: trekkMnderOgDagerFraDato(today, MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING, 1).toISOString(),
                            },
                        ],
                    },
                })],
            };
            component1 = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialoger}
                dinesykmeldinger={sykmeldingListe}
                naermesteLedere={naermesteLedere}
                hentVirksomhet={sinon.spy()}
                hentForrigeNaermesteLeder={sinon.spy()}
                hentPerson={sinon.spy()}
                hentKontaktinfo={sinon.spy()}
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
                        fom: trekkDagerFraDato(today, 5).toISOString(),
                        tom: leggTilDagerPaaDato(today, 1).toISOString(),
                    },
                },
            })];
            component1 = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialogListe}
                dinesykmeldinger={sykmeldingListe}
                naermesteLedere={naermesteLedere}
                hentVirksomhet={sinon.spy()}
                hentForrigeNaermesteLeder={sinon.spy()}
                hentPerson={sinon.spy()}
                hentKontaktinfo={sinon.spy()}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
            />);
            expect(component1.find(OppfolgingsdialogerUtenAktivSykmelding)).to.have.length(0);
        });

        it('Skal vise ikke OppfolgingsdialogerUtenAktivSykmelding, dersom det er tidligere planer', () => {
            const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                godkjentPlan: {
                    gyldighetstidspunkt: {
                        fom: trekkDagerFraDato(today, 5).toISOString(),
                        tom: trekkDagerFraDato(today, 1).toISOString(),
                    },
                }
            })];
            const component2 = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialogListe}
                dinesykmeldinger={sykmeldingListe}
                naermesteLedere={naermesteLedere}
                hentVirksomhet={sinon.spy()}
                hentForrigeNaermesteLeder={sinon.spy()}
                hentPerson={sinon.spy()}
                hentKontaktinfo={sinon.spy()}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
                bekreftetNyNaermesteLeder
            />);
            console.log("---", component2.debug());
            expect(component2.find(OppfolgingsdialogerUtenAktivSykmelding)).to.have.length(1);
        });
    });

    describe('Uten Aktiv(e) Oppfolgingsdialog(er)', () => {
        it('Skal ikke vise OppfolgingsdialogerTeasere dersom man ikke har oppfolgingsdialoger', () => {
            expect(component.find(OppfolgingsdialogTeasere)).to.have.length(0);
        });

        it('Skal vise OppfolgingsdialogerIngenplanAT, dersom det ikke er oppfolgingsdialoger', () => {
            const sykmeldingListe = [getSykmelding({
                mulighetForArbeid: {
                    perioder: [{
                        tom: new Date(),
                    }],
                },
            })];
            component = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={[]}
                dinesykmeldinger={{ data: sykmeldingListe }}
                hentVirksomhet={hentVirksomhet}
                hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
                hentPerson={hentPerson}
                hentKontaktinfo={hentKontaktinfo}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
                naermesteLedere={{ data: [{ orgnummer: sykmeldingListe[0].orgnummer }] }}
            />);
            expect(component.find(OppfolgingsdialogerIngenplanAT)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogerIngenplanAT, dersom det ikke er aktive oppfolgingsdialoger', () => {
            const sykmeldingListe = [getSykmelding({
                mulighetForArbeid: {
                    perioder: [{
                        tom: new Date(),
                    }],
                },
            })];
            const oppfolgingsdialogListe = [Object.assign({}, getOppfolgingsdialog(), {
                godkjentPlan: {
                    gyldighetstidspunkt: {
                        tom: trekkDagerFraDato(new Date(), 1).toISOString(),
                    },
                },
                arbeidsgiver: {
                    naermesteLeder: {
                        navn: "Test Testesen",
                        fnr: "***REMOVED***",
                        samtykke: null,
                        sistInnlogget: "2017-01-01T00:00:00.000",
                        godkjent: null,
                        aktivFom: "2016-01-01T00:00:00.000",
                    },
                    forrigeNaermesteLeder: {
                        fnr: '***REMOVED***',
                        navn: 'Arbeidsgiver navn',
                    },
                },
            })];
            component = shallow(<Oppfolgingsdialoger
                hentVirksomhet={hentVirksomhet}
                hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
                hentPerson={hentPerson}
                hentKontaktinfo={hentKontaktinfo}
                forrigenaermesteleder={forrigenaermesteleder}
                virksomhet={virksomhet}
                person={person}
                kontaktinfo={kontaktinfo}
                oppfolgingsdialoger={oppfolgingsdialogListe}
                dinesykmeldinger={{ data: sykmeldingListe }}
                naermesteLedere={{ data: [{ orgnummer: sykmeldingListe[0].orgnummer }] }}
            />);
            expect(component.find(OppfolgingsdialogerIngenplanAT)).to.have.length(1);
        });
    });

    describe('Med Oppfolgingsdialoger', () => {
        describe('Har Aktiv Oppfolgingsdialog', () => {
            it('Skal vise en OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: null,
                    arbeidsgiver: {
                        naermesteLeder: {
                            navn: "Test Testesen",
                            fnr: "***REMOVED***",
                            samtykke: null,
                            sistInnlogget: "2017-01-01T00:00:00.000",
                            godkjent: null,
                            aktivFom: "2016-01-01T00:00:00.000",
                        },
                        forrigeNaermesteLeder: {
                            fnr: '***REMOVED***',
                            navn: 'Arbeidsgiver navn',
                        },
                    },
                })];
                component = shallow(<Oppfolgingsdialoger
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                    oppfolgingsdialoger={oppfolgingsdialogListe}
                    hentVirksomhet={hentVirksomhet}
                    hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
                    hentPerson={hentPerson}
                    hentKontaktinfo={hentKontaktinfo}
                    forrigenaermesteleder={forrigenaermesteleder}
                    virksomhet={virksomhet}
                    person={person}
                    kontaktinfo={kontaktinfo}
                />);
                expect(component.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });

            it('Skal ikke vise OppfolgingsdialogNyDialog, dersom man har oppfolgingsdialog og kun 1 arbeidsgiver', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: null,
                    arbeidsgiver: {
                        naermesteLeder: {
                            navn: "Test Testesen",
                                fnr: "***REMOVED***",
                                samtykke: null,
                                sistInnlogget: "2017-01-01T00:00:00.000",
                                godkjent: null,
                                aktivFom: "2016-01-01T00:00:00.000",
                        },
                        forrigeNaermesteLeder: {
                            fnr: '***REMOVED***',
                                navn: 'Arbeidsgiver navn',
                        },
                    },
                })];
                component = shallow(<Oppfolgingsdialoger
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                    oppfolgingsdialoger={oppfolgingsdialogListe}
                    hentVirksomhet={hentVirksomhet}
                    hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
                    hentPerson={hentPerson}
                    hentKontaktinfo={hentKontaktinfo}
                    forrigenaermesteleder={forrigenaermesteleder}
                    virksomhet={virksomhet}
                    person={person}
                    kontaktinfo={kontaktinfo}
                />);
                expect(component.find(OppfolgingsdialogNyDialog)).to.have.length(0);
            });
        });

        describe('Har Tidligere Oppfolgingsdialoger', () => {
            it('Skal vise en OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: {
                        gyldighetstidspunkt: {
                            fom: '2016-01-01T00:00:00.000',
                            tom: '2017-01-01T00:00:00.000',
                        },
                    },
                    arbeidsgiver: {
                        naermesteLeder: {
                            navn: "Test Testesen",
                            fnr: "***REMOVED***",
                            samtykke: null,
                            sistInnlogget: "2017-01-01T00:00:00.000",
                            godkjent: null,
                            aktivFom: "2016-01-01T00:00:00.000",
                        },
                        forrigeNaermesteLeder: {
                            fnr: '***REMOVED***',
                            navn: 'Arbeidsgiver navn',
                        },
                    },
                })];
                component = shallow(<Oppfolgingsdialoger
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                    oppfolgingsdialoger={oppfolgingsdialogListe}
                    hentVirksomhet={hentVirksomhet}
                    hentForrigeNaermesteLeder={hentForrigeNaermesteLeder}
                    hentPerson={hentPerson}
                    hentKontaktinfo={hentKontaktinfo}
                    forrigenaermesteleder={forrigenaermesteleder}
                    virksomhet={virksomhet}
                    person={person}
                    kontaktinfo={kontaktinfo}
                />);
                expect(component.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });
        });
    });

    describe('OppfolgingsdialogNyDialog', () => {
        it('Skal vise en Link til OpprettOppfolgingsdialog', () => {
            component = shallow(<OppfolgingsdialogNyDialog
            />);
            expect(component.find(Link)).to.have.length(1);
        });
    });
});
