import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';
import {
    oppdaterSykepengesoknader,
} from './sykepengesoknadSagas';
import * as actiontyper from '../../../actions/actiontyper';

describe('sykepengersoknadSagas', () => {
    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
    });

    afterEach(() => {
        clock.restore();
    });

    describe('henting', () => {
        const generator = oppdaterSykepengesoknader({
            type: actiontyper.HENT_SYKEPENGESOKNADER_FORESPURT,
        });

        it('Skal dispatche HENTER_SYKEPENGESOKNADER', () => {
            const nextPut = put({
                type: actiontyper.HENTER_SYKEPENGESOKNADER,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente sykepengesoknader', () => {
            const nextCall = call(get, '/syforest/soknader');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette soknader på state', () => {
            const nextPut = put({
                type: actiontyper.SYKEPENGESOKNADER_HENTET,
                sykepengesoknader: [{ id: '1' }],
            });
            expect(generator.next([{
                id: '1',
            }]).value).to.deep.equal(nextPut);
        });
    });
});
