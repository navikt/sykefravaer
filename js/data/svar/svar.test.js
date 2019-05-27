import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import svar from './svar';
import { senderSvar, sendSvarFeilet, svarSendt } from './svar_actions';

describe('svar', () => {
    it(`Håndterer ${senderSvar.toString()}`, () => {
        const state = deepFreeze({});
        const action = senderSvar();
        const res = svar(state, action);
        expect(res).to.deep.equal({
            sender: true,
            sendingFeilet: false,
        });
    });

    it(`Håndterer ${sendSvarFeilet.toString()}`, () => {
        const state = deepFreeze({});
        const action = sendSvarFeilet();
        const res = svar(state, action);
        expect(res).to.deep.equal({
            sender: false,
            sendingFeilet: true,
        });
    });

    it(`Håndterer ${svarSendt.toString()}`, () => {
        const state = deepFreeze({
            sender: true,
        });
        const action = svarSendt();
        const res = svar(state, action);
        expect(res.sender).to.be.equal(false);
    });
});
