import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { Container, mapStateToProps } from '../../../js/containers/landingsside/TidslinjeutdragContainer';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('TidslinjeutdragContainer', () => {
    let sykmeldinger;
    let passertSykmelding;
    let aktivSykmelding;
    let state;
    let clock;
    let actions;
    let hentStartdato;


    beforeEach(() => {
        clock = sinon.useFakeTimers(new Date('2017-08-12').getTime());

        state = {};

        passertSykmelding = {
            status: 'SENDT',
            identdato: new Date('2017-07-15'),
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2017-08-01'),
                    tom: new Date('2017-08-05'),
                }],
            },
        };

        aktivSykmelding = {
            status: 'SENDT',
            identdato: new Date('2017-07-15'),
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2017-08-01'),
                    tom: new Date('2017-08-14'),
                }],
            },
        };

        sykmeldinger = [passertSykmelding];

        state.dineSykmeldinger = {
            data: sykmeldinger,
        };

        state.sykeforloep = {
            startdato: new Date('2017-08-02'),
        };

        hentStartdato = sinon.spy();
        actions = { hentStartdato };
    });

    afterEach(() => {
        clock.restore();
    });

    it('Skal ikke vise noe dersom bruker ikke har sykmeldinger', () => {
        state.dineSykmeldinger.data = [];
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.text()).to.equal('');
    });

    it('Skal ikke vise noe dersom siste sykmeldings tom-dato er passert med 7 dager', () => {
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.text()).to.equal('');
    });

    it('Skal ikke vise noe dersom siste sykmeldings tom-dato ikke er passert, men sykmeldingen er avbrutt', () => {
        aktivSykmelding.status = 'AVBRUTT';
        state.dineSykmeldinger.data = [passertSykmelding, aktivSykmelding];
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.text()).to.equal('');
    });

    it('Skal vise noe dersom siste sykmeldings tom-dato ikke er passert', () => {
        state.dineSykmeldinger.data = [passertSykmelding, aktivSykmelding];
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.text()).not.to.equal('');
    });

    it('Skal vise noe dersom siste sykmeldings tom-dato ikke er passert', () => {
        state.dineSykmeldinger.data = [passertSykmelding, aktivSykmelding];
        const props = mapStateToProps(state);
        const component = shallow(<Container {...props} {...actions} />);
        expect(component.text()).not.to.equal('');
    });

    it('SKal beregne antallDager 1', () => {
        const props = mapStateToProps(state);
        expect(props.antallDager).to.equal(11);
    });

    it('Skal beregne antallDager 2', () => {
        clock = sinon.useFakeTimers(new Date('2017-12-05').getTime() + 156655);
        state.sykeforloep.startdato = new Date('2017-03-07');
        const props = mapStateToProps(state);
        expect(props.antallDager).to.equal(274);
    });

    it('Skal beregne antallDager når sykefraværet startet i går', () => {
        clock = sinon.useFakeTimers(new Date('2017-12-05').getTime() + 156655);
        state.sykeforloep.startdato = new Date('2017-12-04');
        const props = mapStateToProps(state);
        expect(props.antallDager).to.equal(2);
    });

    it('Skal beregne antallDager når sykefraværet startet for 14 dager siden', () => {
        clock = sinon.useFakeTimers(new Date('2017-12-20').getTime() + 156655);
        state.sykeforloep.startdato = new Date('2017-12-06');
        const props = mapStateToProps(state);
        expect(props.antallDager).to.equal(15);
    });

    describe('Med eller uten arbeidsgiver?', () => {
        it('Skal returnere VALGFRI hvis det bare finnes nye sykmeldinger', () => {
            const sykmelding1 = {
                status: 'NY',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            const sykmelding2 = {
                status: 'NY',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            state.dineSykmeldinger.data = [sykmelding1, sykmelding2];
            const res = mapStateToProps(state);
            expect(res.visning).to.equal('VALGFRI');
        });

        it('Skal returnere MED_ARBEIDSGIVER hvis sykmeldinger i dette sykefraværstilfellet er SENDT', () => {
            const sykmelding1 = {
                status: 'SENDT',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            const sykmelding2 = {
                status: 'SENDT',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            state.dineSykmeldinger.data = [sykmelding1, sykmelding2];
            const res = mapStateToProps(state);
            expect(res.visning).to.equal('MED_ARBEIDSGIVER');
        });

        it('Skal returnere MED_ARBEIDSGIVER hvis sykmeldinger i dette sykefraværstilfellet er SENDT eller TIL_SENDING', () => {
            const sykmelding1 = {
                status: 'SENDT',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            const sykmelding2 = {
                status: 'TIL_SENDING',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            state.dineSykmeldinger.data = [sykmelding1, sykmelding2];
            const res = mapStateToProps(state);
            expect(res.visning).to.equal('MED_ARBEIDSGIVER');
        });

        it('Skal returnere MED_ARBEIDSGIVER hvis sykmeldinger i dette sykefraværstilfellet er BEKREFTET men har arbeidssituasjon ARBEIDSTAKER', () => {
            const sykmelding1 = {
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            const sykmelding2 = {
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'ARBEIDSTAKER',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            state.dineSykmeldinger.data = [sykmelding1, sykmelding2];
            const res = mapStateToProps(state);
            expect(res.visning).to.equal('MED_ARBEIDSGIVER');
        });

        it('Skal returnere UTEN_ARBEIDSGIVER hvis sykmeldinger i dette sykefraværstilfellet er BEKREFTET', () => {
            state.sykeforloep.startdato = new Date('2017-07-01');
            const sykmelding1 = {
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'NAERINGSDRIVENDE',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            const sykmelding2 = {
                status: 'BEKREFTET',
                valgtArbeidssituasjon: 'NAERINGSDRIVENDE',
                identdato: new Date('2017-08-15'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            // sykmelding for annet sykeforløp
            const sykmelding3 = {
                status: 'SENDT',
                valgtArbeidssituasjon: 'NAERINGSDRIVENDE',
                identdato: new Date('2017-06-15'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            state.dineSykmeldinger.data = [sykmelding1, sykmelding2, sykmelding3];
            const res = mapStateToProps(state);
            expect(res.visning).to.equal('UTEN_ARBEIDSGIVER');
        });

        it('Skal returnere VALGFRI hvis sykmeldinger i dette sykefraværstilfellet er både SENDT og BEKREFTET', () => {
            const sykmelding1 = {
                status: 'BEKREFTET',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };

            const sykmelding2 = {
                status: 'SENDT',
                identdato: new Date('2017-08-15'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            state.dineSykmeldinger.data = [sykmelding1, sykmelding2];
            const res = mapStateToProps(state);
            expect(res.visning).to.equal('VALGFRI');
        });

        it('Skal returnere VALGFRI hvis sykmeldinger i dette sykefraværstilfellet er både SENDT og BEKREFTET', () => {
            const sykmelding1 = {
                status: 'BEKREFTET',
                identdato: new Date('2017-08-10'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };

            const sykmelding2 = {
                status: 'SENDT',
                identdato: new Date('2017-08-15'),
                mulighetForArbeid: {
                    perioder: [{
                        fom: new Date(),
                        tom: new Date(),
                    }],
                },
            };
            state.dineSykmeldinger.data = [sykmelding1, sykmelding2];
            const res = mapStateToProps(state);
            expect(res.visning).to.equal('VALGFRI');
        });

        it('Skal returnere MED_ARBEIDSGIVER om det er NYE og SENDTE sykmeldinger', () => {
            state.sykeforloep.startdato = new Date('2017-11-26');
            state.dineSykmeldinger.data = [
                {
                    id: 'e0468caf-2a8e-4abb-84b4-09708784d6b4',
                    identdato: new Date('2017-11-26'),
                    mulighetForArbeid: {
                        aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
                        aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
                        aktivitetIkkeMulig433: [
                            'Annet',
                        ],
                        aktivitetIkkeMulig434: [
                            'Annet',
                        ],
                        perioder: [
                            {
                                avventende: null,
                                behandlingsdager: null,
                                fom: new Date('2017-11-26'),
                                grad: 100,
                                reisetilskudd: null,
                                tom: new Date('2017-12-04'),
                            },
                        ],
                    },
                    status: 'NY',
                },
                {
                    id: 'a57dfa37-b608-486e-b35a-aafac212f327',
                    identdato: new Date('2017-11-26'),
                    mulighetForArbeid: {
                        aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
                        aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
                        aktivitetIkkeMulig433: [
                            'Annet',
                        ],
                        aktivitetIkkeMulig434: [
                            'Annet',
                        ],
                        perioder: [
                            {
                                avventende: null,
                                behandlingsdager: null,
                                fom: new Date('2017-11-26'),
                                grad: 100,
                                reisetilskudd: null,
                                tom: new Date('2017-12-04'),
                            },
                        ],
                    },
                    status: 'NY',
                },
                {
                    id: 'b2e74bb5-4506-45cf-9f19-f30b0a9724ed',
                    identdato: new Date('2017-11-26'),
                    mulighetForArbeid: {
                        aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
                        aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
                        aktivitetIkkeMulig433: [
                            'Annet',
                        ],
                        aktivitetIkkeMulig434: [
                            'Annet',
                        ],
                        perioder: [
                            {
                                avventende: null,
                                behandlingsdager: null,
                                fom: new Date('2017-11-26'),
                                grad: 100,
                                reisetilskudd: null,
                                tom: new Date('2017-12-04'),
                            },
                        ],
                    },
                    status: 'NY',
                },
                {
                    id: 'a264880e-216a-4f37-ada4-9bb71d4c70f7',
                    identdato: new Date('2017-11-26'),
                    mulighetForArbeid: {
                        aarsakAktivitetIkkeMulig433: 'andre årsaker til sykefravær',
                        aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
                        aktivitetIkkeMulig433: [
                            'Annet',
                        ],
                        aktivitetIkkeMulig434: [
                            'Annet',
                        ],
                        perioder: [
                            {
                                avventende: null,
                                behandlingsdager: null,
                                fom: new Date('2017-11-26'),
                                grad: 100,
                                reisetilskudd: null,
                                tom: new Date('2017-12-04'),
                            },
                        ],
                    },
                    status: 'SENDT',
                },
            ];

            const res = mapStateToProps(state);
            expect(res.visning).to.equal('MED_ARBEIDSGIVER');
        });
    });
});
