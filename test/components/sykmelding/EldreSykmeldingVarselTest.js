import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import getSykmelding from '../../mock/mockSykmeldinger';
import { mapStateToProps } from '../../../js/components/sykmelding/EldreSykmeldingVarsel';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Varsel om at det finnes eldre sykmelding', () => {
    let state;
    let ownProps;
    let sykmeldinger;

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
            },
            arbeidsgiversSykmeldinger: {
                data: [],
            },
        };
    });
    it('Skal returnere visEldreSykmeldingVarsel === true dersom den valgte sykmeldingen ikke er den eldste', () => {
        state.dineSykmeldinger.data = sykmeldinger;
        state.arbeidsgiversSykmeldinger.data = sykmeldinger;
        ownProps = {
            sykmelding: {
                id: '3',
            },
        };
        const props = mapStateToProps(state, ownProps);
        expect(props.visEldreSykmeldingVarsel).to.equal(true);
    });

    it('Skal returnere visEldreSykmeldingVarsel === false dersom den valgte sykmeldingen er den eldste', () => {
        state.dineSykmeldinger.data = sykmeldinger;
        state.arbeidsgiversSykmeldinger.data = sykmeldinger;
        ownProps = {
            sykmelding: {
                id: '2',
            },
        };
        const props = mapStateToProps(state, ownProps);
        expect(props.visEldreSykmeldingVarsel).to.equal(false);
    });

    it('Skal returnere eldsteSykmeldingId', () => {
        state.dineSykmeldinger.data = sykmeldinger;
        state.arbeidsgiversSykmeldinger.data = sykmeldinger;
        const props = mapStateToProps(state, ownProps);
        expect(props.eldsteSykmeldingId).to.equal('2');
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
        ownProps = {
            sykmelding: {
                id: '2',
            },
        };
        const props = mapStateToProps(state, ownProps);
        expect(props.visEldreSykmeldingVarsel).to.equal(false);
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
        ownProps = {
            sykmelding: {
                id: '3',
            },
        };
        const props = mapStateToProps(state, ownProps);
        expect(props.visEldreSykmeldingVarsel).to.equal(true);
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
        ownProps = {
            sykmelding: {
                id: '3',
            },
        };
        const props = mapStateToProps(state, ownProps);
        expect(props.visEldreSykmeldingVarsel).to.equal(true);
    });
});
