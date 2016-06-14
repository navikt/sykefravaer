import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dineArbeidsgivere_actions.js';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

chai.use(chaiEnzyme());
const expect = chai.expect;
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("dineArbeidsgivere_actions", () => {

    let store; 

    beforeEach(() => {
        store = mockStore();
        window = window || {};
        window.SYFO_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest'
        }
    });    

    it("Skal ha en hentAktuelleArbeidsgivere(sykmeldingId, dato)-funksjon som returnerer en funksjon", () => {
        const sykmeldingId = "olsen";
        const dato = "2015-12-31T00:00:00Z";
        const resultat = actions.hentAktuelleArbeidsgivere(sykmeldingId, dato);
        expect(typeof resultat).to.equal("function");
    });

    it("Skal ha en henterAktuelleArbeidsgivere(sykmeldingId)-funksjon som returnerer riktig action", () => {
        const sykmeldingId = "olsen";
        const dato = "2015-12-31T00:00:00Z";
        const resultat = actions.henterAktuelleArbeidsgivere(sykmeldingId);
        expect(resultat).to.deep.equal({
            type: "HENTER_AKTUELLE_ARBEIDSGIVERE",
            sykmeldingId: "olsen",
        })
    });

    it("Skal ha en hentAktuelleArbeidsgivereFeilet(sykmeldingId)-funksjon som returnerer riktig action", () => {
        const sykmeldingId = "olsen";
        const dato = "2015-12-31T00:00:00Z";
        const resultat = actions.hentAktuelleArbeidsgivereFeilet(sykmeldingId);
        expect(resultat).to.deep.equal({
            type: "HENT_AKTUELLE_ARBEIDSGIVERE_FEILET",
            sykmeldingId: "olsen",
        })
    });

    it("Skal ha en setAktuelleArbeidsgivere(sykmeldingId, [arbeidsgivere])-funksjon som returnerer riktig action", () => {
        const sykmeldingId = "olsen";
        const arbeidsgivere = [{
            orgnr: 12345678,
            navn: "Hansens Frisørsalong"
        }, {
            orgnr: 87654321,
            navn: "Oslo Sykkelbutikk"
        }, {
            orgnr: 32165478,
            navn: "Bergen Malingsfabrikk"
        }]
        const resultat = actions.setAktuelleArbeidsgivere(sykmeldingId, arbeidsgivere);
        expect(resultat).to.deep.equal({
            type: "SET_AKTUELLE_ARBEIDSGIVERE",
            sykmeldingId: "olsen",
            arbeidsgivere: [{
                orgnr: 12345678,
                navn: "Hansens Frisørsalong"
            }, {
                orgnr: 87654321,
                navn: "Oslo Sykkelbutikk"
            }, {
                orgnr: 32165478,
                navn: "Bergen Malingsfabrikk"
            }]
        })
    });

    it("Kaller på setAktuelleArbeidsgivere() når hentAktuelleArbeidsgivere() er fullført", () => {
        nock('http://tjenester.nav.no/syforest/')
        .get("/informasjon/arbeidsgivere?sykmeldingId=55")
        .reply(200, [{
            orgnr: 12345678,
            navn: "Hansens Frisørsalong"
        }, {
            orgnr: 87654321,
            navn: "Oslo Sykkelbutikk"
        }, {
            orgnr: 32165478,
            navn: "Bergen Malingsfabrikk"
        }])

        const id = "55";
        const dato = "2015-12-31T00:00:00Z";

        const expectedActions = [
            { type: "HENTER_AKTUELLE_ARBEIDSGIVERE", sykmeldingId: "55"}, 
            { type: "SET_AKTUELLE_ARBEIDSGIVERE", sykmeldingId: "55", arbeidsgivere: [{
            orgnr: 12345678,
            navn: "Hansens Frisørsalong"
        }, {
            orgnr: 87654321,
            navn: "Oslo Sykkelbutikk"
        }, {
            orgnr: 32165478,
            navn: "Bergen Malingsfabrikk"
        }]}]

        return store.dispatch(actions.hentAktuelleArbeidsgivere(id, dato))
            .then(() => { 
                expect(store.getActions()).to.deep.equal(expectedActions)
            });
    });    



});