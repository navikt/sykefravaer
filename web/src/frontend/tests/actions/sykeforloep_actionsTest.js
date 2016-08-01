import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/sykeforloep_actions.js';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("sykeforloep_actions", () => {
    
    it("Skal ha en hentSykeforloep()-funksjon som returnerer en funksjon", () => {
        const res = actions.hentSykeforloep();
        expect(typeof res).to.equal("function")
    });

    it("Skal ha en hentSykeforloepFeilet()-funksjon som returnerer riktig action", () => {
        const res = actions.hentSykeforloepFeilet();
        expect(res).to.deep.equal({
            type: 'HENT_SYKEFORLOEP_FEILET'
        })
    });

    it("Skal ha en henterSykeforloep()-funksjon som returnerer riktig action", () => {
        const res = actions.henterSykeforloep();
        expect(res).to.deep.equal({
            type: 'HENTER_SYKEFORLOEP'
        })
    });

})