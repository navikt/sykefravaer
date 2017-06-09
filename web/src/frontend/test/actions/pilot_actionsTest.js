import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/pilot_actions';
import * as actiontyper from '../../js/actions/actiontyper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("pilot_actions", () => {

    it("SKal ha en hentPilotSykepenger()-funksjon", () => {
        const t = actions.hentPilotSykepenger("123");
        expect(t).to.deep.equal({
            type: "HENT_PILOT_SYKEPENGER_FORESPURT",
            sykmeldingId: "123"
        });
    });

    it("SKal ha en henterPilotSykepenger()-funksjon", () => {
        const t = actions.henterPilotSykepenger();
        expect(t).to.deep.equal({
            type: "HENTER_PILOT_SYKEPENGER",
        });
    });

    it("SKal ha en pilotSykepengerHentet()-funksjon", () => {
        const t = actions.pilotSykepengerHentet(false, "123");
        expect(t).to.deep.equal({
            type: "PILOT_SYKEPENGER_HENTET",
            data: {
                pilotSykepenger: false,
                sykmeldingId: "123"
            }
        })
    });

    it("Skal ha en hentPilotSykepengerFeilet()-funksjon", () => {
        const t = actions.hentPilotSykepengerFeilet();
        expect(t).to.deep.equal({
            type: "HENT_PILOT_SYKEPENGER_FEILET"
        })
    })

});