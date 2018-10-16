import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import {
    Tidslinje,
    TIDSLINJE_TYPER,
    setLedetekster,
} from 'digisyfo-npm';
import ledetekster from '../mockLedetekster';
import {
    Container,
    mapStateToProps,
    mapArbeidssituasjonParam,
    setHash,
} from '../../js/sider/TidslinjeSide';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';

chai.use(chaiEnzyme());
const expect = chai.expect;

const hendelserData = [{
    ledetekst: 'tidslinje.utarbeide.plan',
    bilde: '/sykefravaer/img/tidslinje/innen4uker.svg',
    alt: '',
    visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
    key: 0,
}, {
    ledetekst: 'tidslinje.delta.arbeid',
    bilde: '/sykefravaer/img/tidslinje/innen6uker.svg',
    alt: '',
    visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
    key: 2,
}, {
    ledetekst: 'tidslinje.dialogmote',
    img: '/sykefravaer/img/tidslinje/innen24uker.svg',
    alt: '',
    visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
    key: 3,
}, {
    ledetekst: 'tidslinje.sluttfasen',
    visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
    key: 4,
}];

describe('Container', () => {
    let initState;

    beforeEach(() => {
        setLedetekster(ledetekster);
        initState = {
            ledetekster: {
                data: ledetekster,
                henter: false,
                hentingFeilet: false,
            },
            brukerinfo: {
                innstillinger: {},
                bruker: {},
            },
            tidslinjer: {
                data: [{
                    hendelser: hendelserData,
                }],
            },
            sykeforloep: {
                henter: false,
                hentet: false,
                data: {},
            },
            arbeidssituasjon: TIDSLINJE_TYPER.MED_ARBEIDSGIVER,
        };
    });

    describe('mapArbeidssituasjonParam', () => {
        it('Skal returnere MED_ARBEIDSGIVER når param === "med-arbeidsgiver"', () => {
            const resultat = mapArbeidssituasjonParam('med-arbeidsgiver');
            expect(resultat).to.equal(TIDSLINJE_TYPER.MED_ARBEIDSGIVER);
        });

        it('Skal returnere UTEN_ARBEIDSGIVER når param === "uten-arbeidsgiver"', () => {
            const resultat = mapArbeidssituasjonParam('uten-arbeidsgiver');
            expect(resultat).to.equal(TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER);
        });

        it('Skal returnere MED_ARBEIDSGIVER når param === "mitt-ukjente-param"', () => {
            const resultat = mapArbeidssituasjonParam('mitt-ukjente-param');
            expect(resultat).to.equal(TIDSLINJE_TYPER.MED_ARBEIDSGIVER);
        });

        it('Skal returnere undefined når param === undefined', () => {
            const resultat = mapArbeidssituasjonParam(undefined);
            expect(resultat).to.equal(undefined);
        });
    });

    describe('mapStateToProps', () => {
        it('Skal returnere hendelser', () => {
            const props = mapStateToProps(initState);
            expect(props.hendelser).to.deep.equal([{
                ledetekst: 'tidslinje.utarbeide.plan',
                bilde: '/sykefravaer/img/tidslinje/innen4uker.svg',
                alt: '',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 0,
            }, {
                ledetekst: 'tidslinje.delta.arbeid',
                bilde: '/sykefravaer/img/tidslinje/innen6uker.svg',
                alt: '',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 2,
            }, {
                ledetekst: 'tidslinje.dialogmote',
                img: '/sykefravaer/img/tidslinje/innen24uker.svg',
                alt: '',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 3,
            }, {
                ledetekst: 'tidslinje.sluttfasen',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 4,
            }]);
        });

        it('Skal returnere arbeidssituasjon fra parameter i URL dersom det finnes og er satt til med-arbeidsgiver', () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER;
            const ownProps = {
                params: {
                    arbeidssituasjon: 'med-arbeidsgiver',
                },
            };
            const props = mapStateToProps(initState, ownProps);
            expect(props.arbeidssituasjon).to.equal(TIDSLINJE_TYPER.MED_ARBEIDSGIVER);
        });

        it('Skal returnere arbeidssituasjon fra parameter i URL dersom det finnes og er satt til uten-arbeidsgiver', () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
            const ownProps = {
                params: {
                    arbeidssituasjon: 'uten-arbeidsgiver',
                },
            };
            const props = mapStateToProps(initState, ownProps);
            expect(props.arbeidssituasjon).to.equal(TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER);
        });

        it('Skal returnere default arbeidssituasjon dersom parameter i URL er satt til noe som er ukjent', () => {
            const ownProps = {
                params: {
                    arbeidssituasjon: 'banankake',
                },
            };
            const props = mapStateToProps(initState, ownProps);
            expect(props.arbeidssituasjon).to.equal(TIDSLINJE_TYPER.MED_ARBEIDSGIVER);
        });

        it('Skal returnere arbeidssituasjon', () => {
            initState.brukerinfo.innstillinger.arbeidssituasjon = TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER;
            const props = mapStateToProps(initState);
            expect(props.arbeidssituasjon).to.equal(TIDSLINJE_TYPER.UTEN_ARBEIDSGIVER);
        });

        it('Skal returnere brødsmuler', () => {
            const props = mapStateToProps(initState);
            expect(props.brodsmuler).to.deep.equal([{
                tittel: 'Ditt sykefravær',
                sti: '/',
                erKlikkbar: true,
            }, {
                tittel: 'Hva skjer under sykefraværet?',
            }]);
        });

        it('Skal returnere apneHendelseIder', () => {
            const props = mapStateToProps(initState, {
                location: {
                    hash: '#1/2',
                },
            });
            expect(props.apneHendelseIder).to.deep.equal(['1', '2']);
        });
    });

    describe('Container', () => {
        let apneHendelserSpy;
        let dispatch;
        let sykeforloep;

        beforeEach(() => {
            apneHendelserSpy = sinon.spy();
            dispatch = sinon.spy();
            sykeforloep = {
                henter: false,
                hentet: false,
                data: {},
            };
        });

        it('Skal vise en AppSpinner dersom ledetekster ikke er lastet og vi venter på sykeforloep', () => {
            const hendelser = [];
            const component = shallow(<Container
                dispatch={dispatch}
                ledetekster={ledetekster}
                sykeforloep={Object.assign({}, sykeforloep, {
                    hentet: true,
                })}
                hendelser={hendelser}
                apneHendelser={apneHendelserSpy}
                arbeidssituasjon={TIDSLINJE_TYPER.MED_ARBEIDSGIVER}
                henter
            />);
            expect(component.find(AppSpinner)).to.have.length(1);
        });

        it('Skal vise en Feilmelding dersom henting av ledetekster feiler', () => {
            const hendelser = [];
            const component = shallow(<Container
                dispatch={dispatch}
                ledetekster={ledetekster}
                sykeforloep={sykeforloep}
                hendelser={hendelser}
                apneHendelser={apneHendelserSpy}
                arbeidssituasjon={TIDSLINJE_TYPER.MED_ARBEIDSGIVER}
                hentingFeilet
            />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });

        it('Skal sende arbeidssituasjon videre til tidslinjen', () => {
            const _ledetekster = {
                data: {},
            };
            const arbeidssituasjon = TIDSLINJE_TYPER.MED_ARBEIDSGIVER;
            const hendelser = [{
                ledetekst: 'tidslinje.utarbeide.plan',
                bilde: '/sykefravaer/img/tidslinje/innen4uker.svg',
                alt: '',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 0,
            }, {
                ledetekst: 'tidslinje.delta.arbeid',
                bilde: '/sykefravaer/img/tidslinje/innen6uker.svg',
                alt: '',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 2,
            }, {
                ledetekst: 'tidslinje.dialogmote',
                img: '/sykefravaer/img/tidslinje/innen24uker.svg',
                alt: '',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 3,
            }, {
                ledetekst: 'tidslinje.sluttfasen',
                visning: [TIDSLINJE_TYPER.MED_ARBEIDSGIVER],
                key: 4,
            }];
            const component = shallow(<Container
                dispatch={dispatch}
                ledetekster={_ledetekster}
                hendelser={hendelser}
                sykeforloep={sykeforloep}
                arbeidssituasjon={arbeidssituasjon}
                apneHendelser={apneHendelserSpy}
            />);
            const tidslinjeComp = component.find(Tidslinje);
            expect(tidslinjeComp.prop('arbeidssituasjon')).to.equal(TIDSLINJE_TYPER.MED_ARBEIDSGIVER);
        });
    });

    describe('Set hash', () => {
        let replaceState;

        beforeEach(() => {
            replaceState = sinon.spy();
            window.history.replaceState = replaceState;
        });

        it('Skal kalle på window.history.replaceState med null, null, # når det ikke finnes noen åpne milepæler', () => {
            setHash([]);
            expect(replaceState.calledOnce).to.equal(true);
            expect(replaceState.getCall(0).args[0]).to.equal(null);
            expect(replaceState.getCall(0).args[1]).to.equal(null);
            expect(replaceState.getCall(0).args[2]).to.equal('#');
        });

        it('Skal kalle på window.history.replaceState med null, null, #1/2/3 når det finnes noen åpne milepæler', () => {
            setHash([{
                id: 0,
                erApen: false,
            }, {
                id: 1,
                erApen: true,
            }, {
                id: 2,
                erApen: true,
            }, {
                id: 3,
                erApen: true,
            }, {
                id: 4,
                erApen: false,
            }, {
                id: 5,
                erApen: false,
            }]);
            expect(replaceState.calledOnce).to.equal(true);
            expect(replaceState.getCall(0).args[0]).to.equal(null);
            expect(replaceState.getCall(0).args[1]).to.equal(null);
            expect(replaceState.getCall(0).args[2]).to.equal('#1/2/3');
        });
    });
});
