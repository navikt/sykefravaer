import { expect } from 'chai';
import { sendSvar } from '../../js/sagas/svarSagas.js';
import { svarActions } from 'moter-npm';
import { post } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("svarSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            MOTEREST_ROOT: "http://tjenester.nav.no/moterest/api"
        }
    })

    const generator = sendSvar(svarActions.sendSvar("hansen", {
        tidOgStedIdListe: [17],
        avvikListe: []
    }));

    it("Skal dispatche SENDER_SVAR", () => {
        const nextPut = put(svarActions.senderSvar());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal poste svar",  () => {
        const nextCall = call(post, 'http://tjenester.nav.no/moterest/api/moter/hansen', {
            tidOgStedIdListe: [17],
            avvikListe: []
        });
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal deretter dispatche SVAR_SENDT", () => {
        const nextPut = put(svarActions.svarSendt({
            tidOgStedIdListe: [17],
            avvikListe: []
        }, "svarTidspunkt"));
        expect(generator.next({svarTidspunkt: "svarTidspunkt"}).value).to.deep.equal(nextPut);
    }); 


});