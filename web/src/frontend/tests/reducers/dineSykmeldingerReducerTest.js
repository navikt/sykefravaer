import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import dineSykmeldinger from '../../js/reducers/dineSykmeldinger.js';

describe.only('dineSykmeldinger', () => {

    it('håndterer SET_DINE_SYKMELDINGER når man ikke har sykmeldinger fra før', () => {
        const initialState = {
            data: []
        };
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

    it('håndterer SET_DINE_SYKMELDINGER når man har sykmeldinger fra før, ved å kun overskrive properties som finnes', () => {
        const initialState = {
            data: [{
                id: 44, 
                fornavn: "Harald",
                etternavn: "R.",
                nettoppBekreftet: true
            }, {
                id: 55,
                fornavn: "Sonja",
                etternavn: "Haraldsen"
            }]
        };
        const action = {
            type: 'SET_DINE_SYKMELDINGER',
            sykmeldinger: [{
                id: 44,
                fornavn: "Harald",
                etternavn: "R",
                diagnose: "Forkjølet"
            }, {
                id: 55,
                fornavn: "Sonja",
                etternavn: "Haraldsen"
            }],
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 44,
                fornavn: "Harald",
                etternavn: "R",
                diagnose: "Forkjølet",
                nettoppBekreftet: true
            }, {
                id: 55, 
                fornavn: "Sonja",
                etternavn: "Haraldsen"
            }],
            henter: false,
            hentingFeilet: false
        });
    });

    it("Håndterer HENTER_DINE_SYKMELDINGER når man ikke har data fra før", () => {
        const initialState = {
            data: []
        };
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

    it("Håndterer HENTER_DINE_SYKMELDINGER når man har data fra før", () => {
        const initialState = {
            data: [{
                id: 77, 
            }, {
                id: 6789
            }]
        };
        const action = {
            type: "HENTER_DINE_SYKMELDINGER"
        }
        const nextState = dineSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [{
                id: 77, 
            }, {
                id: 6789
            }],
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

    it('håndterer SET_ARBEIDSSITUASJON', () => {
        const initialState = {
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        };
        const action = {
            type: 'SET_ARBEIDSSITUASJON',
            arbeidssituasjon: 'test',
            sykmeldingId: 23,
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                arbeidssituasjon: 'test'
            }, {
                id: 24,
            }]
        });
    });

    it("Håndterer SYKMELDING_BEKREFTET", () => {
        const initialState = {
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        };
        const action = {
            type: 'SYKMELDING_BEKREFTET',
            sykmeldingId: 23,
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                status: 'BEKREFTET',
                nettoppBekreftet: true,
            }, {
                id: 24,
            }]
        });        
    });

    it("Håndterer NAVIGER_FRA_BEKREFTETKVITTERING", () => {
       const initialState = {
           data: [{
               id: 23,
               status: "BEKREFTET",
               nettoppBekreftet: true
           }, {
               id: 24,
           }]
       };
       const action = {
           type: 'NAVIGER_FRA_BEKREFTETKVITTERING',
           sykmeldingId: 23,
       };
       const nextState = dineSykmeldinger(initialState, action);

       expect(nextState).to.deep.equal({
           data: [{
               id: 23,
               status: 'BEKREFTET',
               nettoppBekreftet: false,
           }, {
               id: 24,
           }]
       });  
    })

}); 