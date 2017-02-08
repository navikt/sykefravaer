import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/sykepengesoknader_actions';
import * as actiontyper from '../../js/actions/actiontyper';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("sykepengesoknader_actions", () => {

    beforeEach(() => {
        window = window || {};
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/syforest'
        }
    });

    describe('henter',() => {
        it("Skal ha en henterSykepengesoknader()-funksjon som returnerer riktig action", () => {
            expect(actions.henterSykepengesoknader()).to.deep.equal({
                type: actiontyper.HENTER_SYKEPENGESOKNADER
            })
        });

        it("Skal ha en sykepengesoknaderHentet()-funksjon som returnerer riktig action", () => {
            expect(actions.sykepengesoknaderHentet([{id: 12345}])).to.deep.equal({
                type: actiontyper.SYKEPENGESOKNADER_HENTET,
                sykepengesoknader: [{
                    id: 12345
                }]
            });
        });

        it("Skal ha en hentSykepengesoknaderFeilet()-funksjon som returnerer riktig action", () => {
            expect(actions.hentSykepengesoknaderFeilet()).to.deep.equal({
                type: actiontyper.HENT_SYKEPENGESOKNADER_FEILET
            })
        });

        it("Skal ha en hentSykepengesoknader()-funksjon som returnerer riktig action", () => {
            expect(actions.hentSykepengesoknader()).to.deep.equal({
                type: actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT
            });
        });
    });

    describe('innsending', () => {
        it("skal ha en sendSykepengesoknad()-funksjon som returnerer riktig action", () => {
            expect(actions.sendSykepengesoknad({id: '1'})).to.deep.equal({
                type: actiontyper.SEND_SYKEPENGESOKNAD_FORESPURT,
                sykepengesoknad: {id: '1'},
            });
        });

        it("skal ha en senderSykepengesoknad()-funksjon som returnerer riktig action", () => {
            expect(actions.senderSykepengesoknad()).to.deep.equal({
                type: actiontyper.SENDER_SYKEPENGESOKNAD,
            });
        });

        it("skal ha en sendSykepengesoknadFeilet()-funksjon som returnerer riktig action", () => {
            expect(actions.sendSykepengesoknadFeilet()).to.deep.equal({
                type: actiontyper.SEND_SYKEPENGESOKNAD_FEILET
            });
        });

        it("skal ha en sykepengesoknadSendt()-funksjon som returnerer riktig action", () => {
            expect(actions.sykepengesoknadSendt('1', new Date())).to.deep.equal({
                type: actiontyper.SYKEPENGESOKNAD_SENDT,
                sykepengesoknadsId: '1',
                innsendtDato: new Date(),
            });
        });
    })
});