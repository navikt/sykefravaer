import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/tidslinjer_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
let store; 

describe("tidslinjer_actions", () => {
    
    it("Skal ha en hentTidslinjer()-funksjon som returnerer en funksjon", () => {
        const res = actions.hentTidslinjer();
        expect(typeof res).to.equal("function")
    });

    it("Skal ha en hentTidslinjerFeilet()-funksjon som returnerer riktig action", () => {
        const res = actions.hentTidslinjerFeilet();
        expect(res).to.deep.equal({
            type: 'HENT_TIDSLINJER_FEILET'
        })
    });

    it("Skal ha en henterTidslinjer()-funksjon som returnerer riktig action", () => {
        const res = actions.henterTidslinjer();
        expect(res).to.deep.equal({
            type: 'HENTER_TIDSLINJER'
        })
    });

    describe('hentTidslinjer', () => {
        beforeEach(() => {
            store = mockStore();
            window = window || {};
            window.SYFO_SETTINGS = {
                REST_ROOT: 'http://tjenester.nav.no/syforest'
            }
        });

        it("Kaller på riktige actions", () => {
            nock('http://tjenester.nav.no/syforest/')
            .get("/tidslinje?arbeidssituasjon=MED_ARBEIDSGIVER")
            .reply(200, [{"navn": "Olsen"}])

            const expectedActions = [
                { type: "HENTER_TIDSLINJER"}, 
                { type: "SET_TIDSLINJE_ARBEIDSSITUASJON", arbeidssituasjon: 'MED_ARBEIDSGIVER'},
                { type: "SET_TIDSLINJER", tidslinjer: [{ "navn": "Olsen" }] }
            ]

            return store.dispatch(actions.hentTidslinjer())
                .then(() => { 
                    expect(store.getActions()).to.deep.equal(expectedActions)
                });

        });

        it("Kaller på riktige actions når den kalles med apneHendelseIder", () => {
            nock('http://tjenester.nav.no/syforest/')
            .get("/tidslinje?arbeidssituasjon=MED_ARBEIDSGIVER")
            .reply(200, [{"navn": "Olsen"}])

            const expectedActions = [
                { type: "HENTER_TIDSLINJER"}, 
                { type: 'SET_TIDSLINJE_ARBEIDSSITUASJON', arbeidssituasjon: 'MED_ARBEIDSGIVER'},
                { type: "SET_TIDSLINJER", tidslinjer: [{ "navn": "Olsen" }] },
                { type: "ÅPNE_HENDELSER", hendelseIder: ["02", "03"]}
            ]

            return store.dispatch(actions.hentTidslinjer(['02', '03']))
                .then(() => { 
                    expect(store.getActions()).to.deep.equal(expectedActions)
                });

        });



    })

})