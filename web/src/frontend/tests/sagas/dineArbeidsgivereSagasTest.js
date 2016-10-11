import { expect } from 'chai';
import { hentDineArbeidsgivere } from '../../js/sagas/dineArbeidsgivereSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("dineArbeidsgivereSagas", () => {

    window.SYFO_SETTINGS = {
        REST_ROOT: "http://tjenester.nav.no/syforest"
    }

    const generator = hentDineArbeidsgivere({
        type: 'HENT_AKTUELLE_ARBEIDSGIVERE_FORESPURT',
        sykmeldingId: '887766'
    });

    it("Skal dispatche HENTER_AKTUELLE_ARBEIDSGIVERE", () => {
        const nextPut = put({
            type: 'HENTER_AKTUELLE_ARBEIDSGIVERE',
            sykmeldingId: '887766'
        });
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente aktuelle arbeidsgivere", () => {
        const nextCall = call(get, "http://tjenester.nav.no/syforest/informasjon/arbeidsgivere?sykmeldingId=887766");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest sette aktuelle arbeidsgivere", () => {
        const nextPut = put({
            type: 'SET_AKTUELLE_ARBEIDSGIVERE',
            sykmeldingId: "887766",
            arbeidsgivere: [{
                orgnummer: "112233445",
                navn: "Mortens grønnsaker AS"
            }]
        })
        expect(generator.next([{
            orgnummer: "112233445",
            navn: "Mortens grønnsaker AS"
        }]).value).to.deep.equal(nextPut);
    });

});