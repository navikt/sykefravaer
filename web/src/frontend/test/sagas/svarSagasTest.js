import { expect } from 'chai';
import { sendSvar } from '../../js/sagas/svarSagas.js';
import { svarActions, lagJsDate } from 'moter-npm';
import { post } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("svarSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            MOTEREST_ROOT: "http://tjenester.nav.no/moterest/api"
        }
    })

    const action = svarActions.sendSvar("minFineMoteUuid", "Bruker", [1, 2])

    const generator = sendSvar(action);

    it("Skal dispatche SENDER_SVAR", () => {
        const nextPut = put(svarActions.senderSvar());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal poste svar",  () => {
        const nextCall = call(post, 'http://tjenester.nav.no/moterest/api/v2/moter/actions/minFineMoteUuid/send', {
            valgteAlternativIder: [1, 2],
            deltakertype: 'Bruker',
        });
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal deretter dispatche SVAR_SENDT", () => {    
        const action = svarActions.svarSendt([1, 2], "Bruker", lagJsDate("2017-01-01T14:18:24.000"));
        const nextPut = put(action);
        expect(generator.next({svartidspunkt: "2017-01-01T14:18:24.000"}).value).to.deep.equal(nextPut);
    }); 


});