import { expect } from 'chai';
import { tidligsteFom, senesteTom, periodeOverlapperMedPeriode } from '../../../js/digisyfoNpm/utils/periodeUtils';

describe('tidligsteFom og senesteTom', () => {
    it('Regner ut tidligsteFom og senesteTom', () => {
        const perioder = [
            {
                fom: '2017-05-10',
                tom: '2017-05-15',
            }, {
                fom: '2017-05-01',
                tom: '2017-05-09',
            }, {
                fom: '2017-04-10',
                tom: '2017-04-30',
            }, {
                fom: '2017-05-16',
                tom: '2017-05-20',
            }, {
                fom: '2017-05-21',
                tom: '2017-05-22',
            }, {},
        ];

        const fom = tidligsteFom(perioder);
        const tom = senesteTom(perioder);

        expect(fom).to.equal('2017-04-10');
        expect(tom).to.equal('2017-05-22');
    });

    it('Regner ut tidligsteFom og senesteTom når de er dato-objekter', () => {
        const perioder = [
            {
                fom: new Date('2017-05-10'),
                tom: new Date('2017-05-15'),
            }, {
                fom: new Date('2017-05-01'),
                tom: new Date('2017-05-09'),
            }, {
                fom: new Date('2017-04-10'),
                tom: new Date('2017-04-30'),
            }, {
                fom: new Date('2017-05-16'),
                tom: new Date('2017-05-20'),
            }, {
                fom: new Date('2017-05-21'),
                tom: new Date('2017-05-22'),
            }, {},
        ];

        const fom = tidligsteFom(perioder);
        const tom = senesteTom(perioder);

        expect(fom).to.deep.equal(new Date('2017-04-10'));
        expect(tom).to.deep.equal(new Date('2017-05-22'));
    });
});

describe('periodeOverlapperMedPeriode', () => {
    let periodeA;
    let periodeB;
    let periodeD;

    beforeEach(() => {
        periodeA = {
            fom: '12.12.2012',
            tom: '15.12.2012',
        };
        periodeB = {
            fom: '16.12.2012',
            tom: '20.12.2012',
        };
        periodeD = {
            fom: '13.12.2012',
            tom: '23.12.2012',
        };
    });

    it('Returnerer true hvis periodene overlapper fullstendig', () => {
        expect(periodeOverlapperMedPeriode(periodeA, periodeA)).to.equal(true);
    });

    it('Returnerer false hvis periodene ikke overlapper i det hele tatt', () => {
        expect(periodeOverlapperMedPeriode(periodeA, periodeB)).to.equal(false);
    });

    it('Returnerer true hvis periodene overlapper delvis', () => {
        expect(periodeOverlapperMedPeriode(periodeA, periodeD)).to.equal(true);
    });

    it('Returnerer true hvis periodeA er innenfor periodeB', () => {
        expect(periodeOverlapperMedPeriode(periodeB, periodeD)).to.equal(true);
    });

    it('Returnerer true hvis periodeB er innenfor periodeA', () => {
        expect(periodeOverlapperMedPeriode(periodeD, periodeB)).to.equal(true);
    });
});
