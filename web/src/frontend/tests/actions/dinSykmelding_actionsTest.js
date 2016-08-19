import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dinSykmelding_actions.js';
import { browserHistory } from 'react-router';

chai.use(chaiEnzyme());
const expect = chai.expect;
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("dinSykmelding_actions", () => { 

    beforeEach(() => {
        window = window || {};
        window.SYFO_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest'
        }
    });

    it("Skal ha en setArbeidssituasjon()-funksjon som returnerer riktig action", () => {

        const arbeidssituasjon = 'test';
        const sykmeldingId = 23;

        var action = actions.setArbeidssituasjon(arbeidssituasjon, sykmeldingId);

        expect(action.type).to.equal("SET_ARBEIDSSITUASJON");
        expect(action.arbeidssituasjon).to.equal('test');
        expect(action.sykmeldingId).to.equal(23);
    });

    it("Skal ha en setArbeidsgiver som returnerer riktig action", () => {

        const arbeidsgiver = {
            orgnummer: 12345678,
            navn: "Mosveens Sykkelverksted & Hipstercafe"
        };
        const sykmeldingId = 23;

        var action = actions.setArbeidsgiver(sykmeldingId, arbeidsgiver);

        expect(action.type).to.equal("SET_ARBEIDSGIVER");
        expect(action.arbeidsgiver).to.deep.equal({
            orgnummer: 12345678,
            navn: "Mosveens Sykkelverksted & Hipstercafe"
        });
        expect(action.sykmeldingId).to.equal(23);        

    });

    describe("Send sykmelding", () => {

        it("Skal ha en senderSykmelding()-funksjon som returnerer riktig action", () => {
            const sykmeldingId = 12;
            const action = actions.senderSykmelding(sykmeldingId);
            expect(action).to.deep.equal({
                sykmeldingId: 12, 
                type: "SENDER_SYKMELDING",
            });
        });

        it("Skal ha en sendSykmeldingFeilet()-funksjon som returnerer riktig action", () => {
            const sykmeldingId = 12;
            const action = actions.sendSykmeldingFeilet(sykmeldingId);
            expect(action).to.deep.equal({
                sykmeldingId: 12, 
                type: "SEND_SYKMELDING_FEILET",
            });
        });

        it("Skal ha en sykmeldingSendt()-funksjon som returnerer riktig action", () => {
            const action = actions.sykmeldingSendt(14, '123');
            expect(action).to.deep.equal({
                sykmeldingId: 14, 
                type: "SYKMELDING_SENDT",
                orgnummer: '123',
            });
        });

        it("Skal ha en sendSykmeldingTilArbeidsgiver()-funksjon som returnerer en funksjon", () => {
            const action = actions.sendSykmeldingTilArbeidsgiver(14);
            expect(typeof action).to.equal("function");
        });     

    });

    describe("Bekreft sykmelding", () => {

        it("Skal ha en bekrefterSykmelding()-funksjon som returnerer rikig action", () => {
            const sykmeldingId = 12;
            const action = actions.bekrefterSykmelding(sykmeldingId, "arbeidstaker");
            expect(action).to.deep.equal({
                sykmeldingId: 12, 
                arbeidssituasjon: "arbeidstaker",
                type: "BEKREFTER_SYKMELDING",
            });        
        });

        it("Skal ha en bekreftSykmeldingFeilet()-funksjon som returnerer rikig action", () => {
            const sykmeldingId = 12;
            const action = actions.bekreftSykmeldingFeilet(sykmeldingId);
            expect(action).to.deep.equal({
                sykmeldingId: 12, 
                type: "BEKREFT_SYKMELDING_FEILET",
            });        
        });

        it("Skal ha en sykmeldingBekreftet()-funksjon som returnerer riktig action", () => {
            const action = actions.sykmeldingBekreftet(14);
            expect(action).to.deep.equal({
                sykmeldingId: 14, 
                type: "SYKMELDING_BEKREFTET",
            });
        }); 

        it("Skal ha en bekreftSykmelding()-funksjon som returnerer en funksjon", () => {
            const action = actions.bekreftSykmelding(14, "frilanser");
            expect(typeof action).to.equal("function");
        });   
          
    }); 

    describe("sendSykmeldingTilArbeidsgiver()", () => {

        it("Dispatcher SYKMELDING_SENDT, HENTER_DINE_SYKMELDINGER når sendSykmeldingTilArbeidsgiver() er fullført", () => {
            const store = mockStore();
            nock('http://tjenester.nav.no/syforest/', {
                reqheaders: {
                    'Content-Type': 'application/json'
                }
            })
            .post("/sykmeldinger/87654/actions/send", '***REMOVED***')
            .reply(200, {
                "id": 87654,
                "status": "SENDT",
                "sykmelder": "Hans Hansen"
            })
            .get("/sykmeldinger?type=arbeidsgiver")
            .reply(200, [{
                "id": 1
            }]);

            const expectedActions = [
                { type: "SENDER_SYKMELDING", sykmeldingId: 87654 },
                { type: "SYKMELDING_SENDT", sykmeldingId: 87654, orgnummer: '***REMOVED***' },
                { type: "HENTER_DINE_SYKMELDINGER" }, 
                { type: "HENTER_ARBEIDSGIVERS_SYKMELDINGER" }
            ]

            return store.dispatch(actions.sendSykmeldingTilArbeidsgiver(87654, '***REMOVED***'))
                .then(() => { 
                    expect(store.getActions()).to.deep.equal(expectedActions)
                });

        });

        it("Dispatcher SEND_SYKMELDING_FEILET når sendSykmeldingTilArbeidsgiver() feiler", () => {
            const store = mockStore();
            nock('http://tjenester.nav.no/syforest/', {
                reqheaders: {
                    'Content-Type': 'application/json'
                }
            })
            .post("/sykmeldinger/56/actions/send", '***REMOVED***')
            .reply(500) 

            const expectedActions = [
                { type: "SENDER_SYKMELDING", sykmeldingId: 57}, 
                { type: "SEND_SYKMELDING_FEILET", sykmeldingId: 57 }
            ]

            return store.dispatch(actions.sendSykmeldingTilArbeidsgiver(57, ***REMOVED***))
                .then(() => { 
                    expect(store.getActions()).to.deep.equal(expectedActions)
                });

        });            

    });     

    describe("bekreftSykmelding()", () => {

        it("Dispatcher SYKMELDING_BEKREFTET og HENTER_DINE_SYKMELDINGER når bekreftSykmelding() er fullført", () => {
            const store = mockStore();
            nock('http://tjenester.nav.no/syforest/', {
                reqheaders: {
                    'Content-Type': 'application/json'
                }
            })
            .post("/sykmeldinger/56/actions/bekreft", "arbeidstaker")
            .reply(200, {});

            nock('http://tjenester.nav.no/syforest/')
            .get("/sykmeldinger")
            .reply(200, [{
                "id": 1
            }]);

            nock('http://tjenester.nav.no/syforest/')
            .get("/sykmeldinger?type=arbeidsgiver")
            .reply(200, [{
                "id": 1
            }]);

            const expectedActions = [
                { type: "BEKREFTER_SYKMELDING", sykmeldingId: 56, arbeidssituasjon: "arbeidstaker" },
                { type: "SYKMELDING_BEKREFTET", sykmeldingId: 56 },
                { type: "HENTER_DINE_SYKMELDINGER" },
                { type: "HENTER_ARBEIDSGIVERS_SYKMELDINGER"}
            ]

            return store.dispatch(actions.bekreftSykmelding(56, 'arbeidstaker'))
                .then(() => { 
                    expect(store.getActions()).to.deep.equal(expectedActions)
                });

        });

        it("Dispatcher BEKREFT_SYKMELDING_FEILET når bekreftSykmelding() feiler", () => {
            const store = mockStore();
            nock('http://tjenester.nav.no/syforest/', {
                reqheaders: {
                    'Content-Type': 'application/json'
                }
            })
            .post("/sykmeldinger/88/actions/bekreft", 'arbeidstaker')
            .reply(500)

            const expectedActions = [
                { type: "BEKREFTER_SYKMELDING", sykmeldingId: 88, arbeidssituasjon: "arbeidstaker"}, 
                { type: "BEKREFT_SYKMELDING_FEILET", sykmeldingId: 88 }
            ]

            return store.dispatch(actions.bekreftSykmelding(88, 'arbeidstaker'))
                .then(() => { 
                    expect(store.getActions()).to.deep.equal(expectedActions)
                });

        });

    });         



});
