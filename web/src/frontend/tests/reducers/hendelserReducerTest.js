import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import hendelser from '../../js/reducers/hendelser.js';

describe('hendelser', () => {

    it('håndterer SET_HENDELSER ', () => {
        const initiellState = {};
        const action = {
            type: 'SET_HENDELSER',
            data: []
        };
        const nextState = hendelser(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [],
            henter: false, 
            hentingFeilet: false
        });
    });   

    it("Håndterer ÅPNE_HENDELSER", () => {
        const initiellState = {
            data: [{
                id: 0,
                erApen: false
            }, {
                id: 1,
                erApen: false
            }, {
                id: 2,
                erApen: false
            }, {
                id: 3,
                erApen: false
            }, {
                id: 4,
                erApen: false
            }],
            henter: false,
            hentingFeilet: false
        };
        const action = {
            type: 'ÅPNE_HENDELSER',
            hendelseIder: [0, 2, 3]
        };
        const nextState = hendelser(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 0,
                erApen: true,
                hoyde: "auto",
                visBudskap: true
            }, {
                id: 1,
                erApen: false,
            }, {
                id: 2,
                erApen: true,
                hoyde: "auto",
                visBudskap: true
            }, {
                id: 3,
                erApen: true,
                hoyde: "auto",
                visBudskap: true
            }, {
                id: 4,
                erApen: false,
            }],
            henter: false,
            hentingFeilet: false,
        });
    });  

    it("Håndterer SET_HENDELSEDATA", () => {
        const initiellState = {
            data: [{
                id: 0,
                erApen: true
            }, {
                id: 1,
                erApen: true
            }, {
                id: 2,
                erApen: false
            }],
            henter: false,
            hentingFeilet: false,
        };
        const action = {
            type: 'SET_HENDELSEDATA',
            hendelseId: 1,
            data: {
                ikon: "helge.jpg",
                hoyde: 55
            }
        };
        const nextState = hendelser(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 0,
                erApen: true
            }, {
                id: 1,
                erApen: true,
                ikon: "helge.jpg",
                hoyde: 55
            }, {
                id: 2,
                erApen: false
            }],
            henter: false,
            hentingFeilet: false
        });
    });

    it("Håndterer HENTER_HENDELSER", () => {
        const initiellState = {};
        const action = {
            type: "HENTER_HENDELSER"
        }
        const nextState = hendelser(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true, 
            hentingFeilet: false
        })
    }); 

    it("Håndterer HENT_HENDELSER_FEILET", () => {
        const initiellState = {};
        const action = {
            type: "HENT_HENDELSER_FEILET"
        }
        const nextState = hendelser(initiellState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false, 
            hentingFeilet: true,
        })
    }); 
}); 