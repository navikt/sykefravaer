import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
const expect = chai.expect;

import milepaeler from '../../js/reducers/milepaeler.js';

describe('milepaeler', () => {

    it('håndterer SET_MILEPÆLER ', () => {
        const initiellState = {};
        const action = {
            type: 'SET_MILEPÆLER',
            data: []
        };
        const nextState = milepaeler(initiellState, action);

        expect(nextState).to.deep.equal({
            data: [],
        });
    });   

    it("Håndterer ÅPNE_MILEPÆLER", () => {
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
            }]
        };
        const action = {
            type: 'ÅPNE_MILEPÆLER',
            milepaelIder: [0, 2, 3]
        };
        const nextState = milepaeler(initiellState, action);

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
            }]
        });
    });  

    it("Håndterer SET_MILEPÆLDATA", () => {
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
            }]
        };
        const action = {
            type: 'SET_MILEPÆLDATA',
            milepaelId: 1,
            data: {
                ikon: "helge.jpg",
                hoyde: 55
            }
        };
        const nextState = milepaeler(initiellState, action);

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
            }]
        });
    });

}); 