import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import deepFreeze from 'deep-freeze';

import dineSykmeldinger from '../../js/reducers/dineSykmeldinger.js';

describe('dineSykmeldingerReducer', () => {

    it('håndterer SET_DINE_SYKMELDINGER når man ikke har sykmeldinger fra før', () => {
        const initialState = deepFreeze({
            data: []
        });
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
        const initialState = deepFreeze({
            data: [{
                id: 44, 
                fornavn: "Harald",
                etternavn: "R.",
            }, {
                id: 55,
                fornavn: "Sonja",
                etternavn: "Haraldsen"
            }]
        });
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
        const initialState = deepFreeze({
            data: []
        });
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
        const initialState = deepFreeze({
            data: [{
                id: 77, 
            }, {
                id: 6789
            }]
        });
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
        const initialState = deepFreeze({});
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

    it("håndterer SET_SORTERING dersom man ikke har sortering fra før", () => {
        const initialState = deepFreeze({});
        const action = {
            type: "SET_SORTERING",
            kriterium: "arbeidsgiver",
            status: "tidligere",
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "arbeidsgiver"
            }
        });
    });

    it("håndterer SET_SORTERING dersom man har sortering fra før", () => {
        const initialState = deepFreeze({
            sortering: {
                tidligere: "dato"
            }
        });
        const action = {
            type: "SET_SORTERING",
            kriterium: "arbeidsgiver",
            status: "tidligere",
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "arbeidsgiver"
            }
        });
    });

    it("håndterer SET_SORTERING dersom man har sortering fra før, men ikke for den innsendte statusen", () => {
        const initialState = deepFreeze({
            sortering: {
                tidligere: "dato"
            }
        });
        const action = {
            type: "SET_SORTERING",
            kriterium: "arbeidsgiver",
            status: "nye",
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            sortering: {
                tidligere: "dato",
                nye: "arbeidsgiver"
            }
        });
    });


    it('håndterer SET_ARBEIDSSITUASJON', () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
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
        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24,
            }]
        });
        const action = {
            type: 'SYKMELDING_BEKREFTET',
            sykmeldingId: 23,
        };
        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                status: 'BEKREFTET',
            }, {
                id: 24,
            }]
        });        
    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen ikke er feilaktig fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24
            }]
        });
        const action = {
            type: 'SET_FEILAKTIG_OPPLYSNING',
            sykmeldingId: 23,
            opplysning: "periode",
            erFeilaktig: true
        };

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });


    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen er feilaktig fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = {
            type: 'SET_FEILAKTIG_OPPLYSNING',
            sykmeldingId: 23,
            opplysning: "periode",
            erFeilaktig: false
        };

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": false
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom opplysningen er feilaktig fra før og man prøver å sette den til feilaktig", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = {
            type: 'SET_FEILAKTIG_OPPLYSNING',
            sykmeldingId: 23,
            opplysning: "periode",
            erFeilaktig: true
        };

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom den settes til false", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": true
                }
            }, {
                id: 24
            }]
        });
        const action = {
            type: 'SET_FEILAKTIG_OPPLYSNING',
            sykmeldingId: 23,
            opplysning: "periode",
            erFeilaktig: false
        };

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "periode": false
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_FEILAKTIG_OPPLYSNING dersom det finnes en (annen) feilaktig opplysning fra før", () => {

        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                }
            }, {
                id: 24
            }]
        });
        const action = {
            type: 'SET_FEILAKTIG_OPPLYSNING',
            sykmeldingId: 23,
            opplysning: "periode",
            erFeilaktig: true
        };

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                    "periode": true
                }
            }, {
                id: 24
            }]
        });

    });

    it("Håndterer SET_OPPLYSNINGENE_ER_RIKTIGE", () => {
        const initialState = deepFreeze({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {
                    "banan": true,
                }
            }, {
                id: 24
            }]
        });
        const action = {
            type: 'SET_OPPLYSNINGENE_ER_RIKTIGE',
            sykmeldingId: 23,
            erRiktige: true,
        };

        const nextState = dineSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {},
                opplysningeneErRiktige: true,
            }, {
                id: 24
            }]
        });

        const initialState2 = deepFreeze({
            data: [{
                id: 23,
            }, {
                id: 24
            }]
        });
        const action2 = {
            type: 'SET_OPPLYSNINGENE_ER_RIKTIGE',
            sykmeldingId: 23,
            erRiktige: false,
        };

        const nextState2 = dineSykmeldinger(initialState2, action2);

        expect(nextState2).to.deep.equal({
            data: [{
                id: 23,
                feilaktigeOpplysninger: {},
                opplysningeneErRiktige: false,
            }, {
                id: 24
            }]
        });
    });






}); 