import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import informasjon from '../../js/reducers/informasjon.js';

describe('informasjon', () => {

    it('håndterer SET_INFORMASJON ', () => {
        const initiellState = {};
        const action = {
            type: 'SET_INFORMASJON',
            data: []
        };
        const nextState = informasjon(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [],
        });
    });

}); 