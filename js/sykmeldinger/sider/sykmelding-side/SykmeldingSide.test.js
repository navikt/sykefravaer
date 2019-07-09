import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../../../../test/mock/mockLedetekster';
import getSykmelding from '../../../../test/mock/mockSykmeldinger';
import { Container, mapStateToProps } from './SykmeldingSide';
import Feilmelding from '../../../components/Feilmelding';
import NySykmelding from '../../sykmelding-ny/NySykmelding';
import SendtSykmelding from '../../sykmelding-sendt/SendtSykmelding';
import AvbruttSykmelding from '../../sykmelding-avbrutt/AvbruttSykmelding';
import BekreftetSykmelding from '../../sykmelding-bekreftet/BekreftetSykmelding';
import UtgaattSykmelding from '../../sykmelding-utgatt/UtgaattSykmelding';
import smSykmeldinger from '../../data/sm-sykmeldinger/smSykmeldinger';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('DinSykmeldingContainer', () => {
    const ownProps = {};
    let state;
    let sykmeldinger;
    let actions;
    let hentDineSykmeldinger;
    let hentSmSykmeldinger;

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
            dineSykmeldinger: {
                data: [],
                hentingFeilet: false,
                henter: false,
                hentet: true,
            },
            arbeidsgiversSykmeldinger: {
                data: [],
                hentingFeilet: false,
                henter: false,
                hentet: true,
            },
            ledetekster: {
                data: ledetekster,
                henter: false,
                hentingFeilet: false,
            },
            smSykmeldinger: smSykmeldinger(),
        };
        ownProps.params = {};
        ownProps.params.sykmeldingId = '3';

        hentDineSykmeldinger = sinon.spy();
        hentSmSykmeldinger = sinon.spy();
        actions = { hentDineSykmeldinger, hentSmSykmeldinger };
    });

    describe('Henting av data', () => {
        describe('Dine sykmeldinger', () => {
            it('Skal hente dine sykmeldinger', () => {
                state.dineSykmeldinger.hentet = false;
                const props = mapStateToProps(state, ownProps);
                shallow(<Container {...props} {...actions} />);
                expect(hentDineSykmeldinger.called).to.equal(true);
            });
        });
    });


    describe('Visning av spinner', () => {
        it('Skal vise spinner dersom det hentes dine sykmeldinger', () => {
            state.dineSykmeldinger.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.equal(true);
        });

        it('Skal vise spinner dersom det hentes ledetekster', () => {
            state.ledetekster.henter = true;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.equal(true);
        });

        it('Skal vise spinner dersom dine sykmeldinger ikke er hentet', () => {
            state.dineSykmeldinger.hentet = false;
            const props = mapStateToProps(state, ownProps);
            expect(props.henter).to.equal(true);
        });
    });

    describe('Visning av feilmelding', () => {
        beforeEach(() => {
            state.dineSykmeldinger.hentet = true;
            state.ledetekster.hentet = true;
            state.arbeidsgiversSykmeldinger.hentet = true;
        });

        it('Skal vise feilmelding dersom dine sykmeldinger feiler', () => {
            state.dineSykmeldinger.hentingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });

        it('Skal vise feilmelding dersom ledetekster feiler', () => {
            state.ledetekster.hentingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });

        it('Skal vise feilmelding dersom arbeidsgivers sykmeldinger feiler', () => {
            state.arbeidsgiversSykmeldinger.hentingFeilet = true;
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });

        it('Skal vise feilmelding dersom valgt sykmelding ikke finnes', () => {
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });
    });

    describe('Visning basert på sykmeldingens status', () => {
        let sendtSykmelding;
        let tilSendingSykmelding;
        let tilSendingSykmeldingArbeidsgiver;
        let bekreftetSykmelding;
        let bekreftetSykmeldingArbeidsgiver;
        let utgaattSykmelding;
        let nySykmelding;
        let nySykmeldingArbeidsgiver;
        let avbruttSykmelding;
        let sendtSykmeldingArbeidsgiver;
        let ukjentSykmelding;

        beforeEach(() => {
            sendtSykmelding = getSykmelding({
                id: '44-sendt',
                status: 'SENDT',
            });

            sendtSykmeldingArbeidsgiver = getSykmelding({
                id: '44-sendt',
                status: 'SENDT',
                diagnose: 'HEMMELIG',
            });

            tilSendingSykmelding = getSykmelding({
                status: 'TIL_SENDING',
                id: '44-til-sending',
            });

            tilSendingSykmeldingArbeidsgiver = getSykmelding({
                status: 'TIL_SENDING',
                id: '44-til-sending',
                diagnose: 'HEMMELIG',
            });

            bekreftetSykmelding = getSykmelding({
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                id: '44-bekreftet',
            });

            bekreftetSykmeldingArbeidsgiver = getSykmelding({
                status: 'BEKREFTET',
                id: '44-bekreftet',
                diagnose: 'HEMMELIG',
            });

            utgaattSykmelding = getSykmelding({
                status: 'UTGAATT',
                id: '44-utgaatt',
            });

            nySykmelding = getSykmelding({
                status: 'NY',
                id: '44-ny',
            });

            nySykmeldingArbeidsgiver = getSykmelding({
                status: 'NY',
                id: '44-ny',
                diagnose: 'TOPPHEMMELIG',
            });


            avbruttSykmelding = getSykmelding({
                status: 'AVBRUTT',
                id: '44-avbrutt',
            });

            ukjentSykmelding = getSykmelding({
                status: 'UKJENT',
                id: '44-ukjent',
            });

            state.dineSykmeldinger.data = [
                sendtSykmelding,
                tilSendingSykmelding,
                bekreftetSykmelding,
                utgaattSykmelding,
                nySykmelding,
                avbruttSykmelding,
                ukjentSykmelding,
            ];

            state.arbeidsgiversSykmeldinger.data = [
                sendtSykmeldingArbeidsgiver,
                tilSendingSykmeldingArbeidsgiver,
                bekreftetSykmeldingArbeidsgiver,
                utgaattSykmelding,
                nySykmeldingArbeidsgiver,
                avbruttSykmelding,
            ];
        });

        it('Skal vise SendtSykmelding hvis sykmeldingen er SENDT', () => {
            ownProps.params.sykmeldingId = '44-sendt';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(SendtSykmelding)).to.have.length(1);
            expect(component.find(SendtSykmelding).prop('dinSykmelding')).to.deep.equal(sendtSykmelding);
        });


        it('Skal vise SendtSykmelding hvis sykmeldingen er TIL_SENDING', () => {
            ownProps.params.sykmeldingId = '44-til-sending';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(SendtSykmelding)).to.have.length(1);
            expect(component.find(SendtSykmelding).prop('dinSykmelding')).to.deep.equal(tilSendingSykmelding);
        });


        it('Skal vise AvbruttSykmelding hvis sykmeldingen er AVBRUTT', () => {
            ownProps.params.sykmeldingId = '44-avbrutt';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(AvbruttSykmelding)).to.have.length(1);
            expect(component.find(AvbruttSykmelding).prop('sykmelding')).to.deep.equal(avbruttSykmelding);
        });

        it('Skal vise UtgaattSykmelding hvis sykmeldingen er UTGAATT', () => {
            ownProps.params.sykmeldingId = '44-utgaatt';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(UtgaattSykmelding)).to.have.length(1);
            expect(component.find(UtgaattSykmelding).prop('sykmelding')).to.deep.equal(utgaattSykmelding);
        });

        it('Skal vise BekreftetSykmelding hvis sykmeldingen er BEKREFTET', () => {
            ownProps.params.sykmeldingId = '44-bekreftet';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(BekreftetSykmelding)).to.have.length(1);
            expect(component.find(BekreftetSykmelding).prop('dinSykmelding')).to.deep.equal(bekreftetSykmelding);
        });


        it('Skal vise NySykmelding hvis sykmeldingen er NY', () => {
            ownProps.params.sykmeldingId = '44-ny';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(NySykmelding)).to.have.length(1);
        });

        it('Skal vise Feilmelding hvis sykmeldingen er UKJENT_STATUS', () => {
            ownProps.params.sykmeldingId = '44-ukjent';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });
    });

    describe('mapStateToProps', () => {
        beforeEach(() => {
            state.dineSykmeldinger.data = sykmeldinger;
        });

        it('Skal returnere sykmelding basert på ownProps.params.sykmeldingId', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.dinSykmelding).to.equal(sykmeldinger[2]);
        });

        it('Skal returnere sykmeldingId basert på ownProps.params.sykmeldingId', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sykmeldingId).to.equal('3');
        });
    });
});
