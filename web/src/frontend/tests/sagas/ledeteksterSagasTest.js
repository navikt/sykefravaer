import { expect } from 'chai';
import { hentLedetekster } from '../../js/sagas/ledeteksterSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("ledeteksterSagas", () => {

    window.SYFO_SETTINGS = {
        REST_ROOT: "http://tjenester.nav.no/syforest"
    }

    const generator = hentLedetekster();

    it("Skal dispatche HENTER_LEDETEKSTER", () => {
        const nextPut = put({type: 'HENTER_LEDETEKSTER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente ledetekster", () => {
        const nextCall = call(get, "http://tjenester.nav.no/syforest/informasjon/tekster");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest sette ledetekster", () => {
        const nextPut = put({
            type: 'SET_LEDETEKSTER',
            ledetekster: {"min.ledetekst": "Hello world!"}
        })
        expect(generator.next({"min.ledetekst": "Hello world!"}).value).to.deep.equal(nextPut);
    });

});