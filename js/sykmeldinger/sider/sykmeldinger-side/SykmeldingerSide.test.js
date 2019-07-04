import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Container, mapStateToProps } from './SykmeldingerSide';
import AppSpinner from '../../../components/AppSpinner';
import Feilmelding from '../../../components/Feilmelding';
import Sykmeldinger from '../../sykmeldinger/Sykmeldinger';
import smSykmeldinger from '../../data/sm-sykmeldinger/smSykmeldinger';
import unleashToggles from '../../../data/unleash-toggles/unleashToggles';

chai.use(chaiEnzyme());
const { expect } = chai;

let dineSykmeldinger;

describe('DineSykmeldingerContainer', () => {
    let dispatch;

    beforeEach(() => {
        const sykmeldingerArray = [{
            id: 2,
            fnr: '12',
            fornavn: 'Per',
            etternavn: 'Person',
            sykmelder: 'Ove Olsen',
            arbeidsgiver: 'Selskapet AS',
            perioder: [{
                fom: '2015-12-31',
                tom: '2016-01-06',
                grad: 67,
            }],
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosesystem: 'ICPC',
                diagnosekode: 'LP2',
            },
            arbeidsfoerEtterPerioden: true,
        }, {
            id: 1,
            fnr: '12',
            fornavn: 'Per',
            etternavn: 'Person',
            sykmelder: 'Ove Olsen',
            arbeidsgiver: 'Selskapet AS',
            perioder: [{
                fom: '2015-12-31',
                tom: '2016-01-06',
                grad: 67,
            }],
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosesystem: 'ICPC',
                diagnosekode: 'LP2',
            },
            arbeidsfoerEtterPerioden: true,
        }, {
            id: 3,
            fnr: '12',
            fornavn: 'Per',
            etternavn: 'Person',
            sykmelder: 'Ove Olsen',
            arbeidsgiver: 'Selskapet AS',
            perioder: [{
                fom: '2015-12-31',
                tom: '2016-01-06',
                grad: 67,
            }],
            hoveddiagnose: {
                diagnose: 'Influensa',
                diagnosesystem: 'ICPC',
                diagnosekode: 'LP2',
            },
            arbeidsfoerEtterPerioden: true,
        }];

        dineSykmeldinger = {
            data: sykmeldingerArray,
            hentet: true,
        };
    });

    describe('mapStateToProps', () => {
        it('skal returnere dineSykmeldinger', () => {
            const res = mapStateToProps({
                dineSykmeldinger,
                ledetekster: {
                    data: [],
                },
                brukerinfo: {
                    bruker: {},
                    innstillinger: {},
                },
                smSykmeldinger: smSykmeldinger(),
                unleashToggles: unleashToggles(),
            });
            expect(res.sykmeldinger)
                .to
                .deep
                .equal(dineSykmeldinger.data);
            expect(res.henter)
                .to
                .equal(false);
        });
    });

    describe('Container', () => {
        let doHentDineSykmeldinger;
        let doHentSmSykmeldinger;

        beforeEach(() => {
            dispatch = sinon.spy();
            doHentDineSykmeldinger = sinon.spy();
            doHentSmSykmeldinger = sinon.spy();
        });

        it('Skal hente sykmeldinger', () => {
            shallow(
                <Container
                    doHentDineSykmeldinger={doHentDineSykmeldinger}
                    doHentSmSykmeldinger={doHentSmSykmeldinger}
                    sykmeldinger={[]}
                    sykmeldingerHentet={false}
                    dispatch={dispatch}
                />,
            );
            expect(doHentDineSykmeldinger.calledOnce)
                .to
                .equal(true);
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<Container
                doHentDineSykmeldinger={doHentDineSykmeldinger}
                doHentSmSykmeldinger={doHentSmSykmeldinger}
                sykmeldinger={[]}
                henter
                dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />))
                .to
                .equal(true);
        });

        it('Skal ikke spinner dersom data ikke hentes', () => {
            const component = shallow(<Container
                doHentDineSykmeldinger={doHentDineSykmeldinger}
                doHentSmSykmeldinger={doHentSmSykmeldinger}
                sykmeldinger={[]}
                dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />))
                .to
                .equal(false);
        });

        it('Skal vise feilmelding dersom henting feilet', () => {
            const component = shallow(<Container
                doHentDineSykmeldinger={doHentDineSykmeldinger}
                doHentSmSykmeldinger={doHentSmSykmeldinger}
                sykmeldinger={[]}
                dispatch={dispatch}
                hentingFeilet />);
            expect(component.contains(<Feilmelding />))
                .to
                .equal(true);
        });

        it('Skal vise Sykmeldinger dersom henting er OK', () => {
            const component = shallow(<Container
                doHentDineSykmeldinger={doHentDineSykmeldinger}
                doHentSmSykmeldinger={doHentSmSykmeldinger}
                sykmeldinger={[]}
                dispatch={dispatch} />);
            expect(component.find(Sykmeldinger))
                .to
                .have
                .length(1);
        });
    });
});
