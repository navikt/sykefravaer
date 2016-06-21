import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../js/actions/dinSykmelding_actions.js';
import * as dactions from '../../js/actions/dineSykmeldinger_actions.js';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);


import arbeidsgiversSykmeldinger from '../../js/reducers/arbeidsgiversSykmeldinger.js';

describe('arbeidsgiversSykmeldinger', () => {

    it('håndterer SET_ARBEIDSGIVERS_SYKMELDINGER', () => {
        const initialState = {};
        const action = {
            type: 'SET_ARBEIDSGIVERS_SYKMELDINGER',
            sykmeldinger: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
        };
        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                pair: ['Trainspotting', '28 Days Later'],
                tally: {Trainspotting: 1}
            }],
            henter: false,
            hentingFeilet: false
        });
    });

    it("Håndterer HENTER_ARBEIDSGIVERS_SYKMELDINGER", () => {
        const initialState = {};
        const action = {
            type: "HENTER_ARBEIDSGIVERS_SYKMELDINGER"
        }
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: true,
            hentingFeilet: false,
        });
    });

    it("Håndterer HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET", () => {
        const initialState = {};
        const action = {
            type: "HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET"
        }
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            data: [],
            henter: false,
            hentingFeilet: true,
        });
    });

    it("Håndterer SET_ARBEIDSGIVER", () => {
        const initialState = {
            data: [{
                id: 1
            }, {
                id: 2
            }, {
                id: 69
            }],
            hentingFeilet: false,
            henter: false
        };
        const action = {
            type: 'SET_ARBEIDSGIVER',
            arbeidsgiver: {
                orgnummer: 12345678,
                navn: "Mosveens Verktøyutleie D/A"
            },
            sykmeldingId: 69
        }
        const nextState = arbeidsgiversSykmeldinger(initialState, action);
        expect(nextState).to.deep.equal({
            hentingFeilet: false,
            henter: false,
            data: [{
                id: 1
            }, {
                id: 2
            }, {
                id: 69,
                valgtArbeidsgiver: {
                    orgnummer: 12345678,
                    navn: "Mosveens Verktøyutleie D/A"
                }
            }]
        })
    });           

    describe("Innsending", () => {

        let sykmelding, action, initialState, store; 

        beforeEach(() => {
            sykmelding = {
                id: 56,
                valgtArbeidsgiver: {
                    orgnummer: 123456789,
                    navn: "Olsens Sykkelbud"
                }
            };

            initialState = {
                data: [sykmelding],
                henter: false, 
                hentingFeilet: false
            };

            store = mockStore();
            window = window || {};
            window.SYFO_SETTINGS = {
                REST_ROOT: 'http://tjenester.nav.no/syforest'
            }
        });

        afterEach(() => {
            nock.cleanAll();
        }); 

        it("Håndterer SENDER_SYKMELDING", () => {
            action = {
                type: 'SENDER_SYKMELDING',
                sykmeldingId: 56
            }
            const nextState = arbeidsgiversSykmeldinger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [sykmelding],
                henter: false,
                hentingFeilet: false,
                sender: true, 
                sendingFeilet: false
            });
        });

        it("Håndterer SEND_SYKMELDING_FEILET", () => {
            action = {
                type: 'SEND_SYKMELDING_FEILET',
                sykmeldingId: 56
            }
            const nextState = arbeidsgiversSykmeldinger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [sykmelding],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: true
            });
        });        

        it("Håndterer SYKMELDING_SENDT", () => {
            action = {
                type: 'SYKMELDING_SENDT',
                sykmeldingId: 56
            }
            const nextState = arbeidsgiversSykmeldinger(initialState, action);
            expect(nextState).to.deep.equal({
                data: [{
                    id: 56,
                    status: 'SENDT',
                    valgtArbeidsgiver: {
                        orgnummer: 123456789,
                        navn: 'Olsens Sykkelbud'
                    }
                }],
                henter: false,
                hentingFeilet: false,
                sender: false,
                sendingFeilet: false
            });            
        });

        describe("sendSykmeldingTilArbeidsgiver()", () => {

            it("Dispatcher SET_DINE_SYKMELDINGER når hentDineSykmeldinger() er fullført", () => {
                nock('http://tjenester.nav.no/syforest/', {
                    reqheaders: {
                        'Content-Type': 'application/json'
                    }
                })
                .post("/sykmeldinger/56/actions/send", {
                    orgnummer: '***REMOVED***'
                })
                .reply(200, {
                    "id": 56,
                    "status": "SENDT",
                    "sykmelder": "Hans Hansen"
                }) 

                const expectedActions = [
                    { type: "SENDER_SYKMELDING", sykmeldingId: 56}, 
                    { type: "SYKMELDING_SENDT", sykmeldingId: 56}
                ]

                return store.dispatch(actions.sendSykmeldingTilArbeidsgiver(56))
                    .then(() => { 
                        expect(store.getActions()).to.deep.equal(expectedActions)
                    });

            });

            it("Dispatcher SEND_SYKMELDING_FEILET når hentDineSykmeldinger() feiler", () => {
                nock('http://tjenester.nav.no/syforest/', {
                    reqheaders: {
                        'Content-Type': 'application/json'
                    }
                })
                .post("/sykmeldinger/56/actions/send", {
                    orgnummer: '***REMOVED***'
                })
                .reply(500) 

                const expectedActions = [
                    { type: "SENDER_SYKMELDING", sykmeldingId: 56}, 
                    { type: "SEND_SYKMELDING_FEILET", sykmeldingId: 56 }
                ]

                return store.dispatch(actions.sendSykmeldingTilArbeidsgiver(56))
                    .then(() => { 
                        expect(store.getActions()).to.deep.equal(expectedActions)
                    });

            });            

        }); 

    });

});