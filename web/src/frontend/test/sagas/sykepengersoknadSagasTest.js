import { expect } from 'chai';
import { hentSykepengesoknader, sendSykepengesoknad } from '../../js/sagas/sykepengesoknadSagas';
import { get, post } from '../../js/api';
import { put, call } from 'redux-saga/effects';

describe("sykepengersoknadSagas", () => {

    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: "http://tjenester.nav.no/syforest"
        }
    });

    describe('henting', () => {
        const generator = hentSykepengesoknader({
            type: 'HENT_SYKEPENGESOKNADER_FORESPURT',
        });

        it("Skal dispatche HENTER_SYKEPENGESOKNADER", () => {
            const nextPut = put({
                type: 'HENTER_SYKEPENGESOKNADER',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("Skal dernest hente sykepengesoknader", () => {
            const nextCall = call(get, "http://tjenester.nav.no/syforest/soknader");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("Skal dernest sette soknader på state", () => {
            const nextPut = put({
                type: 'SET_SYKEPENGESOKNADER',
                sykepengesoknader: [{id: '1'}],
            });
            expect(generator.next([{
                id: '1',
            }]).value).to.deep.equal(nextPut);
        });
    });

    describe('innsending', () => {
        const generator = sendSykepengesoknad({
            type: 'SEND_SYKEPENGESOKNAD_FORESPURT',
            sykepengesoknad: { id: '1' },
        });

        it("skal dispatche SENDER_SYKEPENGESOKNAD", () => {
            const nextPut = put({
                type: 'SENDER_SYKEPENGESOKNAD',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it("skal dernest sende sykepengesoknader", () => {
            const nextCall = call(post, "http://tjenester.nav.no/syforest/soknader/actions/send/1");
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it("skal dernest sette status som sendt", () => {
            const nextPut = put({
                type: 'SYKEPENGESOKNAD_SENDT',
                sykepengesoknadsId: '1',
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    })
});