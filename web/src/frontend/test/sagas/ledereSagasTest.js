import { expect } from 'chai';
import { hentLedere, avkreftLeder } from '../../js/sagas/ledereSagas.js';
import * as actions from '../../js/actions/ledere_actions';
import { get, post } from '../../js/api';
import { put, call } from 'redux-saga/effects';
import * as actiontyper from '../../js/actions/actiontyper';

describe("ledereSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        }
    });

    describe("hentLedere", () => {
        const generator = hentLedere({});

        it("Skal dispatche HENTER_LEDERE", () => {
            const nextPut = put({type: actiontyper.HENTER_LEDERE});
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente ledere", () => {
            const nextCall = call(get, "http://tjenester.nav.no/syforest/naermesteledere");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest lagre ledere", () => {
            const nextPut = put({
                type: actiontyper.LEDERE_HENTET,
                data: "mine data"
            });
            expect(generator.next("mine data").value).to.deep.equal(nextPut);
        });
    })

    describe("avkreftLeder", () => {
        const generator = avkreftLeder(actions.avkreftLeder('orgnummer'))

        it("skal dispatche AVKREFTER_LEDER", () => {
            const nextPut = put(actions.avkrefterLeder())
            expect(generator.next().value).to.deep.equal(nextPut)
        });

        it("skal dernest poste avkreft", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/naermesteledere/orgnummer/actions/avkreft")
            expect(generator.next().value).to.deep.equal(nextCall)
        });

        it("skal dernest avkrefte leder i store", () => {
            const nextPut = put(actions.lederAvkreftet('orgnummer'));
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});