import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';
import { oppfolgingsdialogerAt as oppfolgingsdialoger, actiontyper } from 'oppfolgingsdialog-npm'

describe('oppfolgingsdialogerReducer', () => {

    it("Håndterer HENT_OPPFOLGINGSDIALOGER_AT_FEILET", () => {
        const initialState = deepFreeze({
            henter: false,
            hentingFeilet: false,
            data: [],
        });
        const action = {
            type: actiontyper.HENT_OPPFOLGINGSDIALOGER_AT_FEILET
        };
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            data:[],
            henter: false,
            hentingFeilet: true,
        });
    });
}); 