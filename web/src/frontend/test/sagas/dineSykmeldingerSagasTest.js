import { expect } from 'chai';
import { hentDineSykmeldinger } from '../../js/sagas/dineSykmeldingerSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("dineSykmeldingerSagas", () => {

    window.SYFO_SETTINGS = {
        REST_ROOT: "http://tjenester.nav.no/syforest"
    }

    const generator = hentDineSykmeldinger();

    it("Skal dispatche HENTER_DINE_SYKMELDINGER", () => {
        const nextPut = put({type: 'HENTER_DINE_SYKMELDINGER'});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente dine sykmeldinger", () => {
        const nextCall = call(get, "http://tjenester.nav.no/syforest/sykmeldinger");
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest sette dine sykmeldinger", () => {
        const nextPut = put({
            type: 'SET_DINE_SYKMELDINGER',
            sykmeldinger: [{
                id: 1,
                diagnose: "Alt vel"
            }]
        })
        expect(generator.next([{
            id: 1,
            diagnose: "Alt vel"
        }]).value).to.deep.equal(nextPut);
    });

});