import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { getOppfolgingstilfelleStartdato } from '../../js/utils/sykeforloepUtils';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('sykeforloepUtils', () => {
    it('Skal returnere oppfolgingsdato fra riktig sykeforløp dersom identdato er før oppfolgingsdato', () => {
        const sykeforloep = [{
            sykmeldinger: [{
                id: '1',
                identdato: new Date('2018-02-12'),
            }, {
                id: '2',
                identdato: new Date('2018-02-05'),
            }],
            oppfoelgingsdato: new Date('2018-03-06'),
        }, {
            sykmeldinger: [{
                id: '3',
                identdato: new Date('2018-02-12'),
            }, {
                id: '4',
                identdato: new Date('2018-02-05'),
            }],
            oppfoelgingsdato: new Date('2018-03-18'),
        }];
        expect(getOppfolgingstilfelleStartdato(sykeforloep, '3').getTime()).to.deep.equal(new Date('2018-02-12').getTime());
    });

    it('Skal returnere oppfolgingsdato fra riktig sykeforløp dersom identdato er etter oppfolgingsdato', () => {
        const sykeforloep = [{
            sykmeldinger: [{
                id: '1',
                identdato: new Date('2018-02-12'),
            }, {
                id: '2',
                identdato: new Date('2018-02-05'),
            }],
            oppfoelgingsdato: new Date('2018-01-06'),
        }, {
            sykmeldinger: [{
                id: '3',
                identdato: new Date('2018-02-12'),
            }, {
                id: '4',
                identdato: new Date('2018-02-05'),
            }],
            oppfoelgingsdato: new Date('2018-03-18'),
        }];
        expect(getOppfolgingstilfelleStartdato(sykeforloep, '2').getTime()).to.deep.equal(new Date('2018-01-06').getTime());
    });
});
