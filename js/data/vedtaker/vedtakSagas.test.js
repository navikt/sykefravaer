import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';
import { oppdaterVedtaker } from './vedtakSagas';
import { HENT_VEDTAKER_FORESPURT, HENTER_VEDTAKER, VEDTAKER_HENTET } from './vedtaker_actions';

describe('vedtakSagas', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henting', () => {
        const generator = oppdaterVedtaker({
            type: HENT_VEDTAKER_FORESPURT,
        });

        it('Skal dispatche HENTER_VEDTAKER', () => {
            const nextPut = put({
                type: HENTER_VEDTAKER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente vedtaker', () => {
            const nextCall = call(get, '/syforest/vedtaker');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette vedtaker på state', () => {
            const nextPut = put({
                type: VEDTAKER_HENTET,
                vedtaker: [{ id: '1' }],
            });
            expect(generator.next([{
                id: '1',
            }]).value).to.deep.equal(nextPut);
        });
    });
});
