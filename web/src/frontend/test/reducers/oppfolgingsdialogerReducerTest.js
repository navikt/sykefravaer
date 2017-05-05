import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import oppfolgingsdialoger from '../../js/reducers/oppfolgingsdialoger';
import * as actiontyper from '../../js/actions/actiontyper';

describe('oppfolgingsdialogerReducer', () => {

    it("Håndterer HENT_OPPFOLGINGSDIALOGER_FEILET", () => {
        const initialState = deepFreeze({});
        const action = {
            type: actiontyper.HENT_OPPFOLGINGSDIALOGER_FEILET
        };
        const nextState = oppfolgingsdialoger(initialState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: false,
            hentingFeilet: true,
        });
    });
}); 