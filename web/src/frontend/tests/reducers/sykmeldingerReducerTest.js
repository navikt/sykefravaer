import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import sykmeldinger from '../../js/reducers/sykmeldinger.js';

describe('sykmeldinger', () => {

    it('håndterer SET_SYKMELDINGER ', () => {
        const initialState = {};
        const action = {
            type: 'SET_SYKMELDINGER',
            sykmeldinger: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }]
        };
        const nextState = sykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
            henter: false,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENTER_SYKMELDINGER", () => {
        const initialState = {};
        const action = {
            type: "HENTER_SYKMELDINGER"
        }
        const nextState = sykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENT_SYKMELDINGER_FEILET", () => {
        const initialState = {};
        const action = {
            type: "HENT_SYKMELDINGER_FEILET"
        }
        const nextState = sykmeldinger(initialState, action);
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
        const nextState = sykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: 'arbeidsgiver'
        });
    });



}); 