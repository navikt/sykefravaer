import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Knapp } from 'nav-frontend-knapper';
import {
    OppfolgingsdialogTeasere,
} from 'oppfolgingsdialog-npm';
import OppfolgingsdialogerVisning, { OppfolgingsdialogNyKnapp } from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogerVisning';
import OppfolgingsdialogFilm from '../../../js/components/oppfolgingsdialoger/OppfolgingsdialogFilm';
import OppfolgingsdialogerOpprett from '../../../js/components/oppfolgingsdialoger/opprett/OppfolgingsdialogerOpprett';
import OppfolgingsdialogerIngenplanAT from '../../../js/components/oppfolgingsdialoger/opprett/OppfolgingsdialogerIngenplanAT';
import {
    hentOppfolgingsdialogAktiv,
    hentOppfolgingsdialogTidligere,
} from '../../mockOppfolgingsdialoger';
import {
    hentSykmeldingGyldigForOppfoelging,
} from '../../mockSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Oppfolgingsdialoger', () => {
    const dagensDato = new Date('2017-01-01');
    dagensDato.setHours(0, 0, 0, 0);
    let klokke;
    let komponent;
    let dinesykmeldinger;
    let naermesteLedere;
    let kopierOppfolgingsdialog;
    let opprettOppfolgingsdialog;
    let oppfolgingsdialogAktiv;
    let oppfolgingsdialogTidligere;

    beforeEach(() => {
        klokke = sinon.useFakeTimers(dagensDato.getTime());
        dinesykmeldinger = {
            data: [hentSykmeldingGyldigForOppfoelging(dagensDato)],
        };
        naermesteLedere = { data: [] };
        oppfolgingsdialogAktiv = hentOppfolgingsdialogAktiv(dagensDato);
        oppfolgingsdialogTidligere = hentOppfolgingsdialogTidligere(dagensDato);
        kopierOppfolgingsdialog = sinon.spy();
        opprettOppfolgingsdialog = sinon.spy();
        komponent = shallow(<OppfolgingsdialogerVisning
            oppfolgingsdialoger={[]}
            dinesykmeldinger={dinesykmeldinger}
            naermesteLedere={naermesteLedere}
            opprettOppfolgingsdialog={opprettOppfolgingsdialog}
        />);
    });

    afterEach(() => {
        klokke.restore();
    });

    it('Skal vise OppfolgingsdialogFilm', () => {
        expect(komponent.find(OppfolgingsdialogFilm)).to.have.length(1);
    });

    it('Skal vise OppfolgingsdialogerOpprett, om visOppfolgingsdialogOpprett=false', () => {
        expect(komponent.find(OppfolgingsdialogerOpprett)).to.have.length(0);
    });

    it('Skal vise OppfolgingsdialogerOpprett, om visOppfolgingsdialogOpprett=true', () => {
        const komponentVisOppfolgingsdialogOpprett = shallow(<OppfolgingsdialogerVisning
            oppfolgingsdialoger={[]}
            kopierOppfolgingsdialog={kopierOppfolgingsdialog}
            opprettOppfolgingsdialog={opprettOppfolgingsdialog}
            dinesykmeldinger={dinesykmeldinger}
            naermesteLedere={naermesteLedere}
        />);
        komponentVisOppfolgingsdialogOpprett.setState({
            visOppfolgingsdialogOpprett: true,
        });
        expect(komponentVisOppfolgingsdialogOpprett.find(OppfolgingsdialogerOpprett)).to.have.length(1);
    });

    describe('Uten Oppfolgingsdialog(er)', () => {
        it('Skal vise OppfolgingsdialogerIngenplanAT', () => {
            expect(komponent.find(OppfolgingsdialogerIngenplanAT)).to.have.length(1);
        });

        it('Skal ikke vise OppfolgingsdialogerTeasere dersom man ikke har oppfolgingsdialoger', () => {
            expect(komponent.find(OppfolgingsdialogTeasere)).to.have.length(0);
        });
    });

    describe('Uten Aktiv(e) Oppfolgingsdialog(er)', () => {
        it('Skal vise OppfolgingsdialogerIngenplanAT, dersom det ikke er aktive oppfolgingsdialoger', () => {
            komponent = shallow(<OppfolgingsdialogerVisning
                oppfolgingsdialoger={[oppfolgingsdialogTidligere]}
                kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                dinesykmeldinger={dinesykmeldinger}
                naermesteLedere={naermesteLedere}
            />);
            expect(komponent.find(OppfolgingsdialogerIngenplanAT)).to.have.length(1);
        });
    });

    describe('Med Oppfolgingsdialoger', () => {
        describe('Har Aktiv Oppfolgingsdialog', () => {
            it('Skal vise OppfolgingsdialogNyKnapp, om AT har sykmelding som er gyldig for oppfoelging med mer enn 1 AG', () => {
                const sykmeldingListe = [
                    {
                        ...hentSykmeldingGyldigForOppfoelging(dagensDato),
                        orgnummer: '12345678',
                    },
                    {
                        ...hentSykmeldingGyldigForOppfoelging(dagensDato),
                        orgnummer: '12345679',
                    },
                ];
                const naermesteLederListe = {
                    data: [
                        { orgnummer: sykmeldingListe[0].orgnummer },
                        { orgnummer: sykmeldingListe[1].orgnummer },
                    ],
                };
                komponent = shallow(<OppfolgingsdialogerVisning
                    oppfolgingsdialoger={[
                        {
                            ...oppfolgingsdialogAktiv,
                            virksomhet: {
                                virksomhetsnummer: sykmeldingListe[0].orgnummer,
                            },
                        },
                        {
                            ...oppfolgingsdialogAktiv,
                            virksomhet: {
                                virksomhetsnummer: sykmeldingListe[1].orgnummer,
                            },
                        },
                    ]}
                    opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                    dinesykmeldinger={{
                        data: sykmeldingListe,
                    }}
                    naermesteLedere={naermesteLederListe}
                />);
                expect(komponent.find(OppfolgingsdialogNyKnapp)).to.have.length(1);
            });

            it('Skal ikke vise OppfolgingsdialogNyKnapp, om AT har sykmelding gyldig for oppfoelging med kun 1 AG', () => {
                komponent = shallow(<OppfolgingsdialogerVisning
                    oppfolgingsdialoger={[oppfolgingsdialogAktiv]}
                    kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                    opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                />);
                expect(komponent.find(OppfolgingsdialogNyKnapp)).to.have.length(0);
            });

            it('Skal vise OppfolgingsdialogerTeasere dersom man har minst 1 aktiv oppfolgingsdialog', () => {
                komponent = shallow(<OppfolgingsdialogerVisning
                    oppfolgingsdialoger={[oppfolgingsdialogAktiv]}
                    kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                    opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                />);
                expect(komponent.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });
        });

        describe('Har Tidligere Oppfolgingsdialoger', () => {
            it('Skal vise OppfolgingsdialogerTeasere dersom man har minst 1 tidligere oppfolgingsdialoger', () => {
                komponent = shallow(<OppfolgingsdialogerVisning
                    oppfolgingsdialoger={[oppfolgingsdialogTidligere]}
                    kopierOppfolgingsdialog={kopierOppfolgingsdialog}
                    opprettOppfolgingsdialog={opprettOppfolgingsdialog}
                    dinesykmeldinger={dinesykmeldinger}
                    naermesteLedere={naermesteLedere}
                />);
                expect(komponent.find(OppfolgingsdialogTeasere)).to.have.length(1);
            });
        });
    });

    describe('OppfolgingsdialogNyKnapp', () => {
        let visOppfolgingsdialogOpprett;

        beforeEach(() => {
            visOppfolgingsdialogOpprett = sinon.spy();
        });

        it('Skal vise en knapp som kaller til OpprettOppfolgingsdialog', () => {
            komponent = shallow(<OppfolgingsdialogNyKnapp
                visOppfolgingsdialogOpprett={visOppfolgingsdialogOpprett}
            />);
            komponent.find(Knapp).simulate('click');
            expect(visOppfolgingsdialogOpprett.calledOnce).to.equal(true);
        });
    });
});
