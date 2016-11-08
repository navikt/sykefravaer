import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/dineArbeidsgivere_actions';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("dineArbeidsgivere_actions", () => {

    let store; 

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest'
        }
    });    

    it("Skal ha en hentAktuelleArbeidsgivere(sykmeldingId, dato)-funksjon som returnerer en funksjon", () => {
        const action = actions.hentAktuelleArbeidsgivere("455");
        expect(action).to.deep.equal({
            type: 'HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT',
            sykmeldingId: "455"
        });
    });

    it("Skal ha en henterAktuelleArbeidsgivere(sykmeldingId)-funksjon som returnerer riktig action", () => {
        const sykmeldingId = "olsen";
        const dato = { year: 2015, monthValue: 12, dayOfMonth: 31 };
        const resultat = actions.henterAktuelleArbeidsgivere(sykmeldingId);
        expect(resultat).to.deep.equal({
            type: "HENTER_AKTUELLE_ARBEIDSGIVERE",
            sykmeldingId: "olsen",
        })
    });

    it("Skal ha en hentAktuelleArbeidsgivereFeilet(sykmeldingId)-funksjon som returnerer riktig action", () => {
        const sykmeldingId = "olsen";
        const dato = { year: 2015, monthValue: 12, dayOfMonth: 31 };
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

});