import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';
import { get } from '../gateway-api';
import { oppdaterVedtak } from './vedtakSagas';
import { HENT_VEDTAK_FORESPURT, HENTER_VEDTAK, VEDTAK_HENTET } from './vedtak_actions';

describe('vedtakSagas', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henting', () => {
        const generator = oppdaterVedtak({
            type: HENT_VEDTAK_FORESPURT,
        });

        it('Skal dispatche HENTER_VEDTAK', () => {
            const nextPut = put({
                type: HENTER_VEDTAK,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente vedtak', () => {
            const nextCall = call(get, 'https://flex-gateway.dev.nav.no/spinnsyn-backend/api/v2/vedtak');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette vedtak på state', () => {
            const nextPut = put({
                type: VEDTAK_HENTET,
                vedtak: [{ id: '1' }],
            });
            expect(generator.next([{
                id: '1',
            }]).value).to.deep.equal(nextPut);
        });
    });
});
