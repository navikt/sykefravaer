import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import * as actions from '../../js/actions/sykeforloep_actions';

import sykeforloep from '../../js/reducers/sykeforloep.js';

describe("sykeforloep", () => {

    let state;

    it("Har en initiell state", () => {
        state = sykeforloep();
        expect(state).to.deep.equal({
            hentet: false,
            hentingFeilet: false,
            henter: false,
            startdato: null,
        });
    });

    it("Håndterer HENTER_STARTDATO", () => {
        const action = actions.henterStartdato();
        state = sykeforloep(state, action);
        expect(state).to.deep.equal({
            hentet: false,
            hentingFeilet: false,
            henter: true,
            startdato: null,
        });
    })

    it("Håndterer STARTDATO_HENTET", () => {
        const action = actions.startdatoHentet("2017-01-12");
        const state = sykeforloep(state, action);
        expect(state).to.deep.equal({
            hentet: true,
            hentingFeilet: false,
            henter: false,
            startdato: new Date("2017-01-12"),
        });
    });


    it("Håndterer STARTDATO_HENTET når det returneres null", () => {
        const action = actions.startdatoHentet(null);
        const state = sykeforloep(state, action);
        expect(state).to.deep.equal({
            hentet: true,
            hentingFeilet: false,
            henter: false,
            startdato: null
        });
    });

    it("Håndterer HENT_STARTDATO_FEILET", () => {
        const action = actions.hentStartdatoFeilet();
        const state = sykeforloep(state, action);
        expect(state).to.deep.equal({
            hentet: true,
            hentingFeilet: true,
            henter: false,
            startdato: null
        });
    });

});
