import {List, Map, fromJS} from 'immutable';
import deepFreeze from 'deep-freeze';
import {expect} from 'chai';
import * as actions from '../../js/actions/dinSykmelding_actions.js';
import * as dactions from '../../js/actions/dineSykmeldinger_actions.js';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);


import arbeidsgiversSykmeldinger from '../../js/reducers/arbeidsgiversSykmeldinger.js';

describe('arbeidsgiversSykmeldinger', () => {

    it('håndterer SET_ARBEIDSGIVERS_SYKMELDINGER', () => {
        const initialState = deepFreeze({});
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
        const initialState = deepFreeze({});
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
        const initialState = deepFreeze({});
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
        const initialState = deepFreeze({
            data: [{
                id: 1
            }, {
                id: 2
            }, {
                id: 69
            }],
            hentingFeilet: false,
            henter: false
        });
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
        const nextState = arbeidsgiversSykmeldinger(initialState, action);

        expect(nextState).to.deep.equal({
            data: [{
                id: 23,
                arbeidssituasjon: 'test'
            }, {
                id: 24,
            }]
        });
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

            initialState = deepFreeze({
                data: [sykmelding],
                henter: false, 
                hentingFeilet: false
            });

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

    });

});
