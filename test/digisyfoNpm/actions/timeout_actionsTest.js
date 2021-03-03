import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../../js/digisyfoNpm/actions/timeout_actions';
import * as actiontype from '../../../js/digisyfoNpm/actions/actiontyper';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('timeout_actions', () => {
    it('Should have a forlengInnloggetSesjon action that returns a proper function', () => {
        expect(actions.forlengInnloggetSesjon()).to.deep.equal({
            type: actiontype.FORLENG_INNLOGGET_SESJON,
        });
    });

    it('Should have a snartUtlogget action that returns a proper function', () => {
        expect(actions.snartUtlogget()).to.deep.equal({
            type: actiontype.SNART_UTLOGGET,
        });
    });
});
