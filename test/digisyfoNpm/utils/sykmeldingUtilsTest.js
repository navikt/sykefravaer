import { expect } from 'chai';
import * as utils from '../../../js/digisyfoNpm/utils/sykmeldingUtils';

describe('getSykmelding', () => {
    it('Skal returnere undefined dersom den ikke finner sykmeldingen', () => {
        const res = utils.getSykmelding([], 123);
        expect(res).to.deep.equal(undefined);
    });

    it('Skal returnere sykmeldingen dersom den finner sykmeldingen', () => {
        const sykmeldinger = [{ id: 123 }, { id: 345 }, { id: 888 }];
        const res = utils.getSykmelding(sykmeldinger, 123);
        expect(res).to.deep.equal({
            id: 123,
        });
    });
});

describe('getPeriodeSpenn', () => {
    it('skal returnere antall dager mellom startdato i første periode og sluttdato i siste periode', () => {
        const perioder = [{
            fom: new Date('2015-01-01'),
            tom: new Date('2015-01-02'),
            grad: '100',
        }, {
            fom: new Date('2015-01-01'),
            tom: new Date('2015-01-03'),
            grad: '100',
        }, {
            fom: new Date('2015-01-01'),
            tom: new Date('2015-01-20'),
            grad: '100',
        }];
        const p = utils.getPeriodeSpenn(perioder);
        expect(p).to.equal(20);
    });
});

describe('getSykmeldingStartdato', () => {
    it('skal returnere startdato for første periode', () => {
        const res1 = utils.getSykmeldingStartdato({
            id: 1,
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2014-01-01'),
                    tom: new Date('2014-01-10'),
                    grad: '80',
                }, {
                    fom: new Date('2014-02-02'),
                    tom: new Date('2014-02-05'),
                    grad: '80',
                }],
            },
        });
        expect(res1).to.deep.equal(new Date('2014-01-01'));

        const res2 = utils.getSykmeldingStartdato({
            id: 1,
            mulighetForArbeid: {
                perioder: [{
                    fom: new Date('2014-01-01'),
                    tom: new Date('2014-01-10'),
                    grad: '80',
                }, {
                    fom: new Date('2012-02-02'),
                    tom: new Date('2014-02-05'),
                    grad: '80',
                }],
            },
        });
        expect(res2).to.deep.equal(new Date('2012-02-02'));
    });
});
