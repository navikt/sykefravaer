import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../../js/digisyfoNpm/actions/hendelser_actions';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('hendelser_actions', () => {
    it('Skal ha en setHendelser()-funksjon som returnerer riktig action', () => {
        const action = actions.setHendelser([]);

        expect(action.type).to.equal('SET_HENDELSER');
        expect(action.data).to.deep.equal([]);
    });

    it('Skal ha en apneHendelser()-funksjon som returnerer riktig action', () => {
        const action = actions.apneHendelser([1, 2, 3]);

        expect(action.type).to.equal('ÅPNE_HENDELSER');
        expect(action.hendelseIder).to.deep.equal([1, 2, 3]);
    });

    it('Skal ha en setHendelseData()-funksjon som returnerer riktig action', () => {
        const action = actions.setHendelseData(8, {
            ikon: 'Olsen.jpg',
            hoyde: 5,
        });

        expect(action.type).to.equal('SET_HENDELSEDATA');
        expect(action.data).to.deep.equal({
            ikon: 'Olsen.jpg',
            hoyde: 5,
        });
    });
});
