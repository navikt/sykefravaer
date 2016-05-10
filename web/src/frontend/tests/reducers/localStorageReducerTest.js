import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

window.localStorage = {
    getItem: (item) => {
        return item
    }
}

import localStorage from '../../js/reducers/localStorage.js';

describe('localStorage', () => {

    it("Håndterer SKJUL_UNDER_UTVIKLING_VARSEL", () => {
        const initiellState = {};
        const nextState = localStorage(initiellState, {
            type: "SKJUL_UNDER_UTVIKLING_VARSEL"
        });
        expect(nextState).to.deep.equal({
            skjulUnderUtviklingVarsel: true
        })
    });

}); 