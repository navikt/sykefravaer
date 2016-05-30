import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import arbeidsgiversSykmeldinger from '../../js/reducers/arbeidsgiversSykmeldinger.js';

describe('arbeidsgiversSykmeldinger', () => {

    it('håndterer SET_ARBEIDSGIVERS_SYKMELDINGER', () => {
        const initialState = {};
        const action = {
            type: 'SET_ARBEIDSGIVERS_SYKMELDINGER',
            sykmeldinger: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
        };
        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
            henter: false,
            hentingFeilet: false
        });
    });

    it("Håndterer HENTER_ARBEIDSGIVERS_SYKMELDINGER", () => {
        const initialState = {};
        const action = {
            type: "HENTER_ARBEIDSGIVERS_SYKMELDINGER"
        }
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET", () => {
        const initialState = {};
        const action = {
            type: "HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET"
        }
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: true,
        });
    });

}); 