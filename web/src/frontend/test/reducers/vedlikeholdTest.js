import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actions from '../../js/actions/vedlikehold_actions'
import vedlikehold from '../../js/reducers/vedlikehold';

describe('vedlikehold', () => {
    describe('henter', () => {

        let initialState = deepFreeze({
            data: {},
            henter: false,
            hentingFeilet: false,
        });

        it('håndterer VEDLIKEHOLD_HENTET', () => {
            const action = actions.vedlikeholdHentet(true)
            const nextState = vedlikehold(initialState, action);

            expect(nextState).to.deep.equal({
                data: { vedlikehold: true },
                henter: false,
                hentingFeilet: false,
            });
        });

        it("håndterer HENTER_VEDLIKEHOLD", () => {
            const action = actions.henterVedlikehold();
            const nextState = vedlikehold(initialState, action);
            expect(nextState).to.deep.equal({
                data: {},
                henter: true,
                hentingFeilet: false,
            });
        });

        it("håndterer HENT_VEDLIKEHOLD_FEILET", () => {

            initialState = deepFreeze({
                data: { vedlikehold: false },
                henter: false,
                hentingFeilet: false,
            });

            const action = actions.hentVedlikeholdFeilet();
            const nextState = vedlikehold(initialState, action);
            expect(nextState).to.deep.equal({
                data: { vedlikehold: false },
                henter: false,
                hentingFeilet: true,
            });
        });
    })
});
