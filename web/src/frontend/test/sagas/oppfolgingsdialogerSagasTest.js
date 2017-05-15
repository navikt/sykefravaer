import { expect } from 'chai';
import { get } from '../../js/api';
import { put, call } from 'redux-saga/effects';
import { actiontyper, hentSykmeldtOppfolginger as hentOppfolgingsdialoger } from 'oppfolgingsdialog-npm';

describe("oppfolgingsdialogerSagas", () => {

    window.APP_SETTINGS = {
        OPPFOELGINGSDIALOGREST_ROOT: 'http://tjenester.nav.no/oppfoelgingsdialog/api'
    };

    const generator = hentOppfolgingsdialoger();

    xit("Skal dispatche HENTER_OPPFOLGINGSDIALOGER_AT", () => {
        const nextPut = put({type: actiontyper.HENTER_OPPFOLGINGSDIALOGER_AT});
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    xit("Skal dernest hente oppfolgingsdialoger", () => {
        const nextCall = call(get, `${window.APP_SETTINGS.OPPFOELGINGSDIALOGREST_ROOT}/sykmeldt/oppfoelgingsdialoger`);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    xit("Skal dernest dispatche OPPFOLGINGSDIALOGER_AT_HENTET", () => {
        const nextPut = put({
            type: actiontyper.OPPFOLGINGSDIALOGER_AT_HENTET,
            data: {
                navn: "Arbeidsgiver"
            }
        });
        expect(generator.next({
            navn: "Arbeidsgiver"
        }).value).to.deep.equal(nextPut);
    });

});