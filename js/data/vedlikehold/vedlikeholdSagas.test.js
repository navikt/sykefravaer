import { expect } from 'chai';
import { get } from '@navikt/digisyfo-npm';
import { call, put } from 'redux-saga/effects';
import { hentVedlikehold } from './vedlikeholdSagas';
import * as actions from './vedlikehold_actions';

describe('vedlikeholdSagas', () => {
    describe('hentVedlikehold', () => {
        const generator = hentVedlikehold();

        it('Skal dispatche HENTER_VEDLIKEHOLD', () => {
            const nextPut = put({
                type: actions.HENTER_VEDLIKEHOLD,
            });
            expect(generator.next().value).to.deep.equal(nextPut);
        });

        it('Skal dernest hente vedlikehold', () => {
            const nextCall = call(get, '/syforest/informasjon/vedlikehold');
            expect(generator.next().value).to.deep.equal(nextCall);
        });

        it('Skal dernest sette vedlikehold paa state', () => {
            const nextPut = put(actions.vedlikeholdHentet(true));
            expect(generator.next(true).value).to.deep.equal(nextPut);
        });
    });
});
