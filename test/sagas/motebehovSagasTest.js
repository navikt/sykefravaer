import { expect } from 'chai';
import {
    put,
    call,
} from 'redux-saga/effects';
import { actiontyper } from 'moter-npm';
import {
    hentMotebehov,
    svarMotebehov,
} from '../../js/sagas/motebehovSagas';
import {
    get,
    post,
    hentSyfoApiUrl,
    API_NAVN,
} from '../../js/gateway-api/gatewayApi';

describe('motebehovSagas', () => {
    const virksomhetsnummer = '123456789';
    let apiUrlBase;

    describe('hentMotebehov', () => {
        apiUrlBase = hentSyfoApiUrl(API_NAVN.SYFOMOTEBEHOV);
        const generator = hentMotebehov({
            id: 1,
        });

        it(`Skal dispatche ${actiontyper.HENT_MOTEBEHOV_HENTER}`, () => {
            const nextPut = put({
                type: actiontyper.HENT_MOTEBEHOV_HENTER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest kalle resttjenesten', () => {
            const nextCall = call(get, `${apiUrlBase}/motebehov?fnr=${''}&virksomhetsnummer=${''}`);
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette motebehov hentet', () => {
            const nextPut = put({
                type: actiontyper.HENT_MOTEBEHOV_HENTET,
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

        it(`Skal dispatche ${actiontyper.SVAR_MOTEBEHOV_SENDER}`, () => {
            const nextPut = put({
                type: actiontyper.SVAR_MOTEBEHOV_SENDER,
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

        it('Skal dernest sette motebehov sendt', () => {
            const nextPut = put({
                type: actiontyper.SVAR_MOTEBEHOV_SENDT,
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
