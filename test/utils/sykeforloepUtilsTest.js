import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { getOppfolgingstilfelleStartdato } from '../../js/utils/sykeforloepUtils';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('sykeforloepUtils', () => {
    it('Skal returnere oppfolgingsdato fra riktig sykeforløp', () => {
        const sykeforloep = [{
            sykmeldinger: [{
                id: '1',
            }, {
                id: '2',
            }],
            oppfolgingsdato: new Date('2018-03-06'),
        }, {
            sykmeldinger: [{
                id: '3',
            }, {
                id: '4',
            }],
            oppfolgingsdato: new Date('2018-03-18'),
        }];
        expect(getOppfolgingstilfelleStartdato(sykeforloep, '3').getTime()).to.deep.equal(new Date('2018-03-18').getTime());
    });
});
