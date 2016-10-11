import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/tidslinjer_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("tidslinjer_actions", () => {
    
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

    it("Skal ha en hentTidslinjer()-funksjon som returnerer riktig action", () => {
        const res = actions.hentTidslinjer();
        expect(res).to.deep.equal({
            type: 'HENT_TIDSLINJER_FORESPURT',
            apneHendelseIder: [],
            arbeidssituasjon: "MED_ARBEIDSGIVER"
        });
    });

    it("Skal ha en hentTidslinjer()-funksjon som returnerer riktig action når man sender inn apneHendelseIder", () => {
        const res = actions.hentTidslinjer([1, 2]);
        expect(res).to.deep.equal({
            type: 'HENT_TIDSLINJER_FORESPURT',
            apneHendelseIder: [1, 2],
            arbeidssituasjon: "MED_ARBEIDSGIVER"
        });
    });

    it("Skal ha en hentTidslinjer()-funksjon som returnerer riktig action når man sender inn apneHendelseIder og arbeidssituasjon", () => {
        const res = actions.hentTidslinjer([1, 2, 3, 4], "UTEN_ARBEIDSGIVER");
        expect(res).to.deep.equal({
            type: 'HENT_TIDSLINJER_FORESPURT',
            apneHendelseIder: [1, 2, 3, 4],
            arbeidssituasjon: "UTEN_ARBEIDSGIVER"
        });
    });

})