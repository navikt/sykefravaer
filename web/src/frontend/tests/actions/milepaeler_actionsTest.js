import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/milepaeler_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("milepaeler_actions", () => {

    it("Skal ha en setMilepaeler()-funksjon som returnerer riktig action", () => {
        var action = actions.setMilepaeler([]); 

        expect(action.type).to.equal("SET_MILEPAELER");
        expect(action.data).to.deep.equal([]);
    });

});