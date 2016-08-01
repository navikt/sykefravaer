import {expect} from 'chai';

import sykeforloep from '../../js/reducers/sykeforloep.js';

describe('sykeforloep', () => {

    it("Håndterer HENT_SYKEFORLOEP_FEILET", () => {
        const initiellState = {};
        const action = {
            type: "HENT_SYKEFORLOEP_FEILET"
        }
        const nextState = sykeforloep(initiellState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: false, 
            hentingFeilet: true
        })
    }); 

    it("Håndterer HENTER_SYKEFORLOEP", () => {
        const initiellState = {};
        const action = {
            type: "HENTER_SYKEFORLOEP"
        }
        const nextState = sykeforloep(initiellState, action);
        expect(nextState).to.deep.equal({
            data: {},
            henter: true, 
            hentingFeilet: false,
        })
    }); 

    it("Håndterer SET_SYKEFORLOEP", () => {
        const initiellState = {};
        const action = {
            type: "SET_SYKEFORLOEP",
            data: {
                navn: "Helge",
                hendelser: []
            }
        }
        const nextState = sykeforloep(initiellState, action);
        expect(nextState).to.deep.equal({
            data: {
                navn: "Helge",
                hendelser: []
            },
            henter: false,
            hentingFeilet: false,
        })
    })

}); 
