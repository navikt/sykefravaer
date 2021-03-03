import { expect } from 'chai';
import { finnNyesteSykeforloepHosBedrift } from '../../../js/digisyfoNpm/utils/sykeforloepUtils';


describe('sykeforloepUtils', () => {
    describe('finnNyesteSykeforloepHosBedrift', () => {
        it('Setter sammen til et sykeforloep', () => {
            const sykmeldinger = [
                {
                    identdato: new Date(2017, 12, 31),
                    orgnummer: 'virksomhetsnummer',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date(2018, 1, 1),
                            tom: new Date(2018, 2, 1),
                            grad: 100,
                        }],
                    },
                },
            ];
            expect(finnNyesteSykeforloepHosBedrift(sykmeldinger, 'virksomhetsnummer')).to.deep.equal({
                senesteTom: {
                    dato: new Date(2018, 2, 1),
                    grad: 100,
                },
                tidligsteFom: {
                    dato: new Date(2018, 1, 1),
                    grad: 100,
                    identdato: new Date(2017, 12, 31),
                },
            });
        });

        it('Bruker bare sykmeldinger med oppgitt virksomhetsnummer', () => {
            const sykmeldinger = [
                {
                    identdato: new Date(2017, 12, 31),
                    orgnummer: 'virksomhetsnummer',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date(2018, 1, 1),
                            tom: new Date(2018, 2, 1),
                            grad: 100,
                        }],
                    },
                },
                {
                    identdato: new Date(2017, 12, 1),
                    orgnummer: 'virksomhetsnummer2',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date(2017, 12, 1),
                            tom: new Date(2017, 12, 31),
                            grad: 100,
                        }],
                    },
                },
            ];
            expect(finnNyesteSykeforloepHosBedrift(sykmeldinger, 'virksomhetsnummer')).to.deep.equal({
                senesteTom: {
                    dato: new Date(2018, 2, 1),
                    grad: 100,
                },
                tidligsteFom: {
                    dato: new Date(2018, 1, 1),
                    grad: 100,
                    identdato: new Date(2017, 12, 31),
                },
            });
        });

        it('Setter sammen flere sykmeldinger når antall dager mellom er 16 eller mindre', () => {
            const sykmeldinger = [
                {
                    identdato: new Date(2017, 12, 31),
                    orgnummer: 'virksomhetsnummer',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date(2018, 1, 1),
                            tom: new Date(2018, 2, 1),
                            grad: 100,
                        }],
                    },
                },
                {
                    identdato: new Date(2017, 12, 1),
                    orgnummer: 'virksomhetsnummer',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date(2017, 12, 1),
                            tom: new Date(2017, 12, 16),
                            grad: 100,
                        }],
                    },
                },
            ];
            expect(finnNyesteSykeforloepHosBedrift(sykmeldinger, 'virksomhetsnummer')).to.deep.equal({
                senesteTom: {
                    dato: new Date(2018, 2, 1),
                    grad: 100,
                },
                tidligsteFom: {
                    dato: new Date(2017, 12, 1),
                    grad: 100,
                    identdato: new Date(2017, 12, 1),
                },
            });
        });

        it('Setter IKKE sammen flere sykmeldinger når antall dager mellom er større enn 16', () => {
            const sykmeldinger = [
                {
                    identdato: new Date(2017, 12, 31),
                    orgnummer: 'virksomhetsnummer',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date(2018, 1, 1),
                            tom: new Date(2018, 2, 1),
                            grad: 100,
                        }],
                    },
                },
                {
                    identdato: new Date(2017, 12, 1),
                    orgnummer: 'virksomhetsnummer',
                    mulighetForArbeid: {
                        perioder: [{
                            fom: new Date(2017, 12, 1),
                            tom: new Date(2017, 12, 15),
                            grad: 100,
                        }],
                    },
                },
            ];
            expect(finnNyesteSykeforloepHosBedrift(sykmeldinger, 'virksomhetsnummer')).to.deep.equal({
                senesteTom: {
                    dato: new Date(2018, 2, 1),
                    grad: 100,
                },
                tidligsteFom: {
                    dato: new Date(2018, 1, 1),
                    grad: 100,
                    identdato: new Date(2017, 12, 31),
                },
            });
        });
    });
});
