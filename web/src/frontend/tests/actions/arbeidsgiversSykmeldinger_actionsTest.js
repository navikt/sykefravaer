import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/arbeidsgiversSykmeldinger_actions.js';
import sinon from 'sinon';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';


chai.use(chaiEnzyme());
const expect = chai.expect;
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("arbeidsgiversSykmeldinger_actions", () => {

    let store; 

    beforeEach(() => {
        store = mockStore();
        window = window || {};
        window.SYFO_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest'
        }
    });

    afterEach(() => {
        nock.cleanAll();
    }); 

    it("Skal ha en henterArbeidsgiversSykmeldinger()-funksjon som returnerer riktig action", () => {
        expect(actions.henterArbeidsgiversSykmeldinger()).to.deep.equal({
            type: 'HENTER_ARBEIDSGIVERS_SYKMELDINGER'
        })
    });

    it("Skal ha en setArbeidsgiversSykmeldinger()-funksjon som returnerer riktig action", () => {
        expect(actions.setArbeidsgiversSykmeldinger([{id: 12345, navn: "Helge"}])).to.deep.equal({
            type: 'SET_ARBEIDSGIVERS_SYKMELDINGER',
            sykmeldinger: [{
                id: 12345, navn: "Helge"
            }]
        });
    });

    it("Skal ha en hentArbeidsgiversSykmeldingerFeilet()-funksjon som returnerer riktig action", () => {
        expect(actions.hentArbeidsgiversSykmeldingerFeilet()).to.deep.equal({
            type: 'HENT_ARBEIDSGIVERS_SYKMELDINGER_FEILET'
        })
    }); 

    it("Skal ha en hentArbeidsgiversSykmeldinger()-funksjon som returnerer en funksjon", () => {
        expect(typeof actions.hentArbeidsgiversSykmeldinger()).to.equal("function")
    }); 

    describe("hentArbeidsgiversSykmeldinger()", () => {

        it("Kaller på SET_ARBEIDSGIVERS_SYKMELDINGER når hentArbeidsgiversSykmeldinger() er fullført", () => {
            nock('http://tjenester.nav.no/syforest/')
            .get("/sykmeldinger?type=arbeidsgiver")
            .reply(200, [{
                "id": 1
            }])

            const expectedActions = [
                { type: "HENTER_ARBEIDSGIVERS_SYKMELDINGER"}, 
                { type: "SET_ARBEIDSGIVERS_SYKMELDINGER", sykmeldinger: [{
                    "id": 1
                }]}
            ]

            return store.dispatch(actions.hentArbeidsgiversSykmeldinger())
                .then(() => { 
                    expect(store.getActions()).to.deep.equal(expectedActions)
                });

        });

    });  
    
}); 