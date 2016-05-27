import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import milepaeler from '../../js/reducers/milepaeler.js';

describe('milepaeler', () => {

    it('håndterer SET_MILEPAELER ', () => {
        const initiellState = {};
        const action = {
            type: 'SET_MILEPAELER',
            data: []
        };
        const nextState = milepaeler(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [],
        });
    });

}); 