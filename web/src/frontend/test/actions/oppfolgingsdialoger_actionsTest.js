import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import { oppfolgingsdialogAtActions as actions, actiontyper } from 'oppfolgingsdialog-npm'

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("oppfolgingsdialoger_actions", () => {

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            OPPFOELGINGSDIALOGREST_ROOT: 'http://tjenester.nav.no/oppfoelgingsdialog/api'
        };
    });

    it("Skal ha en hentOppfolgingsdialoger()-funksjon som returnerer riktig action", () => {
        expect(actions.hentOppfolgingsdialogerAt()).to.deep.equal({
            type: actiontyper.HENT_OPPFOLGINGSDIALOGER_AT_FORESPURT
        })
    });

    it("Skal ha en henterOppfolgingsdialoger()-funksjon som returnerer riktig action", () => {
        expect(actions.henterOppfolgingsdialogerAt()).to.deep.equal({
            type: actiontyper.HENTER_OPPFOLGINGSDIALOGER_AT
        })
    });

    it("har en enhetsMoterHentet-funksjon som returnerer riktig action", () => {
        expect(actions.oppfolgingsdialogerAtHentet([{id: 12345, navn: "Helge"}])).to.deep.equal({
            type: actiontyper.OPPFOLGINGSDIALOGER_AT_HENTET,
            data: [{id: 12345, navn: "Helge"}],
        })
    });

    it("Skal ha en hentOppfolgingsdialogerFeilet()-funksjon som returnerer riktig action", () => {
        expect(actions.hentOppfolgingsdialogerAtFeilet()).to.deep.equal({
            type: actiontyper.HENT_OPPFOLGINGSDIALOGER_AT_FEILET
        })
    });

});
