import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Container, mapStateToProps } from './SykmeldingerSide';
import AppSpinner from '../../../components/AppSpinner';
import Feilmelding from '../../../components/Feilmelding';
import Sykmeldinger from '../../sykmeldinger/Sykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

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
            });
            expect(res.sykmeldinger).to.deep.equal(dineSykmeldinger.data);
            expect(res.henter).to.equal(false);
        });
    });

    describe('Container', () => {
        let hentDineSykmeldinger;
        let hentSmSykmeldinger;
        let actions;

        beforeEach(() => {
            dispatch = sinon.spy();
            hentDineSykmeldinger = sinon.spy();
            hentSmSykmeldinger = sinon.spy();
            actions = {
                hentDineSykmeldinger,
                hentSmSykmeldinger,
            };
        });

        it('Skal hente sykmeldinger', () => {
            shallow(<Container {...actions} ykmeldinger={[]} sykmeldingerHentet={false} dispatch={dispatch} />);
            expect(hentDineSykmeldinger.calledOnce).to.equal(true);
        });

        it('Skal vise spinner dersom data hentes', () => {
            const component = shallow(<Container {...actions} ykmeldinger={[]} henter dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />)).to.equal(true);
        });

        it('Skal ikke spinner dersom data ikke hentes', () => {
            const component = shallow(<Container {...actions} ykmeldinger={[]} dispatch={dispatch} />);
            expect(component.contains(<AppSpinner />)).to.equal(false);
        });

        it('Skal vise feilmelding dersom henting feilet', () => {
            const component = shallow(<Container {...actions} ykmeldinger={[]} dispatch={dispatch} hentingFeilet />);
            expect(component.contains(<Feilmelding />)).to.equal(true);
        });

        it('Skal vise Sykmeldinger dersom henting er OK', () => {
            const component = shallow(<Container {...actions} sykmeldinger={[]} dispatch={dispatch} />);
            expect(component.find(Sykmeldinger)).to.have.length(1);
        });
    });
});
