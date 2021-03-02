import { expect } from 'chai';
import {
    toDatePrettyPrint,
    getDuration,
    toDate,
    fraInputdatoTilJSDato,
    erGyldigDatoformat,
    langtDatoFormat,
    tilLesbarDatoUtenAarstall,
    tilLesbarDatoMedArstall,
    tilLesbarPeriodeMedArstall,
    tilLesbarPeriodeUtenArstall,
} from '../../../js/digisyfoNpm/utils/datoUtils';

describe('datoUtils', () => {
    describe('toDatePrettyPrint', () => {
        it('Skal formatere dato', () => {
            expect(toDatePrettyPrint(new Date('2014-02-28'))).to.equal('28.02.2014');
        });

        it('Skal ta hensyn til tidssoner', () => {
            expect(toDatePrettyPrint(new Date('2016-05-10'))).to.equal('10.05.2016');
        });

        it('Skal ta hensyn til skuddår', () => {
            expect(toDatePrettyPrint(new Date('1984-02-29'))).to.equal('29.02.1984');
        });

        it('Kan formattere dato på ISO-format', () => {
            expect(toDatePrettyPrint('2017-02-02')).to.equal('02.02.2017');
        });

        it('Kan formattere dato på ISO-format når argument er JS-dato', () => {
            expect(toDatePrettyPrint(new Date('2017-02-02'))).to.equal('02.02.2017');
        });
    });

    describe('getDuration', () => {
        it('Skal regne ut varighet', () => {
            expect(getDuration(new Date('2014-02-27'), new Date('2014-03-08'))).to.equal(10);
            expect(getDuration(new Date('2014-06-30'), new Date('2014-07-05'))).to.equal(6);
        });

        it('Kan regne ut varighet på ISO-format', () => {
            expect(getDuration('2014-02-27', '2014-03-08')).to.equal(10);
            expect(getDuration('2014-06-30', '2014-07-05')).to.equal(6);
        });
    });

    describe('toDate', () => {
        it('Skal skal returnere JS-dato når sender inn en streng', () => {
            expect(toDate('2014-02-28')).to.deep.equal(new Date('2014-02-28'));
        });

        it('Skal skal returnere JS-dato når sender inn en JS-dato', () => {
            expect(toDate(new Date('2014-02-28'))).to.deep.equal(new Date('2014-02-28'));
        });

        it('Skal returnere null hvis vi sender inn null', () => {
            expect(toDate(null)).to.equal(null);
        });
    });

    describe('fraInputdatoTilJSDato', () => {
        it('Skal håndtere dd.mm.åååå', () => {
            const dato = '12.02.2017';
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date('2017-02-12').getTime());
        });

        it('Skal håndtere dd.mm.åå', () => {
            const dato = '12.02.17';
            const res = fraInputdatoTilJSDato(dato);
            expect(res.getTime()).to.equal(new Date('2017-02-12').getTime());
        });
    });

    describe('erGyldigDatoformat', () => {
        it('Skal returnere true ved 12.02.2017', () => {
            const d = erGyldigDatoformat('12.02.2017');
            expect(d).to.equal(true);
        });

        it('Skal returnere false ved dd.mm.yy', () => {
            const d = erGyldigDatoformat('02.01.17');
            expect(d).to.equal(false);
        });

        it('Skal returnere false ved aa.bb.cccc', () => {
            const d = erGyldigDatoformat('aa.bb.cccc');
            expect(d).to.equal(false);
        });

        it('Skal returnere false ved 02.02.____', () => {
            const d = erGyldigDatoformat('02.02.____');
            expect(d).to.equal(false);
        });

        it('Skal returnere false ved 02.0a.1234', () => {
            const d = erGyldigDatoformat('02.02.____');
            expect(d).to.equal(false);
        });

        it('Skal returnere true ved 42.01.2020', () => {
            const d = erGyldigDatoformat('42.01.2020');
            expect(d).to.equal(true);
        });
    });

    describe('langtDatoFormat', () => {
        it('Skal returnere 25. september 2017', () => {
            const d = langtDatoFormat(new Date('2017-09-25'));
            expect(d).to.equal('25. september 2017');
        });
        it('Takler å få tekst-dato inn', () => {
            const d = langtDatoFormat('2017-09-25');
            expect(d).to.equal('25. september 2017');
        });
    });

    describe('tilLesbarDatoMedArstall', () => {
        it('Skal returnere tall for dag, uten null foran, når datoen er mellom 1 og 9', () => {
            const dato = new Date('2018-01-02');
            expect(tilLesbarDatoMedArstall(dato)).to.equal('2. januar 2018');

            const dato2 = new Date('2017-03-09');
            expect(tilLesbarDatoMedArstall(dato2)).to.equal('9. mars 2017');
        });
    });

    describe('tilLesbarDatoUtenArstall', () => {
        it('Skal returnere tall for dag, uten null foran, når datoen er mellom 1 og 9', () => {
            const dato = new Date('2018-01-02');
            expect(tilLesbarDatoUtenAarstall(dato)).to.equal('2. januar');

            const dato2 = new Date('2017-03-09');
            expect(tilLesbarDatoUtenAarstall(dato2)).to.equal('9. mars');
        });
    });

    describe('tilLesbarPeriodeMedArstall', () => {
        it('Skal returnere to datoer og ett årstall når datoene er i to forskjellige måneder', () => {
            const fom = new Date('2018-01-01');
            const tom = new Date('2018-02-14');
            expect(tilLesbarPeriodeMedArstall(fom, tom)).to.equal('1. januar – 14. februar 2018');
        });

        it('Skal returnere to datoer, én måned og ett årstall når datoene er i samme måned', () => {
            const fom = new Date('2018-01-01');
            const tom = new Date('2018-01-14');
            expect(tilLesbarPeriodeMedArstall(fom, tom)).to.equal('1. – 14. januar 2018');
        });

        it('Skal returnere to årstall når datoene er i to forskjellige år', () => {
            const fom = new Date('2016-01-01');
            const tom = new Date('2018-02-14');
            expect(tilLesbarPeriodeMedArstall(fom, tom)).to.equal('1. januar 2016 – 14. februar 2018');
        });
    });

    describe('tilLesbarPeriodeUtenArstall', () => {
        it('Skal returnere to datoer når datoene er i to forskjellige måneder', () => {
            const fom = new Date('2018-01-01');
            const tom = new Date('2018-02-14');
            expect(tilLesbarPeriodeUtenArstall(fom, tom)).to.equal('1. januar – 14. februar');
        });

        it('Skal returnere to datoer, én måned og ett årstall når datoene er i samme måned', () => {
            const fom = new Date('2018-01-01');
            const tom = new Date('2018-01-14');
            expect(tilLesbarPeriodeUtenArstall(fom, tom)).to.equal('1. – 14. januar');
        });

        it('Skal returnere to datoer når datoene er i to forskjellige år', () => {
            const fom = new Date('2016-01-01');
            const tom = new Date('2018-02-14');
            expect(tilLesbarPeriodeUtenArstall(fom, tom)).to.equal('1. januar – 14. februar');
        });
    });
});
