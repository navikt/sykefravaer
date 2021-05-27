import chai from 'chai';
import React from 'react';
import { mount, shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Link } from 'react-router';
import { setLedetekster } from '../../digisyfoNpm';
import { mapStateToProps, DineOppgaverComponent, EksternLi } from './DineOppgaverContainer';
import {
    moteBekreftet,
    moteAvbrutt,
    moteIkkeBesvart,
    moteBesvartAlleAlternativer,
    moteBesvartMedNyeAlternativerBesvart,
    moteBesvartMedNyeAlternativerIkkeBesvart,
} from '../../../test/mock/mockMote';
import {
    varselHendelse1,
    varselHendelse2,
    bekreftetHendelse1,
    bekreftetHendelse2,
    bekreftetHendelse3,
    ukjentHendelse,
} from '../../aktivitetskrav/sider/AktivitetskravvarselSide.test';
import smSykmeldinger from '../../sykmeldinger/data/sm-sykmeldinger/smSykmeldinger';
import unleashToggles from '../../data/unleash-toggles/unleashToggles';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('DineOppgaverComponent', () => {
    describe('mapStateToProps', () => {
        let state;
        let clock;

        beforeEach(() => {
            clock = sinon.useFakeTimers(1485524800000); // in a distant future in a galaxy far, far away
            window.dataLayer = {
                push: () => {},
            };
            state = {
                unleashToggles: unleashToggles(
                    unleashToggles(),
                ),
                dineSykmeldinger: {
                    data: [{
                        status: 'NY',
                        id: '1',
                    }, {
                        status: 'SENDT',
                        id: '2',
                    }],
                    hentet: true,
                },
                hendelser: {
                    data: [],
                    hentet: true,
                },
                soknader: {
                    data: [{
                        status: 'NY',
                        id: '3',
                        soknadstype: 'ARBEIDSTAKERE',
                    }, {
                        status: 'SENDT',
                        id: '4',
                        soknadstype: 'ARBEIDSTAKERE',
                    }],
                },
                mote: {
                    data: null,
                },
                motebehov: {
                    data: {},
                },
                oppfolgingsdialoger: {
                    data: [],
                    hentet: true,
                },
                sykepengerVarsel: {
                    data: null,
                },
                smSykmeldinger: smSykmeldinger(),
            };
        });

        afterEach(() => {
            clock.restore();
        });

        it('Skal returnere NYE sykmeldinger', () => {
            const res = mapStateToProps(state);
            expect(res.sykmeldinger).to.deep.equal([{
                status: 'NY',
                id: '1',
            }]);
        });

        it('Skal returnere sykmeldingerHentet', () => {
            const res = mapStateToProps(state);
            expect(res.sykmeldingerHentet).to.equal(true);
        });

        it('Skal returnere sykmeldingerHentet', () => {
            state.dineSykmeldinger.hentet = false;
            const res = mapStateToProps(state);
            expect(res.sykmeldingerHentet).to.equal(false);
        });

        it('Skal returnere NYE sykepengesoknader', () => {
            const res = mapStateToProps(state);
            expect(res.soknader).to.deep.equal([{
                status: 'NY',
                id: '3',
                soknadstype: 'ARBEIDSTAKERE',
            }]);
        });

        it('Skal returnere visOppgaver === true hvis det finnes oppgaver', () => {
            const res = mapStateToProps(state);
            expect(res.visOppgaver).to.equal(true);
        });

        it('Skal returnere visOppgaver === false hvis det ikke finnes oppgaver', () => {
            state.dineSykmeldinger.data = [];
            state.soknader.data = [];
            const res = mapStateToProps(state);
            expect(res.visOppgaver).to.equal(false);
        });

        it('Skal returnere visOppgaver === true hvis det finnes møte, men ingen sykmeldinger/sykepengesoknader', () => {
            state.dineSykmeldinger.data = [];
            state.soknader.data = [];
            state.mote.data = moteIkkeBesvart;
            const res = mapStateToProps(state);
            expect(res.visOppgaver).to.equal(true);
        });

        it('Skal returnere hendelserHentet når hendelser er hentet', () => {
            state.hendelser.hentet = false;
            const res = mapStateToProps(state);
            expect(res.hendelserHentet).to.equal(false);
        });

        it('Skal returnere visAktivitetskrav === true dersom det finnes et nytt krav', () => {
            state.hendelser.data = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2];
            const res = mapStateToProps(state);
            expect(res.visAktivitetskrav).to.equal(true);
        });

        it('Skal returnere visAktivitetskrav === false dersom det ikke finnes et nytt krav', () => {
            state.hendelser.data = [ukjentHendelse];
            const res = mapStateToProps(state);
            expect(res.visAktivitetskrav).to.equal(false);
        });

        it('Skal returnere visAktivitetskrav === false dersom det siste kravet allerede er bekreftet', () => {
            state.hendelser.data = [ukjentHendelse, varselHendelse1, bekreftetHendelse1, varselHendelse2, bekreftetHendelse2, bekreftetHendelse3];
            const res = mapStateToProps(state);
            expect(res.visAktivitetskrav).to.equal(false);
        });

        it('Skal returnere visAktivitetskrav === true dersom det kun finnes aktivitetskrav (dvs. ingen sykmeldinger/søknader)', () => {
            const hendelser = [
                {
                    id: 71529,
                    inntruffetdato: new Date('2017-10-31'),
                    ressursId: null,
                    type: 'NY_NAERMESTE_LEDER',
                },
                {
                    id: 71840,
                    inntruffetdato: new Date('2017-11-13'),
                    ressursId: null,
                    type: 'NY_NAERMESTE_LEDER',
                },
                {
                    id: 71749,
                    inntruffetdato: new Date('2017-11-08'),
                    ressursId: 'c54a472e-836f-4f51-b56e-643f4b5167a7',
                    type: 'AKTIVITETSKRAV_VARSEL',
                },
            ];
            state.hendelser.data = hendelser;
            state.dineSykmeldinger.data = [];
            state.soknader.data = [];
            state.mote.data = null;
            const res = mapStateToProps(state);
            expect(res.visOppgaver).to.equal(true);
        });

        describe('Møte', () => {
            beforeEach(() => {
                state.dineSykmeldinger.data = [];
                state.soknader.data = [];
            });

            it('Skal returnere mote: null hvis møte ikke finnes', () => {
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it('Skal returnere mote: null hvis møtet er bekreftet', () => {
                state.mote.data = moteBekreftet;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it('Skal returnere mote: null hvis møte er avbrutt', () => {
                state.mote.data = moteAvbrutt;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it("Skal returnere mote: 'TRENGER_SVAR' hvis møte ikke er besvart", () => {
                state.mote.data = moteIkkeBesvart;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal('TRENGER_SVAR');
                expect(res.visOppgaver).to.equal(true);
            });

            it('Skal returnere mote: null hvis møte er besvart', () => {
                state.mote.data = moteBesvartAlleAlternativer;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it('Skal returnere mote: null hvis møte er besvart med nye alternativer besvart', () => {
                state.mote.data = moteBesvartMedNyeAlternativerBesvart;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal(null);
                expect(res.visOppgaver).to.equal(false);
            });

            it("Skal returnere mote: 'TRENGER_SVAR' hvis møte er besvart med nye alternativer IKKE besvart", () => {
                state.mote.data = moteBesvartMedNyeAlternativerIkkeBesvart;
                const res = mapStateToProps(state);
                expect(res.mote).to.equal('TRENGER_SVAR');
                expect(res.visOppgaver).to.equal(true);
            });
        });
    });

    describe('DineOppgaverComponent', () => {
        let component;

        beforeEach(() => {
            setLedetekster({
                'dine-oppgaver.tittel': 'Oppgaver som venter på deg',
                'dine-oppgaver.sykepengesoknader.en-soknad': 'Du har 1 ny søknad',
                'dine-oppgaver.sykepengesoknader.flere-soknader': 'Du har %ANTALL% nye søknader',
                'dine-oppgaver.sykmeldinger.en-sykmelding': 'Du har 1 ny sykmelding',
                'dine-oppgaver.sykmeldinger.flere-sykmeldinger': 'Du har %ANTALL% nye sykmeldinger',
                'dine-oppgaver.mote.svar': 'Svar på NAVs spørsmål om dialogmøte',
                'dine-oppgaver.aktivitetskrav': 'Les hva du må gjøre for å innfri aktivitetskravet',
                'sykefravaer.dineoppgaver.nyttMotebehovVarsel': 'Du har 1 ny forspørsel om behov for dialogmøte',
                'dine-oppgaver.oppfoelgingsdialog.sykmeldt.nyeplaner.entall': 'Det er startet 1 oppfølgingsplan du er en del av',
                'dine-oppgaver.oppfoelgingsdialog.avventendegodkjenninger.entall': 'Du har 1 oppfølgingsplan som venter på godkjenning av deg.',
            });
        });

        it('Skal vise null hvis visOppgaver === false', () => {
            component = shallow(<DineOppgaverComponent oppfolgingsdialogerHentet sykmeldingerHentet hendelserHentet visOppgaver={false} />);
            expect(component.html()).to.equal('');
        });

        describe('Hvis du har oppgaver', () => {
            beforeEach(() => {
                component = mount(<DineOppgaverComponent
                    oppfolgingsdialogerHentet
                    sykmeldingerHentet
                    hendelserHentet
                    visOppgaver
                    sykepengesoknader={[{ id: '1' }]}
                    sykmeldinger={[{}, {}]}
                    avvisteSmSykmeldinger={[]}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
            });

            it('Skal vise tittel', () => {
                expect(component.find('.js-tittel')).to.contain('Oppgaver som venter på deg');
            });

            it('Skal vise tittel når man har en avvist sykmelding', () => {
                component = mount(<DineOppgaverComponent
                    oppfolgingsdialogerHentet
                    sykmeldingerHentet
                    hendelserHentet
                    visOppgaver
                    sykepengesoknader={[]}
                    sykmeldinger={[]}
                    avvisteSmSykmeldinger={[{}]}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
                expect(component.find('.js-tittel')).to.contain('Oppgaver som venter på deg');
            });

            it('Skal vise en lenke til din søknad hvis det er én søknad', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    soknader={[{ id: '1' }]}
                    sykmeldinger={[{}, {}]}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
                expect(component.find('a').at(1).prop('href')).to.equal('/sykepengesoknad/soknader/1');
                expect(component.find('a').at(1).text()).to.equal('Du har 1 ny søknad');
            });

            it('Skal vise en lenke til dine sykepengesoknader hvis det er flere søknader', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    soknader={[{ id: '1' }, {}]}
                    sykmeldinger={[{}, {}]}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
                expect(component.find('a').at(1).prop('href')).to.equal('/sykepengesoknad');
                expect(component.find('a').at(1).text()).to.equal('Du har 2 nye søknader');
            });

            it.skip('Skal vise en lenke til din sykmelding hvis det er én søknad', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    soknader={[{ id: '1' }]}
                    sykmeldinger={[{ id: 1 }]}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
                expect(component.find(Link).at(0).prop('to')).to.equal('/sykefravaer/sykmeldinger/1');
                expect(component.find(Link).at(0).text()).to.equal('Du har 1 ny sykmelding');
            });

            it.skip('Skal vise en lenke til dine sykmeldinger hvis det er flere sykmeldinger', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    soknader={[{ id: '1' }, {}]}
                    sykmeldinger={[{}, {}]}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
                expect(component.find(Link).at(0).prop('to')).to.equal('/sykefravaer/sykmeldinger');
                expect(component.find(Link).at(0).text()).to.equal('Du har 2 nye sykmeldinger');
            });

            it('Skal vise en lenke til møte hvis møte = TRENGER_SVAR', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    mote="TRENGER_SVAR"
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
                expect(component.find(EksternLi).at(0).prop('url')).to.equal('/dialogmote');
                expect(component.find(EksternLi).at(0).text()).to.equal('Svar på NAVs spørsmål om dialogmøte');
            });

            it('Skal vise lenke til motebehov hvis motebehov er tilgjengelig og ikke besvart', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    mote={null}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]}
                    harNyttMotebehov
                />);
                expect(component.find(EksternLi).at(0).prop('url')).to.equal('/dialogmote/behov');
                expect(component.find(EksternLi).at(0).text()).to.equal('Du har 1 ny forspørsel om behov for dialogmøte');
            });

            it("Skal vise lenke til aktivitetskrav hvis det er kommet et nytt varsel'", () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    visAktivitetskrav
                    mote={null}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[]} />);
                expect(component.find(Link).at(0).prop('to')).to.equal('/sykefravaer/aktivitetsplikt/');
                expect(component.find(Link).at(0).text()).to.equal('Les hva du må gjøre for å innfri aktivitetskravet');
            });

            it('Skal vise lenke til oppfølgingsplan hvis det er kommet nye planer', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    mote={null}
                    avventendeGodkjenninger={[]}
                    nyePlaner={[{ plan: 'test' }]} />);
                expect(component.find(EksternLi).at(0).prop('url')).to.equal('/oppfolgingsplan/oppfolgingsplaner');
                expect(component.find(EksternLi).at(0).text()).to.equal('Det er startet 1 oppfølgingsplan du er en del av');
            });

            it('Skal vise lenke til oppfølgingsplan hvis det er avventende godkjenninger', () => {
                component = mount(<DineOppgaverComponent
                    sykmeldingerHentet
                    oppfolgingsdialogerHentet
                    hendelserHentet
                    visOppgaver
                    mote={null}
                    avventendeGodkjenninger={[{ plan: 'test' }]}
                    nyePlaner={[]} />);
                expect(component.find(EksternLi).at(0).prop('url')).to.equal('/oppfolgingsplan/oppfolgingsplaner');
                expect(component.find(EksternLi).at(0).text()).to.equal('Du har 1 oppfølgingsplan som venter på godkjenning av deg.');
            });
        });
    });
});
