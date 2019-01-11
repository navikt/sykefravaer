import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import svar from '../../js/reducers/svar';
import * as actions from '../../js/actions/moter_actions';

describe('svar', () => {
    it(`Håndterer ${actions.senderSvar.toString()}`, () => {
        const state = deepFreeze({});
        const action = actions.senderSvar();
        const res = svar(state, action);
        expect(res).to.deep.equal({
            sender: true,
            sendingFeilet: false,
        });
    });

    it(`Håndterer ${actions.sendSvarFeilet.toString()}`, () => {
        const state = deepFreeze({});
        const action = actions.sendSvarFeilet();
        const res = svar(state, action);
        expect(res).to.deep.equal({
            sender: false,
            sendingFeilet: true,
        });
    });

    it(`Håndterer ${actions.svarSendt.toString()}`, () => {
        const state = deepFreeze({
            sender: true,
        });
        const action = actions.svarSendt();
        const res = svar(state, action);
        expect(res.sender).to.be.equal(false);
    });
});
