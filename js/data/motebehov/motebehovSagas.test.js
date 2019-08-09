import { expect } from 'chai';
import {
    put,
    call,
} from 'redux-saga/effects';
import {
    get,
    hentSyfoApiUrl,
    API_NAVN,
} from '../gateway-api/gatewayApi';
import { hentMotebehov } from './motebehovSagas';
import {
    HENT_MOTEBEHOV_HENTER,
    HENT_MOTEBEHOV_HENTET,
} from './motebehov_actions';

describe('motebehovSagas', () => {
    let apiUrlBase;

    describe('hentMotebehov', () => {
        apiUrlBase = hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV);
        const generator = hentMotebehov({
            id: 1,
        });

        it(`Skal dispatche ${HENT_MOTEBEHOV_HENTER}`, () => {
            const nextPut = put({
                type: HENT_MOTEBEHOV_HENTER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(get, `${apiUrlBase}/motebehov?fnr=${''}&virksomhetsnummer=${''}`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${HENT_MOTEBEHOV_HENTET}`, () => {
            const nextPut = put({
                type: HENT_MOTEBEHOV_HENTET,
                data: [
                    { motebehovSvar: null },
                ],
            });
            expect(generator.next([
                { motebehovSvar: null },
            ]).value).to.deep.equal(nextPut);
        });
    });
});
