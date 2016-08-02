import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/tidslinjer_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

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

})