import chai from 'chai';
import React from 'react'
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/actions/sykepengesoknader_actions';

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
                type: 'HENTER_SYKEPENGESOKNADER'
            })
        });

        it("Skal ha en setSykepengesoknader()-funksjon som returnerer riktig action", () => {
            expect(actions.setSykepengesoknader([{id: 12345}])).to.deep.equal({
                type: 'SET_SYKEPENGESOKNADER',
                sykepengesoknader: [{
                    id: 12345
                }]
            });
        });

        it("Skal ha en hentSykepengesoknaderFeilet()-funksjon som returnerer riktig action", () => {
            expect(actions.hentSykepengesoknaderFeilet()).to.deep.equal({
                type: 'HENT_SYKEPENGESOKNADER_FEILET'
            })
        });

        it("Skal ha en hentSykepengesoknader()-funksjon som returnerer riktig action", () => {
            expect(actions.hentSykepengesoknader()).to.deep.equal({
                type: 'HENT_SYKEPENGESOKNADER_FORESPURT'
            });
        });
    });

    describe('innsending', () => {
        it("skal ha en sendSykepengesoknad()-funksjon som returnerer riktig action", () => {
            expect(actions.sendSykepengesoknad({id: '1'})).to.deep.equal({
                type: 'SEND_SYKEPENGESOKNAD_FORESPURT',
                sykepengesoknad: {id: '1'},
            });
        });

        it("skal ha en senderSykepengesoknad()-funksjon som returnerer riktig action", () => {
            expect(actions.senderSykepengesoknad()).to.deep.equal({
                type: 'SENDER_SYKEPENGESOKNAD',
            });
        });

        it("skal ha en sendSykepengesoknadFeilet()-funksjon som returnerer riktig action", () => {
            expect(actions.sendSykepengesoknadFeilet()).to.deep.equal({
                type: 'SEND_SYKEPENGESOKNAD_FEILET'
            });
        });

        it("skal ha en sykepengesoknadSendt()-funksjon som returnerer riktig action", () => {
            expect(actions.sykepengesoknadSendt('1')).to.deep.equal({
                type: 'SYKEPENGESOKNAD_SENDT',
                sykepengesoknadsId: '1',
            });
        });
    })
});