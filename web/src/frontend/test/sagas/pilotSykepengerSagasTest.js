import { expect } from 'chai';
import { hentPilotSykepenger } from '../../js/sagas/pilotSykepengerSagas.js';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';
import * as actions from '../../js/actions/pilot_actions';

describe("pilotSykepengerSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/api"
        }
    })

    const generator = hentPilotSykepenger(actions.hentPilotSykepenger("sykmeldingId"));

    it("Skal dispatche HENTER_PILOT_SYKEPENGER", () => {
        const nextPut = put(actions.henterPilotSykepenger());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal hente",  () => {
        const nextCall = call(get, 'http://tjenester.nav.no/api/informasjon/sykepengepilot?sykmeldingId=sykmeldingId');
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal deretter dispatche PILOT_SYKEPENGER_HENTET", () => {
        const nextPut = put(actions.pilotSykepengerHentet(true, "sykmeldingId"));
        expect(generator.next(true).value).to.deep.equal(nextPut);
    }); 


});