import { setLedetekster } from '@navikt/digisyfo-npm';
import { finnLedetekstForPeriodeinfo, lagPeriodetekst, periodeinfoNokkelBase } from './AvvistSykmeldingTeaser';
import expect from '../../../test/expect';
import {
    AKTIVITET_IKKE_MULIG, AVVENTENDE, BEHANDLINGSDAGER, GRADERT, REISETILSKUDD,
} from '../enums/sykmeldingskjemaenums';

describe('Avvist sykmelding teaser', () => {
    describe('ledetekstbase', () => {
        it('skal finne riktig base for aktivitet ikke mulig', () => {
            const actualNokkelBase = periodeinfoNokkelBase(AKTIVITET_IKKE_MULIG, 0);

            expect(actualNokkelBase)
                .to
                .equal('sykmelding.teaser.tekst');
        });

        it('skal finne riktig base for gradert', () => {
            const actualNokkelBase = periodeinfoNokkelBase(GRADERT, 0);

            expect(actualNokkelBase)
                .to
                .equal('sykmelding.teaser.tekst');
        });

        it('skal finne riktig base for en behandlingsdag', () => {
            const actualNokkelBase = periodeinfoNokkelBase(BEHANDLINGSDAGER, 1);

            expect(actualNokkelBase)
                .to
                .equal('sykmelding.teaser.tekst.behandlingsdag');
        });

        it('skal finne riktig base for flere behandlingsdager', () => {
            const actualNokkelBase = periodeinfoNokkelBase(BEHANDLINGSDAGER, 2);

            expect(actualNokkelBase)
                .to
                .equal('sykmelding.teaser.tekst.behandlingsdager');
        });

        it('skal finne riktig base for reisetilskudd', () => {
            const actualNokkelBase = periodeinfoNokkelBase(REISETILSKUDD, 0);

            expect(actualNokkelBase)
                .to
                .equal('sykmelding.teaser.tekst.reisetilskudd');
        });

        it('skal finne riktig base for avventende', () => {
            const actualNokkelBase = periodeinfoNokkelBase(AVVENTENDE, 0);

            expect(actualNokkelBase)
                .to
                .equal('sykmelding.teaser.tekst.avventende');
        });
    });

    describe('ledetekst for periode', () => {
        it('skal finne riktig ledetekst for periode med aktivitet ikke mulig', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 0,
                innspillTilArbeidsgiver: null,
                type: AKTIVITET_IKKE_MULIG,
            };

            const actualLedetekst = finnLedetekstForPeriodeinfo(periode);

            expect(actualLedetekst)
                .to
                .equal('sykmelding.teaser.tekst.uten-arbeidsgiver');
        });

        it('skal finne riktig ledetekst for periode med gradering', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: {
                    grad: 50,
                    reisetilskudd: false,
                },
                behandlingsdager: 0,
                innspillTilArbeidsgiver: null,
                type: GRADERT,
            };

            const actualLedetekst = finnLedetekstForPeriodeinfo(periode);

            expect(actualLedetekst)
                .to
                .equal('sykmelding.teaser.tekst.uten-arbeidsgiver');
        });

        it('skal finne riktig ledetekst for periode med en behandlingsdag', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: BEHANDLINGSDAGER,
            };

            const actualLedetekst = finnLedetekstForPeriodeinfo(periode);

            expect(actualLedetekst)
                .to
                .equal('sykmelding.teaser.tekst.behandlingsdag.uten-arbeidsgiver.ingen-grad');
        });

        it('skal finne riktig ledetekst for periode med flere behandlingsdager', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 4,
                innspillTilArbeidsgiver: null,
                type: BEHANDLINGSDAGER,
            };

            const actualLedetekst = finnLedetekstForPeriodeinfo(periode);

            expect(actualLedetekst)
                .to
                .equal('sykmelding.teaser.tekst.behandlingsdager.uten-arbeidsgiver.ingen-grad');
        });

        it('skal finne riktig ledetekst for periode som er avventende', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 0,
                innspillTilArbeidsgiver: 'Innspill',
                type: AVVENTENDE,
            };

            const actualLedetekst = finnLedetekstForPeriodeinfo(periode);

            expect(actualLedetekst)
                .to
                .equal('sykmelding.teaser.tekst.avventende.uten-arbeidsgiver.ingen-grad');
        });
    });

    describe('periodetekst', () => {
        beforeEach(() => {
            setLedetekster({
                'sykmelding.teaser.tekst.avventende.uten-arbeidsgiver.ingen-grad': 'avventende %DAGER%',
                'sykmelding.teaser.tekst.behandlingsdager.uten-arbeidsgiver.ingen-grad': 'behandlingsdager %BEHANDLINGSDAGER% %DAGER%',
                'sykmelding.teaser.tekst.behandlingsdag.uten-arbeidsgiver.ingen-grad': 'behandlingsdag %BEHANDLINGSDAGER% %DAGER%',
                'sykmelding.teaser.tekst.uten-arbeidsgiver': '%GRAD% % i %DAGER% dager',
                'sykmelding.teaser.tekst.reisetilskudd.uten-arbeidsgiver.ingen-grad': 'reisetilskudd %DAGER%',
            });
        });

        it('skal legge ved riktig informasjon i tekst for aktivitet ikke mulig', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 0,
                innspillTilArbeidsgiver: null,
                type: AKTIVITET_IKKE_MULIG,
            };

            expect(lagPeriodetekst(periode))
                .to
                .equal('100 % i 5 dager');
        });

        it('skal legge ved riktig informasjon i tekst for gradert sykmelding', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: {
                    grad: 50,
                    reisetilskudd: false,
                },
                behandlingsdager: 0,
                innspillTilArbeidsgiver: null,
                type: GRADERT,
            };

            expect(lagPeriodetekst(periode))
                .to
                .equal('50 % i 5 dager');
        });

        it('skal legge ved riktig informasjon i tekst for en behandlingsdag', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 1,
                innspillTilArbeidsgiver: null,
                type: BEHANDLINGSDAGER,
            };

            expect(lagPeriodetekst(periode))
                .to
                .equal('behandlingsdag 1 5');
        });

        it('skal legge ved riktig informasjon i tekst for flere behandlingsdager', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 4,
                innspillTilArbeidsgiver: null,
                type: BEHANDLINGSDAGER,
            };

            expect(lagPeriodetekst(periode))
                .to
                .equal('behandlingsdager 4 5');
        });

        it('skal legge ved riktig informasjon i tekst for reisetilskudd', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 0,
                innspillTilArbeidsgiver: null,
                type: REISETILSKUDD,
            };

            expect(lagPeriodetekst(periode))
                .to
                .equal('reisetilskudd 5');
        });

        it('skal legge ved riktig informasjon i tekst for avventende', () => {
            const periode = {
                fom: new Date('2019-01-01'),
                tom: new Date('2019-01-05'),
                gradert: null,
                behandlingsdager: 0,
                innspillTilArbeidsgiver: 'inspill',
                type: AVVENTENDE,
            };

            expect(lagPeriodetekst(periode))
                .to
                .equal('avventende 5');
        });
    });
});
