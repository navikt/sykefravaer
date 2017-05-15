import { expect } from 'chai';
import { sjekkSkalViseForskutteringssporsmal } from '../../js/sagas/forskutteringssporsmalSagas.js';
import { post } from '../../js/api';
import { put, call } from 'redux-saga/effects';
import * as actions from '../../js/actions/forskutteringssporsmal_actions';

describe("forskutteringssporsmalSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/api"
        }
    });

    const sykepengesoknad = {
        id: "2"
    }
    const action = actions.sjekkSkalViseForskutteringssporsmal(sykepengesoknad);
    const generator = sjekkSkalViseForskutteringssporsmal(action);

    it("Skal dispatche SJEKKER_SKAL_VISE_FORSKUTTERINGSSPORSMAL", () => {
        const nextPut = put(actions.sjekkerSkalViseForskutteringssporsmal());
        expect(generator.next().value).to.deep.equal(nextPut);
    });

    it("Skal sjekke",  () => {
        const nextCall = call(post, 'http://tjenester.nav.no/api/soknader/2/actions/vis-forskutteringsspoersmaal', sykepengesoknad);
        expect(generator.next().value).to.deep.equal(nextCall);
    });

    it("Skal deretter dispatche skalViseForskutteringssporsmalSjekket", () => {    
        const action = actions.skalViseForskutteringssporsmalSjekket(true);
        const nextPut = put(action);
        expect(generator.next(true).value).to.deep.equal(nextPut);
    }); 


});