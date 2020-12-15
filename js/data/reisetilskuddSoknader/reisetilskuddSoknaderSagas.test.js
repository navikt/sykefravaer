import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';
import { oppdaterReisetilskuddSoknader } from './reisetilskuddSoknaderSagas';
import { HENT_REISETILSKUDDSOKNADER_FORESPURT, HENTER_REISETILSKUDDSOKNADER, REISETILSKUDDSOKNADER_HENTET } from './reisetilskuddSoknader_actions';

describe('reisetilskuddSoknaderSagas', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henting', () => {
        const generator = oppdaterReisetilskuddSoknader({
            type: HENT_REISETILSKUDDSOKNADER_FORESPURT,
        });

        it('Skal dispatche HENTER_REISETILSKUDDSOKNADER', () => {
            const nextPut = put({
                type: HENTER_REISETILSKUDDSOKNADER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente reisetilskuddSoknader', () => {
            const nextCall = call(get, 'https://flex-reisetilskudd-backend-proxy.dev.nav.no/api/v1/reisetilskudd');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette vedtak på state', () => {
            const nextPut = put({
                type: REISETILSKUDDSOKNADER_HENTET,
                reisetilskuddSoknader: [{ id: '1' }],
            });
            expect(generator.next([{
                id: '1',
            }]).value).to.deep.equal(nextPut);
        });
    });
});
