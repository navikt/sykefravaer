import { expect } from 'chai';
import { hentMote } from '../../js/sagas/moteSagas.js';
import { moteActions, actiontyper } from 'moter-npm';
import { get, post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';

describe("moteSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            MOTEREST_ROOT: "http://tjenester.nav.no/moterest/api"
        }
    });

    describe("hentMote", () => {
        const generator = hentMote({});

        it("Skal dispatche HENTER_MOTE", () => {
            const nextPut = put({type: actiontyper.HENTER_MOTE});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente mote", () => {
            const nextCall = call(get, "http://tjenester.nav.no/moterest/api/v2/moter/siste");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest lagre mote", () => {
            const nextPut = put({
                type: actiontyper.MOTE_HENTET,
                data: {mitt: 'mote'}
            });
            expect(generator.next({mitt: 'mote'}).value).to.deep.equal(nextPut);
        });
    });

});