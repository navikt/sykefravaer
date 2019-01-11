import { expect } from 'chai';
import {
    put,
    call,
} from 'redux-saga/effects';
import {
    get,
    post,
    hentSyfoApiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';
import {
    hentMotebehov,
    svarMotebehov,
} from '../../js/sagas/motebehovSagas';
import {
    HENT_MOTEBEHOV_HENTER,
    HENT_MOTEBEHOV_HENTET,
    SVAR_MOTEBEHOV_SENDER,
    SVAR_MOTEBEHOV_SENDT,
} from '../../js/actions/motebehov_actions';

describe('motebehovSagas', () => {
    const virksomhetsnummer = '123456789';
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

    describe('svarMotebehov', () => {
        const generator = svarMotebehov({
            svar: {
                harMotebehov: true,
                forklaring: 'forklaring',
            },
            virksomhetsnummer,
        });

        it(`Skal dispatche ${SVAR_MOTEBEHOV_SENDER}`, () => {
            const nextPut = put({
                type: SVAR_MOTEBEHOV_SENDER,
                virksomhetsnummer,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(post, `${apiUrlBase}/motebehov?fnr=${''}`, {
                virksomhetsnummer,
                arbeidstakerFnr: '',
                motebehovSvar: {
                    harMotebehov: true,
                    forklaring: 'forklaring',
                },
            });
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest sette ${SVAR_MOTEBEHOV_SENDT}`, () => {
            const nextPut = put({
                type: SVAR_MOTEBEHOV_SENDT,
                svar: {
                    arbeidstakerFnr: '',
                    virksomhetsnummer,
                    motebehovSvar: {
                        harMotebehov: true,
                        forklaring: 'forklaring',
                    },
                },
                virksomhetsnummer,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });
    });
});
