import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/milepaeler_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("milepaeler_actions", () => {

    it("Skal ha en setMilepaeler()-funksjon som returnerer riktig action", () => {
        var action = actions.setMilepaeler([]); 

        expect(action.type).to.equal("SET_MILEPÆLER");
        expect(action.data).to.deep.equal([]);
    });


    it("Skal ha en apneMilepaeler()-funksjon som returnerer riktig action", () => {
        var action = actions.apneMilepaeler([1, 2, 3]); 

        expect(action.type).to.equal("ÅPNE_MILEPÆLER");
        expect(action.milepaelIder).to.deep.equal([1, 2, 3]);

    });      

    it("Skal ha en setMilepaeldata()-funksjon som returnerer riktig action", () => {
        var action = actions.setMilepaeldata(8, {
            ikon: "Olsen.jpg",
            hoyde: 5
        }); 

        expect(action.type).to.equal("SET_MILEPÆLDATA");
        expect(action.data).to.deep.equal({
            ikon: "Olsen.jpg",
            hoyde: 5
        });

    });     

});