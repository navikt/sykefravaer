import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import dineSykmeldinger from '../../js/reducers/dineSykmeldinger.js';

describe('dineSykmeldinger', () => {

    it('håndterer SET_DINE_SYKMELDINGER', () => {
        const initialState = {};
        const action = {
            type: 'SET_DINE_SYKMELDINGER',
            sykmeldinger: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
            henter: false,
            hentingFeilet: false
        });
    });

    it("Håndterer HENTER_DINE_SYKMELDINGER", () => {
        const initialState = {};
        const action = {
            type: "HENTER_DINE_SYKMELDINGER"
        }
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENT_DINE_SYKMELDINGER_FEILET", () => {
        const initialState = {};
        const action = {
            type: "HENT_DINE_SYKMELDINGER_FEILET"
        }
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: true,
        });
    });

    it("håndterer SET_SORTERING ", () => {
        const initialState = {};
        const action = {
            type: 'SET_SORTERING',
            sortering: 'arbeidsgiver'
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: 'arbeidsgiver'
        });
    });



}); 