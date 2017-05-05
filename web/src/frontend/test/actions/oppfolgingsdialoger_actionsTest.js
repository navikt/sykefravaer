import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/oppfolgingsdialoger_actions';
import * as actiontyper from '../../js/actions/actiontyper';

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
        expect(actions.hentOppfolgingsdialoger()).to.deep.equal({
            type: actiontyper.HENT_OPPFOLGINGSDIALOGER_FORESPURT
        })
    });

    it("Skal ha en henterOppfolgingsdialoger()-funksjon som returnerer riktig action", () => {
        expect(actions.henterOppfolgingsdialoger()).to.deep.equal({
            type: actiontyper.HENTER_OPPFOLGINGSDIALOGER
        })
    });

    it("har en enhetsMoterHentet-funksjon som returnerer riktig action", () => {
        expect(actions.oppfolgingsdialogerHentet([{id: 12345, navn: "Helge"}])).to.deep.equal({
            type: actiontyper.OPPFOLGINGSDIALOGER_HENTET,
            data: [{id: 12345, navn: "Helge"}],
        })
    });

    it("Skal ha en hentOppfolgingsdialogerFeilet()-funksjon som returnerer riktig action", () => {
        expect(actions.hentOppfolgingsdialogerFeilet()).to.deep.equal({
            type: actiontyper.HENT_OPPFOLGINGSDIALOGER_FEILET
        })
    });

});
