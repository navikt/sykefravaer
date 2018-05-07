import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import getSykmelding from '../../mockSykmeldinger';
import { ArbeidsgiversSykmeldingWrapper, mapStateToProps } from '../../../js/containers/sykmelding/ArbeidsgiversSykmeldingContainer';
import ArbeidsgiversSykmelding from '../../../js/components/sykmelding/ArbeidsgiversSykmelding';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('ArbeidsgiversSykmeldingContainer', () => {
    let ownProps = {};
    let state;
    let sykmeldinger;
    let actions;
    let hentArbeidsgiversSykmeldinger;

    beforeEach(() => {
        sykmeldinger = [
            getSykmelding({
                id: '1',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2016-02-01'),
                        tom: new Date('2016-02-06'),
                        grad: 67,
                    }],
                },
            }),
            getSykmelding({
                id: '2',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2016-01-01'),
                        tom: new Date('2016-01-06'),
                        grad: 67,
                    }],
                },
            }),
            getSykmelding({
                id: '3',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2016-03-01'),
                        tom: new Date('2016-03-10'),
                        grad: 67,
                    }],
                },
            }),
            getSykmelding({
                id: '4',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2016-03-01'),
                        tom: new Date('2016-03-20'),
                        grad: 67,
                    }],
                },
            }),
            getSykmelding({
                id: '5',
                status: 'SENDT',
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date('2016-03-01'),
                        tom: new Date('2016-03-20'),
                        grad: 67,
                    }],
                },
            }),
        ];

        state = {
            arbeidsgiversSykmeldinger: {
                data: [],
                hentingFeilet: false,
                henter: false,
                hentet: true,
            },
        };
        ownProps = {};
        ownProps.sykmeldingId = '3';

        hentArbeidsgiversSykmeldinger = sinon.spy();
        actions = { hentArbeidsgiversSykmeldinger };
    });

    describe('Henting av data', () => {
        describe('Arbeidsgivers sykmeldinger', () => {
            it('Skal hente arbeidsgivers sykmeldinger dersom de ikke er hentet', () => {
                state.arbeidsgiversSykmeldinger.hentet = false;
                state.arbeidsgiversSykmeldinger.henter = false;
                const props = mapStateToProps(state, ownProps);
                shallow(<ArbeidsgiversSykmeldingWrapper {...props} {...actions} />);
                expect(hentArbeidsgiversSykmeldinger.called).to.equal(true);
            });

            it('Skal ikke hente arbeidsgivers sykmeldinger dersom de hentes', () => {
                state.arbeidsgiversSykmeldinger.hentet = false;
                state.arbeidsgiversSykmeldinger.henter = true;
                const props = mapStateToProps(state, ownProps);
                shallow(<ArbeidsgiversSykmeldingWrapper {...props} {...actions} />);
                expect(hentArbeidsgiversSykmeldinger.called).to.equal(false);
            });

            it('Skal ikke hente arbeidsgivers sykmeldinger dersom de er hentet', () => {
                state.arbeidsgiversSykmeldinger.hentet = true;
                state.arbeidsgiversSykmeldinger.henter = false;
                const props = mapStateToProps(state, ownProps);
                shallow(<ArbeidsgiversSykmeldingWrapper {...props} {...actions} />);
                expect(hentArbeidsgiversSykmeldinger.called).to.equal(false);
            });
        });
    });


    describe('Visning av spinner', () => {
        it('Skal vise spinner dersom det hentes arbeidsgivers sykmeldinger', () => {
            state.arbeidsgiversSykmeldinger.henter = true;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<ArbeidsgiversSykmeldingWrapper {...props} {...actions} />);
            expect(component.find(ArbeidsgiversSykmelding).prop('henter')).to.equal(true);
        });

        it('Skal vise spinner dersom arbeidsgivers sykmeldinger ikke er hentet', () => {
            state.arbeidsgiversSykmeldinger.hentet = false;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<ArbeidsgiversSykmeldingWrapper {...props} {...actions} />);
            expect(component.find(ArbeidsgiversSykmelding).prop('henter')).to.equal(true);
        });

        it('Skal ikke vise spinner dersom arbeidsgivers sykmeldinger ikke er hentet', () => {
            state.arbeidsgiversSykmeldinger.hentet = true;
            state.arbeidsgiversSykmeldinger.henter = false;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<ArbeidsgiversSykmeldingWrapper {...props} {...actions} />);
            expect(component.find(ArbeidsgiversSykmelding).prop('henter')).to.equal(false);
        });
    });


    describe('mapStateToProps', () => {
        beforeEach(() => {
            state.arbeidsgiversSykmeldinger.data = sykmeldinger;
        });

        it('Skal returnere sykmelding basert på ownProps.params.sykmeldingId', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmelding).to.equal(sykmeldinger[2]);
        });
    });
});
