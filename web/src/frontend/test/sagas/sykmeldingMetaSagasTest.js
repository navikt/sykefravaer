import { expect } from 'chai';
import { hentVentetid } from '../../js/sagas/sykmeldingMetaSagas.js';
import { post } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import * as actions from '../../js/actions/sykmeldingMeta_actions';

describe("ventetidSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        }
    });

    const SYKMELDING_ID = "4354ERWERHKQWJEHR387432434CDF";
    const action = actions.hentVentetid(SYKMELDING_ID);
    const generator = hentVentetid(action);

    it("Skal dispatche HENTER_VENTETID", () => {
        const nextPut = put(actions.henterVentetid(SYKMELDING_ID));
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal hente ventetid",  () => {
        const nextCall = call(post, 'http://tjenester.nav.no/syforest/sykmeldinger/4354ERWERHKQWJEHR387432434CDF/actions/erUtenforVentetid');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal deretter dispatche ventetidHentet", () => {
        const action = actions.ventetidHentet(SYKMELDING_ID, false);
        const nextPut = put(action);
        expect(generator.next(false).value).to.deep.equal(nextPut);
    });
});