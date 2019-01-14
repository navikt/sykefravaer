import { expect } from 'chai';
import { get } from 'digisyfo-npm';
import { put, call } from 'redux-saga/effects';
import {
    HENTER_MOTE,
    MOTE_HENTET,
} from '../../js/actions/moter_actions';
import { hentMote } from '../../js/sagas/moteSagas';

describe('moteSagas', () => {
    describe('hentMote', () => {
        const generator = hentMote({});

        it(`Skal dispatche ${HENTER_MOTE}`, () => {
            const nextPut = put({ type: HENTER_MOTE });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente mote', () => {
            const nextCall = call(get, '/moterest/api/v2/moter/siste');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it(`Skal dernest ${MOTE_HENTET}`, () => {
            const nextPut = put({
                type: MOTE_HENTET,
                data: { mitt: 'mote' },
            });
            expect(generator.next({ mitt: 'mote' }).value).to.deep.equal(nextPut);
        });
    });
});
