import { expect } from 'chai';
import { hentDeltaker } from '../../js/sagas/deltakerSagas';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("deltakerSagas", () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            MOTEREST_ROOT: "http://tjenester.nav.no/moterest/api"
        }
    });

    describe("hentDeltaker", () => {
        const generator = hentDeltaker();

        it("Skal dispatche HENTER_DELTAKER", () => {
            const nextPut = put({
                type: 'HENTER_DELTAKER'
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dispatche DELTAKER_HENTET når deltaker er hentet", () => {
            generator.next(); // henter

            const nextPut = put({type: 'DELTAKER_HENTET', data: {"test": "OK"}});
            expect(generator.next({
                "test": "OK"
            }).value).to.deep.equal(nextPut);
        });
    });
});