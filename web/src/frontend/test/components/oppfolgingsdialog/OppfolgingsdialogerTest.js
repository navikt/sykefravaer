import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import {
    OppfolgingsdialogTeasere,
    OppfolgingsdialogerIngenplan,
    NyNaermestelederInfoboks,
} from 'oppfolgingsdialog-npm';
import Sidetopp from '../../../js/components/Sidetopp';
import Oppfolgingsdialoger, { OppfolgingsdialogNyDialog } from '../../../js/components/oppfolgingsdialoger/Oppfolgingsdialoger';
import IngenledereInfoboks from '../../../js/components/oppfolgingsdialoger/IngenledereInfoboks';
import OppfolgingsdialogFilm from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogFilm';
import getOppfolgingsdialog, { getOppfolgingsdialoger } from '../../mockOppfolgingsdialoger';
import getSykmelding from '../../mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialoger', () => {
    let component;
    let sykmeldinger;
    let naermesteLedere;
    const oppfolgingsdialoger = getOppfolgingsdialoger;

    beforeEach(() => {
        sykmeldinger = [];
        naermesteLedere = [];
        component = shallow(<Oppfolgingsdialoger
            oppfolgingsdialoger={[]}
            sykmeldinger={sykmeldinger}
            naermesteLedere={naermesteLedere}
        />);
    });

    it('Skal vise overskrift for Oppfolgingsdialoger', () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(Sidetopp)).to.have.length(1);
    });

    it('Skal vise tekst for Oppfolgingsdialoger', () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find('p.oppfolgingsdialoger__tekst')).to.have.length(1);
    });

    it('Skal vise OppfolgingsdialogFilm', () => {
        component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialoger} />);
        expect(component.find(OppfolgingsdialogFilm)).to.have.length(1);
    });

    describe('Ny NaermesteLeder', () => {
        it('Skal vise IngenledereInfoboks, dersom det ikke er oppfolgingsdialoger og man ikke har noen naermesteLeder hos noen virksomhet', () => {
            expect(component.find(IngenledereInfoboks)).to.have.length(1);
        });

        it('Skal vise NyNaermestelederInfoboks, dersom det er en oppfolgingsdialog med ny naermeste leder og bekreftetNyNaermesteLeder er false', () => {
            const oppfolgingsdialogListe = [Object.assign({}, getOppfolgingsdialog(), {
                arbeidsgiver: {
                    naermesteLeder: { aktivFom: '2017-01-01' },
                    forrigeNaermesteLeder: {},
                },
                arbeidstaker: { sistInnlogget: '2017-01-01T12:12:12.000' },
            })];
            component = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialogListe}
                sykmeldinger={sykmeldinger}
                naermesteLedere={naermesteLedere}
            />);
            expect(component.find(NyNaermestelederInfoboks)).to.have.length(1);
        });
    });

    describe('Uten Aktiv(e) Oppfolgingsdialog(er)', () => {
        it('Skal ikke vise OppfolgingsdialogerTeasere dersom man ikke har oppfolgingsdialoger', () => {
            expect(component.find(OppfolgingsdialogTeasere)).to.have.length(0);
        });

        it('Skal vise OppfolgingsdialogerIngenplan, dersom det ikke er oppfolgingsdialoger', () => {
            const sykmeldingListe = [getSykmelding({
                mulighetForArbeid: {
                    perioder: [{
                        tom: new Date(),
                    }],
                },
            })];
            component = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={[]}
                sykmeldinger={sykmeldingListe}
                naermesteLedere={[{ orgnummer: sykmeldingListe[0].orgnummer }]}
            />);
            expect(component.find(OppfolgingsdialogerIngenplan)).to.have.length(1);
        });

        it('Skal vise OppfolgingsdialogerIngenplan, dersom det ikke er aktive oppfolgingsdialoger', () => {
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
                        tom: '2017-01-01T00:00:00.000',
                    },
                },
            })];
            component = shallow(<Oppfolgingsdialoger
                oppfolgingsdialoger={oppfolgingsdialogListe}
                sykmeldinger={sykmeldingListe}
                naermesteLedere={[{ orgnummer: sykmeldingListe[0].orgnummer }]}
            />);
            expect(component.find(OppfolgingsdialogerIngenplan)).to.have.length(1);
        });
    });

    describe('Med Oppfolgingsdialoger', () => {
        describe('Har Aktiv Oppfolgingsdialog', () => {
            it('Skal vise en OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: null,
                })];
                component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialogListe} />);
                expect(component.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });

            it('Skal vise OppfolgingsdialogNyDialog, dersom man har oppfolgingsdialoger', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: null,
                })];
                component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialogListe} />);
                expect(component.find(OppfolgingsdialogNyDialog)).to.have.length(1);
            });
        });

        describe('Har Tidligere Oppfolgingsdialoger', () => {
            it('Skal vise en OppfolgingsdialogerTeasere dersom man har oppfolgingsdialoger', () => {
                const oppfolgingsdialogListe = [Object.assign((oppfolgingsdialoger[0]), {
                    godkjentPlan: {
                        gyldighetstidspunkt: {
                            tom: '2017-01-01T00:00:00.000',
                        },
                    },
                })];
                component = shallow(<Oppfolgingsdialoger oppfolgingsdialoger={oppfolgingsdialogListe} />);
                expect(component.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });
        });
    });

    describe('OppfolgingsdialogNyDialog', () => {
        it('Skal vise tekster', () => {
            component = shallow(<OppfolgingsdialogNyDialog />);
            expect(component.find('h3')).to.have.length(1);
            expect(component.find('p')).to.have.length(1);
        });

        it('Skal vise knapp for å opprette oppfolgingsdialog', () => {
            component = shallow(<OppfolgingsdialogNyDialog />);
            expect(component.find('.knapp')).to.have.length(1);
        });
    });
});
