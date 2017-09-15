import { expect } from 'chai';
import { hentHendelser } from '../../js/sagas/hendelserSagas.js';
import * as actions from '../../js/actions/hendelser_actions';
import { get, post } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("hendelserSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        }
    });

    describe("hentHendelser", () => {
        const generator = hentHendelser();

        it("Skal dispatche HENTER_HENDELSER", () => {
            const nextPut = put(actions.henterHendelser());
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente hendelser", () => {
            const nextCall = call(get, "http://tjenester.nav.no/syforest/informasjon/hendelser");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest lagre hendelser i state", () => {
            const nextPut = put(actions.hendelserHentet([]));
            expect(generator.next([]).value).to.deep.equal(nextPut);
        });
    });


});