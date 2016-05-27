import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/informasjon_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("informasjon_actions", () => {

    it("Skal ha en setInformasjon()-funksjon som returnerer riktig action", () => {
        var action = actions.setInformasjon([]); 

        expect(action.type).to.equal("SET_INFORMASJON");
        expect(action.data).to.deep.equal([]);
    });

});