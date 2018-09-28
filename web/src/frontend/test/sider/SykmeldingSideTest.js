import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import ledetekster from '../mockLedetekster';
import getSykmelding from '../mockSykmeldinger';
import { Container, mapStateToProps } from '../../js/sider/SykmeldingSide';
import Feilmelding from '../../js/components/Feilmelding';
import NySykmelding from '../../js/components/sykmelding/NySykmelding';
import SendtSykmelding from '../../js/components/sykmelding/SendtSykmelding';
import AvbruttSykmelding from '../../js/components/sykmelding/AvbruttSykmelding';
import BekreftetSykmelding from '../../js/components/sykmelding/BekreftetSykmelding';
import UtgaattSykmelding from '../../js/components/sykmelding/UtgaattSykmelding';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('DinSykmeldingContainer', () => {
    const ownProps = {};
    let state;
    let sykmeldinger;
    let actions;
    let hentDineSykmeldinger;

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
        };
        ownProps.params = {};
        ownProps.params.sykmeldingId = '3';

        hentDineSykmeldinger = sinon.spy();
        actions = { hentDineSykmeldinger };
    });

    describe('Henting av data', () => {
        describe('Dine sykmeldinger', () => {
            it('Skal hente dine sykmeldinger dersom de ikke er hentet', () => {
                state.dineSykmeldinger.hentet = false;
                const props = mapStateToProps(state, ownProps);
                shallow(<Container {...props} {...actions} />);
                expect(hentDineSykmeldinger.called).to.equal(true);
            });

            it('Skal ikke hente dine sykmeldinger dersom de hentes', () => {
                state.dineSykmeldinger.henter = true;
                const props = mapStateToProps(state, ownProps);
                shallow(<Container {...props} {...actions} />);
                expect(hentDineSykmeldinger.called).to.equal(false);
            });

            it('Skal ikke hente dine sykmeldinger dersom de er hentet', () => {
                state.dineSykmeldinger.hentet = true;
                const props = mapStateToProps(state, ownProps);
                shallow(<Container {...props} {...actions} />);
                expect(hentDineSykmeldinger.called).to.equal(false);
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
            expect(component.find(NySykmelding).prop('sykmelding')).to.deep.equal(nySykmelding);
        });

        it('Skal vise Feilmelding hvis sykmeldingen er UKJENT_STATUS', () => {
            ownProps.params.sykmeldingId = '44-ukjent';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(Feilmelding)).to.have.length(1);
        });
    });

    describe('Varsel om at det finnes eldre sykmelding', () => {
        it('Skal returnere visEldreSykmeldingVarsel === true dersom den valgte sykmeldingen ikke er den eldste', () => {
            state.dineSykmeldinger.data = sykmeldinger;
            state.arbeidsgiversSykmeldinger.data = sykmeldinger;
            ownProps.params.sykmeldingId = '3';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(NySykmelding)
                .prop('visEldreSykmeldingVarsel'))
                .to
                .equal(true);
        });

        it('Skal returnere visEldreSykmeldingVarsel === false dersom den valgte sykmeldingen er den eldste', () => {
            state.dineSykmeldinger.data = sykmeldinger;
            state.arbeidsgiversSykmeldinger.data = sykmeldinger;
            ownProps.params.sykmeldingId = '2';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(NySykmelding)
                .prop('visEldreSykmeldingVarsel'))
                .to
                .equal(false);
        });

        it('Skal returnere eldsteSykmeldingId', () => {
            state.dineSykmeldinger.data = sykmeldinger;
            state.arbeidsgiversSykmeldinger.data = sykmeldinger;
            ownProps.params.sykmeldingId = '4';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(NySykmelding)
                .prop('eldsteSykmeldingId'))
                .to
                .equal('2');
        });

        it('Skal returnere false dersom den valgte sykmeldingen har samme periode som den eldste sykmeldingen', () => {
            state.dineSykmeldinger.data = [
                getSykmelding({
                    id: '1',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-02-01'),
                            tom: new Date('2016-02-06'),
                            grad: 100,
                        }],
                    },
                }),
                getSykmelding({
                    id: '2',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-02-01'),
                            tom: new Date('2016-02-06'),
                            grad: 100,
                        }],
                    },
                }),
                getSykmelding({
                    id: '3',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-12-01'),
                            tom: new Date('2016-12-06'),
                            grad: 100,
                        }],
                    },
                }),
            ];
            ownProps.params.sykmeldingId = '2';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(NySykmelding)
                .prop('visEldreSykmeldingVarsel'))
                .to
                .equal(false);
        });

        it('Skal returnere true dersom den valgte sykmeldingen er ikke er eldst, men har samme varighet som den eldste sykmeldingen', () => {
            state.dineSykmeldinger.data = [
                getSykmelding({
                    id: '1',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-02-01'),
                            tom: new Date('2016-02-06'),
                            grad: 100,
                        }],
                    },
                }),
                getSykmelding({
                    id: '2',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-04-01'),
                            tom: new Date('2016-04-06'),
                            grad: 100,
                        }],
                    },
                }),
                getSykmelding({
                    id: '3',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-03-01'),
                            tom: new Date('2016-03-06'),
                            grad: 100,
                        }],
                    },
                }),
            ];
            ownProps.params.sykmeldingId = '3';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(NySykmelding)
                .prop('visEldreSykmeldingVarsel'))
                .to
                .equal(true);
        });


        it('Skal returnere true dersom den valgte sykmeldingen er ikke er eldst, men har samme varighet som en annen sykmelding som heller ikke er eldst', () => {
            state.dineSykmeldinger.data = [
                getSykmelding({
                    id: '1',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-02-01'),
                            tom: new Date('2016-02-06'),
                            grad: 100,
                        }],
                    },
                }),
                getSykmelding({
                    id: '2',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-03-01'),
                            tom: new Date('2016-03-06'),
                            grad: 100,
                        }],
                    },
                }),
                getSykmelding({
                    id: '3',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date('2016-03-01'),
                            tom: new Date('2016-03-06'),
                            grad: 100,
                        }],
                    },
                }),
            ];
            ownProps.params.sykmeldingId = '3';
            const props = mapStateToProps(state, ownProps);
            const component = shallow(<Container {...props} {...actions} />);
            expect(component.find(NySykmelding)
                .prop('visEldreSykmeldingVarsel'))
                .to
                .equal(true);
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
