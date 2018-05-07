import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/aktivitetskrav_actions';

import aktivitetskrav from '../../js/reducers/aktivitetskrav';

describe('aktivitetskrav', () => {
    it('Har en initiell state', () => {
        const state = aktivitetskrav();
        expect(state).to.deep.equal({
            bekrefter: false,
            bekreftFeilet: false,
        });
    });

    it('Håndterer bekrefterAktivitetskrav()', () => {
        const action = actions.bekrefterAktivitetskrav();
        const gammelState = deepFreeze({});
        const state = aktivitetskrav(gammelState, action);
        expect(state).to.deep.equal({
            bekrefter: true,
            bekreftFeilet: false,
        });
    });

    it('Håndterer bekreftAktivitetskravFeilet()', () => {
        const action = actions.bekreftAktivitetskravFeilet();
        const gammelState = deepFreeze({});
        const state = aktivitetskrav(gammelState, action);
        expect(state).to.deep.equal({
            bekrefter: false,
            bekreftFeilet: true,
        });
    });

    it('Håndterer aktivitetskravBekreftet()', () => {
        const action = actions.aktivitetskravBekreftet();
        const gammelState = deepFreeze({});
        const state = aktivitetskrav(gammelState, action);
        expect(state).to.deep.equal({
            bekrefter: false,
            bekreftFeilet: false,
        });
    });
});
