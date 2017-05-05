import { expect } from 'chai';
import { hentOppfolgingsdialoger } from '../../js/sagas/oppfolgingsdialogerSagas';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';
import * as actiontyper from '../../js/actions/actiontyper';

describe("oppfolgingsdialogerSagas", () => {

    window.APP_SETTINGS = {
        OPPFOELGINGSDIALOGREST_ROOT: 'http://tjenester.nav.no/oppfoelgingsdialog/api'
    };

    const generator = hentOppfolgingsdialoger();

    it("Skal dispatche HENTER_OPPFOLGINGSDIALOGER", () => {
        const nextPut = put({type: actiontyper.HENTER_OPPFOLGINGSDIALOGER});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal dernest hente oppfolgingsdialoger", () => {
        const nextCall = call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/sykmeldt/oppfoelgingsdialoger`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal dernest dispatche OPPFOLGINGSDIALOGER_HENTET", () => {
        const nextPut = put({
            type: actiontyper.OPPFOLGINGSDIALOGER_HENTET,
            data: {
                navn: "Arbeidsgiver"
            }
        });
        expect(generator.next({
            navn: "Arbeidsgiver"
        }).value).to.deep.equal(nextPut);
    });

});